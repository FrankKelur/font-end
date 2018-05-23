class Cache{
    constructor() {
        this.DB=null;
        this.DBName = 'trader';
        this.DBVersion = 1 ;

    }
    initDB(userName){

        const {DBName} = this;
        indexedDB.deleteDatabase(DBName + userName)
        let req = indexedDB.open(DBName + userName);
        req.onsuccess=e=>{
            this.DB = e.target.result

        }
        req.onerror=e=>{
        }
        req.onupgradeneeded=e=>{
            const DB = e.target.result;
            if(!DB.objectStoreNames.contains('traderStore')){
                let store = DB.createObjectStore('traderStore',{keyPath:'type'});
                store.createIndex('symbol','symbol',{unique:false})
            }
        }
        req.blocked=e=>{
        }
    }
    AddHistoryPirce(data,symbol,period){
        const {DB,DBName} = this;
        let transaction = DB.transaction('traderStore','readwrite');
        let store = transaction.objectStore('traderStore');
        let addData = {
            type:symbol + '-' + period,
            data:data,
            symbol:symbol,
            period:period
        }
        store.add(addData)
    }
    updatePrice(data){
        const {DB,DBName} = this;
        let transaction = DB.transaction('traderStore','readwrite');
        let store = transaction.objectStore('traderStore');
        let index = store.index('symbol')
        let request = index.openCursor(IDBKeyRange.only(data[3]))
        var nextTransaction,
            nextstore,
            nextReq;
        request.onsuccess = (e)=>{

            let cursor = e.target.result;
            if(cursor){
                cursor.continue()
                nextTransaction = DB.transaction('traderStore','readwrite')
                nextstore  = transaction.objectStore('traderStore');
                nextReq =  nextstore.get(cursor.primaryKey)
                nextReq.onsuccess = (e)=>{
                    let oldPriceObj = e.target.result

                    let newPriceObj  = this.updateData(data,oldPriceObj)
                    nextstore.put(newPriceObj)
                }
            }

        }

    }
    updateData(newData,oldPriceObj){
        let oldData = oldPriceObj.data,
            oldDataLength = oldData.length,
            lastPrice = oldData[oldDataLength-1],
            period = oldPriceObj.period*60000;
        if(newData > oldData[oldDataLength-1] +period ){
            let newPrice = [lastPrice[0] +period,newData[1],newData[1],newData[1],newData[1]]
            oldData.push(newPrice)
            oldData.shift();
        }
        else{
            let time = lastPrice[0],
                open = lastPrice[1],
                close = newData[1],
                high = newData[1] > lastPrice[2]?newData[1]:lastPrice[2],
                low =  newData[1] > lastPrice[3]?lastPrice[3]:newData[1];
                oldData.pop();
                oldData.push([time, open, high, low, close]);
        }
        return oldPriceObj;
    }
    getHistoryPrice(symbol){
        const {DB,DBName} = this;
        let transaction = DB.transaction('traderStore','readwrite');
        let store = transaction.objectStore('traderStore');
        let req = store.get(symbol);
        let getPricePromise = new Promise((resolve,reject)=>{
            req.onsuccess= (e)=>{
                resolve(e.target.result)
            }
            req.onerror = e=>{
                reject(e)
            }
        })
        return getPricePromise
    }
}
module.exports = Cache
