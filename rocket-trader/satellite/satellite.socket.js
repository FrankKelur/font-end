let SpaceStateBase = require('./satellite.base');
const EventEmitter = require('events').EventEmitter;
const satelliteEvent = new EventEmitter();
satelliteEvent.setMaxListeners(0);

//SatelliteSocket

function SatelliteSocket(config,mainCallback){
    let _this = this;

    
    
    initConfig();
    
    _this.bestServer(false);


    function initConfig(){
        _this.config = {                    
            serverLists: config.serverLists,            //配置的服务器
            pingOverTime: config.pingOverTime || 2000,  //获取最优服务器的超时时间
            connectStatusIntervalTime: 6000,            //获取服务器状态的间隔时间
            reConnectNum :10,                            //重连次数
            dataOvertimeInterval: 7000,                 //每次获取数据的超时时间
        };
        
        _this.connectServerStatus = {       //所有node server信息
            server: [],
            browserTime: [],
            newrouteTime: [],
            time: [],
            socket: []
        };

        _this.choosenSocket = {};           //已选择的node
        _this.isChoosenSocketDone  = false;     //是否选择完node
        _this.heartbeatFlag = true;           //心跳方法开关
        _this.maxConnectTime = 1000000;         //连接无效 将连接时间设为1000000

        //连接状态列表[连接中，已连接，所有路线连接失败，收拾数据的这条路线每次接收数据间隔超时,node连接中,node所有模块已连接,node连接newroute已关闭，node每次接收newroute数据超时]
        _this.connectEnum = ['connecting','connected','connect_error','connect_overtime','node_connecting','node_connected','node_connected_close','node_connected_overtime'];

        _this.mainCallbackReturn = {};        //回调函数的返回
        _this.mainCallbackReturn.connect_status = _this.connectEnum[0]; //返回回调函数的连接状态
        _this.mainCallback = mainCallback ? mainCallback: function(){};
        _this.mainCallback(_this.mainCallbackReturn);
    

        _this.sendEvent = function(eventname, obj){
            //选择完服务器后发送
            _this.handleOnFunc(_this.isChoosenSocketDone,function(){
                _this.choosenSocket.send(eventname, obj);
            })
        }
        _this.receiveEvent = function(eventname, callback){
            //选择完服务器后接收
            _this.handleOnFunc(_this.isChoosenSocketDone,function(){
                _this.choosenSocket.receive(eventname, function(data){
                    callback && callback(data);
                })
            })
        }
        _this.sendOnceEvent = function(eventname, obj, callback){
            if(_this.isChoosenSocketDone){
                _this.choosenSocket.send(eventname, obj);
            }else{
                //返回正在连接中 不进行提交
                callback && callback('connecting');
            }
        }

        _this.handleOnFunc = function(isChoosenSocketDone,callback){
            if(isChoosenSocketDone){
                callback();
            }
            else{
                satelliteEvent.on('hasChoosenSocket', function(){
                    callback();
                })
                // window.addEventListener('hasChoosenSocket', function(){
                //     callback();
                // })
            }
        }
        _this.dataOverTimeHandle = function(currenttime, lasttime, overtime){
            //处理超时
            if((currenttime - lasttime) > overtime){
                //_this.heartbeatFlag = 'close';
                //连接异常，自动更换线路
                _this.mainCallbackReturn.connect_status = _this.connectEnum[3];
                _this.mainCallback(_this.mainCallbackReturn);
                _this.bestServer(false);
            }
        }
    }
    
}

let satelliteProto = SatelliteSocket.prototype;



satelliteProto.connectWithAllServer = function(serverLists, callback){
    let _this = this,
        _pingTimer,
        connectServerArr,
        isReturnArr = [],
        errorReturnArr = [];

    clearTimeout(_pingTimer);

    for(let index = 0; index< serverLists.length; index++){
        let _connectServer = _this.connectServerStatus,
            _value = serverLists[index];

        //base设置四个状态回调，页面显示三个状态回调：连接中，已连接，连接断开
        let opt = {
            server:_value,
            reConnectNum: _this.config.reConnectNum
        };

        if(_connectServer.socket[index]){
            _connectServer.socket[index].closeConnect();
        }

        let _socket = new SpaceStateBase(opt);
        _connectServer.server[index] = _value;
        _connectServer.browserTime[index] = _this.maxConnectTime;
        _connectServer.newrouteTime[index] = _this.maxConnectTime;
        _connectServer.time[index] = _this.maxConnectTime;
        _connectServer.socket[index] = _socket;

        _connectServer.socket[index].connectError(function(){
            _connectServer.browserTime[index] = _this.maxConnectTime;
            _connectServer.newrouteTime[index] = _this.maxConnectTime;
            _connectServer.time[index] = _this.maxConnectTime;
            //如果连接失败10次
            errorReturnArr.push(false);
            if( errorReturnArr.length == _this.config.serverLists.length){
                clearTimeout(_pingTimer);
                callback(false);
            }
        });

        _connectServer.socket[index].receive('setPingTime', function(data){

            _connectServer.browserTime[index] = timeSSUtc() - data.browserTime;
            _connectServer.newrouteTime[index] = parseInt(data.newrouteTime);
            _connectServer.time[index] = _connectServer.browserTime[index] + _connectServer.newrouteTime[index];

            isReturnArr.push(true);
            /*如果第一个ping得到的服务器时间存在则启用定时器，到达定时时间后 关闭socket 获取存储的服务器列表取最优值。
              如果在定时时间内服务器列表都返回，清除定时器，关闭socket 取最优值*/
            if( isReturnArr.length === 1){
                _pingTimer = setTimeout(function(){
                    callback(true);
                }, _this.config.pingOverTime)
            }else if( isReturnArr.length == _this.config.serverLists.length){
                clearTimeout(_pingTimer);
                callback(true);
            }
            
        })
        _connectServer.socket[index].send('getPingTime', timeSSUtc());
        // setTimeout(function(){

        // },6000)
    }
}

satelliteProto.bestServer = function(noNeedNewRouterTime){
    let _this = this;
    //获取最优server
    
    _this.connectWithAllServer(_this.config.serverLists,function(result){
        // //取time最小的server 判断是否断开其他
        if(result){

            let _resultTime, 
                _resultServer, 
                _handleTime, 
                _handleServer;

            _handleTime = noNeedNewRouterTime ? _this.connectServerStatus.browserTime : _this.connectServerStatus.time;
            _handleServer = _this.connectServerStatus.server;
            _resultTime = Math.min.apply( Math, _handleTime );
            _resultServer = _handleServer[ _handleTime.indexOf( _resultTime ) ];

            _this.changeServer(_resultServer);

            _this.mainCallbackReturn.connect_status = _this.connectEnum[1];
            _this.mainCallback(_this.mainCallbackReturn);

            _this.heartbeat();

        }else{
            _this.mainCallbackReturn.connect_status = _this.connectEnum[2];
            _this.mainCallback(_this.mainCallbackReturn);
        }
    })
}


satelliteProto.heartbeat = function(){
    let _this = this;
    
    _this.handleOnFunc(_this.isChoosenSocketDone,function(){
        let _lastHeartTime = timeSSUtc();
        let socket = _this.choosenSocket;
        pingIntervalFunc();
        
        socket.receive('hearbeatReturn',function(data){
            _lastHeartTime = data;
        })
    
        function pingIntervalFunc(flag){
            if(_this.heartbeatFlag && _this.mainCallbackReturn.connect_status != _this.connectEnum[3]){
                setTimeout(function(){
                    let _currentTime = timeSSUtc();
                    socket.send('hearbeatReady', _currentTime);

                    _this.dataOverTimeHandle(_currentTime, _lastHeartTime,_this.config.dataOvertimeInterval);

                    pingIntervalFunc();
                }, _this.config.connectStatusIntervalTime)
            }
        }
    });

}
satelliteProto.serverStatus = function(callback){
    //等通知后再执行， 
    //所有sokcet断开后，停止循环定时
    let _this = this;
    let serverLists = _this.config.serverLists;
    let _connectServer = _this.connectServerStatus;
    callback(_connectServer);
    _this.handleOnFunc(_this.isChoosenSocketDone,function(){
        for(let index = 0; index< serverLists.length; index++){

            one(_connectServer.socket[index],index, function(data){
                callback(_connectServer)
           })
        }
    })
    function one(socket,index,cb){
        let _lastHeartTime = timeSSUtc(),
            statustimer;

        pingIntervalFunc();
        
        socket.receive('statusReturn',function(data){
            //多条改状态
            console.log(data)
            clearTimeout(statustimer)
            if(socket == _this.choosenSocket){
                _lastHeartTime = data;
            }
            //console.log(data.browserTime,timeSSUtc())
            _connectServer.browserTime[index] = timeSSUtc() - data.browserTime;
            _connectServer.newrouteTime[index] = parseInt(data.newrouteTime);
            _connectServer.time[index] = _connectServer.browserTime[index] + _connectServer.newrouteTime[index];
            //使用的这条做超时判断
            cb(data);
        })
        function pingIntervalFunc(flag){
            if(_this.mainCallbackReturn.connect_status != _this.connectEnum[3]){
                setTimeout(function(){
                    let _currentTime = timeSSUtc();
                    //console.log(_currentTime)
                    socket.send('statusReady', _currentTime);

                    statustimer = setTimeout(function(){
                        _connectServer.browserTime[index] = _this.maxConnectTime;
                        _connectServer.newrouteTime[index] = _this.maxConnectTime;
                        _connectServer.time[index] = _this.maxConnectTime;
                    }, 2000)

                    if(socket == _this.choosenSocket){
                        _this.dataOverTimeHandle(_currentTime, _lastHeartTime,_this.config.dataOvertimeInterval);
                    }
                    
                    pingIntervalFunc();
                }, _this.config.connectStatusIntervalTime)
            }
        }
    }
    _this.heartbeatFlag = false;
}
satelliteProto.connectedStatus = function(callback){
    let _this = this;
    _this.handleOnFunc(_this.isChoosenSocketDone,callback);
}
satelliteProto.changeServer = function(server){
    //切换server
    let _this = this;
    _this.choosenSocket = _this.connectServerStatus.socket[ _this.connectServerStatus['server'].indexOf(server) ];
    //已经选好server ，通知其他应用可以继续进行，

    _this.isChoosenSocketDone = true;

    console.log('ready');
    satelliteEvent.emit('hasChoosenSocket');
    //window.dispatchEvent(new Event('hasChoosenSocket'));
}

//实时价格
satelliteProto.ready_realtimePrice = function(obj){
    this.sendEvent('readyRealtimePrice',obj);
}
satelliteProto.realtimePrice = function(callback){
    this.receiveEvent('realtimePrice',callback); 
}

//历史价格
satelliteProto.ready_historyPrice = function(obj){
    let _this = this;
    if(_this.isChoosenSocketDone)
        _this.choosenSocket.send('readyHistoryPrice', obj);
    //this.sendEvent('readyHistoryPrice',obj);
}
satelliteProto.historyPrice = function(callback){
    this.receiveEvent('historyPrice',callback);
}

satelliteProto.tokenError = function(callback){
    let _this = this;
    _this.receiveEvent('tokenError',function(data){
        callback(data);
    });
}
//登录
satelliteProto.ready_login = function(obj,callback){
    this.sendOnceEvent('readyLogin',{
        login: obj.login, 
        pwd:obj.pwd
    }, callback || function(){});
}
satelliteProto.login = function(callback){
    let _this = this;
    _this.receiveEvent('login',function(data){
        callback(data);
    });
}
//登出
satelliteProto.ready_logout = function(obj,callback){
    this.sendOnceEvent('readyLogout',{
        login: obj.login, 
        token: obj.token
    },callback || function(){});
}
satelliteProto.logout = function(callback){
    let _this = this;
    _this.receiveEvent('logout',function(data){
        callback(data);
        _this.sendOnceEvent('logoutRecieveSuccess', data[50]);  //登出成功 返回成功信息，方便webchannel销毁这个账号的连接
    });
    //this.sendOnceEvent('logoutCallback' , 'OK');
}

//开单
satelliteProto.ready_openOrder = function(obj,callback){
    this.sendOnceEvent('readyOpenOrder',{
                login: obj.login, 
                token: obj.token,
                currency: obj.currency,
                type: obj.type, 
                vol: obj.vol,
                time: obj.time
            },callback || function(){});
}
satelliteProto.openOrder = function(callback){
    this.receiveEvent('openOrder',callback);
}
//关单
satelliteProto.ready_closeOrder = function(obj,callback){
    this.sendOnceEvent('readyCloseOrder',{
                login: obj.login, 
                token: obj.token,
                ordernum: obj.ordernum,
                type: obj.type, 
                vol: obj.vol,
                time: obj.time
            },callback);
}
satelliteProto.closeOrder = function(callback){
    this.receiveEvent('closeOrder',callback);
}
//交易中记录
satelliteProto.ready_tradingHistory = function(obj){
    this.sendEvent('readyTradingHistory',{
                login: obj.login, 
                token: obj.token,
                start: obj.start,
                limit: obj.limit,
                all: obj.all ? obj.all : false
            });
    
}
satelliteProto.tradingHistory = function(callback){
    this.receiveEvent('tradingHistory',callback);
}
satelliteProto.ready_tradedHistory = function(obj,callback){
    this.sendEvent('readyTradedHistory',{
                login: obj.login, 
                token: obj.token,
                start: obj.start,
                limit: obj.limit
            },callback);
    
}
satelliteProto.tradedHistory = function(callback){
    this.receiveEvent('tradedHistory',callback);
}

satelliteProto.ready_accountinfo = function(obj,callback){
    this.sendEvent('readyAccountinfo',{
                login: obj.login, 
                token: obj.token
            },callback);
    
}
satelliteProto.accountinfo = function(callback){
    this.receiveEvent('accountinfo',callback);
}

satelliteProto.ready_notice = function(obj){
    this.sendEvent('readyNotice',{
                token: obj.token
            });
    
}
satelliteProto.notice = function(callback){
    this.receiveEvent('notice',callback);
}


function separate(str,gref){
    return handleOneRow( str );
}

function handleOneRow(row){
    let result = {},
        col = row.split('|');
    for(let i = 0; i < col.length; i++){

        let obj = col[i].split('=');
        
        result[ obj[0] ] = obj[1];
    }
    return result;
}

function timeSSUtc(){
    //将时间转成utc时间，返回毫秒时间戳
    return (new Date()).getTime();
    //return Date.parse( (date ? new Date(date) : new Date()).toUTCString() )
}
module.exports = SatelliteSocket;