// -------------------- huobi ----------------------------
setInterval(() => {
    var rows = document.querySelectorAll('.coin_list .coin_unit')
    var huobiObj = Array.from(rows).reduce((res, row) => {
        var key = row.querySelector('.base_currency').innerText
        key = key.split('/')[0].trim()
        var val = row.querySelector('[price=price]').innerText
        val = val.split('≈')[0].trim()
        res[key] = val
        return res
    }, {})
    fetch('http://localhost:3000/trade/report', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({"time": new Date().getTime(), "info": huobiObj}),
        headers: {'content-type': 'application/json'}
    }).then(res => {
        console.log("res", res)
    })
}, 60 * 1000)

// ---------------------- cry -----------------------------------
setInterval(() => {
    var table = document.querySelector('#currencyData-BTC')
    var marketArr = Array.from(table.querySelectorAll('tbody tr'))
    var cryObj = marketArr.reduce((res, row) => {
        var key = row.children[1].innerText;
        var val = row.children[7].innerText;
        key = key.split('/')[0]
        res[key] = val
        return res
    }, {})
    fetch('http://localhost:3000/trade/report', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({"time": new Date().getTime(), "info": cryObj}),
        headers: {'content-type': 'application/json'}
    }).then(res => {
        console.log("res", res)
    })
}, 60 * 1000)

// ------------------------- zb ---------------------------------
setInterval(() => {
    var btc = document.querySelector('.tabs .tab:nth-child(5)')
    btc && btc.click()
    var more = document.querySelector('.more-market .arrow-down')
    more && more.click()
    setTimeout(() => {
        var table = document.querySelector('.market-data .table-grid')
        var marketArr = Array.from(table.querySelectorAll('.tbody .tr'))
        window.zbObj = marketArr.reduce((res, row) => {
            var key = row.children[0].innerText;
            var val = row.children[1].innerText.trim();
            key = key.split('/')[0].trim()
            res[key] = val
            return res
        }, {})
        fetch('http://localhost:3000/trade/report', {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            headers: {'content-type': 'application/json'}
            body: JSON.stringify({"time": new Date().getTime(), "info": zbObj}),
        }).then(res => {
            console.log("res", res)
        })
    }, 1000)
}, 60 * 1000)

var huobiKeys = ["BCH", "ETH", "LTC", "ETC", "EOS", "ADA", "XRP", "OMG", "ZEC", "DASH", "STEEM", "IOTA", "XMR", "DGB", "BOX", "PAI", "HT", "ONT", "MTX", "AST", "UTK", "ELA", "WTC", "MEET", "EDU", "IOST", "SWFTC", "OCN", "WICC", "SOC", "ZIL", "AIDOC", "DTA", "ZLA", "BLZ", "YEE", "KAN", "BTM", "NAS", "PAY", "TRX", "THETA", "ACT", "HSR", "ICX", "NEO", "BFT", "CTXC", "LBA", "WAX", "MANA", "BAT", "ELF", "ZRX", "MTN", "VEN", "MDS", "ABT", "SRN", "APPC", "LET", "CMT", "DAT", "DBC", "EKO", "SMT", "STK", "QTUM", "ITC", "GAS", "MCO", "BTS", "CHAT", "OST", "PROPY", "RPX", "POWR", "RUFF", "TNB", "CVC", "KNC", "QASH", "DGD", "DCR", "POLY", "LUN", "WAN", "SNT", "RCN", "GNX", "QSP", "QUN", "GNT", "ADX", "WPR", "XEM", "LSK", "TNT", "EVX", "TOPC", "SNC", "SALT", "ENG", "RDN", "STORJ", "LINK", "REQ", "WAVES", "MTL", "BCX", "BCD", "SBTC", "BIFI", "BTG"]
var zbkeys = ["ZB", "BCC", "LTC", "ETH", "ETC", "BTS", "EOS", "QTUM", "HSR", "XRP", "DASH", "UBTC", "BCD", "SBTC", "INK", "TV", "BCX", "BTH", "LBTC", "CHAT", "HLC", "BCW", "BTP", "TOPC", "ENT", "BAT", "1ST", "SAFE", "QUN", "BTN", "TRUE", "CDC", "DDM", "BITE", "HOTC", "XUC", "EPC", "BDS", "GRAM", "DOGE", "NEO", "OMG", "HPY", "BTM", "SNT", "AE", "ICX", "ZRX", "EDO", "FUN", "MANA", "RCN", "XLM", "MCO", "MITH", "KNC", "GNT", "MTL", "SUB", "XEM", "EOSDAC", "KAN", "ADA", "XWC", "SLT"]
var cryKeys = ["42", "300", "611", "888", "CNET", "WC", "EVR", "XMCC", "ETH", "DOGE", "DGB", "ETN", "LTC", "BITG", "CDM", "GIN", "QAC", "XBP", "LYL", "CENNZ", "LINDA", "ORME", "LUX", "DGPT", "ADA", "XMR", "TPAY", "UNIT", "XSN", "ECA", "BWK", "ZEN", "TOA", "XPM", "DOT", "DASH", "DEV", "BTX", "DBIX", "ZEC", "XBY", "BIS", "TRX", "BCH", "XVG", "GBX", "ZCL", "COLX", "ETC", "RAIN", "AC3", "HXX", "MSP", "MEC", "$PAC", "NEO", "RDD", "NLX", "NLC2", "XSPEC", "LIVE", "PIRL", "ZOI", "SUMO", "POLIS", "FROST", "IQ", "PIVX", "SKY", "GNR", "LOKI", "PHR", "NXS", "MARKS", "FTC", "XEM", "GCC", "KBR", "MAID", "PLR", "DNR", "NPW", "EOS", "RYO", "ELLA", "CAPP", "STRAT", "DIVX", "ONION", "MAZA", "CMPCO", "VIT", "DCR", "GZE", "FJC", "DCN", "CEFS", "CANN", "UBQ", "PROC", "ZAP", "KMD", "ZER", "ADST", "PURA", "GRS", "POWR", "XZC", "NEBL", "SCT", "NAV", "WISH", "GRFT", "HUSH", "VIVO", "FCT", "HSR", "GNT", "POLL", "LBC", "PPC", "UNO", "AU", "TUSD", "LSK", "OXY", "OK", "ACC", "IC", "ORE", "HOLD", "BEAN", "HC", "VITAE", "CTL", "IFT", "ECO", "INN", "SEND", "LINX", "BSD", "PRL", "XPTX", "MUSIC", "GBYTE", "SRN", "NMC", "GAME", "ARK", "GEERT", "FANS", "STN", "FLASH", "TWIST", "WSX", "XGOX", "DEUS", "MAG", "LWF", "DOPE", "ODN", "DIM", "OMG", "BPL", "XBC", "CRAVE", "XZX", "XXX", "MINT", "SAGA", "BTDX", "BUBO", "NVC", "HAC", "BON", "ZEST", "OPC", "DP", "BTM", "MGO", "AMN", "TZC", "SHVR", "ZET", "NRG", "LCP", "BLOCK", "CREA", "EMC2", "ANI", "UFR", "UIS", "EMC", "POT", "ADC", "NETKO", "DNA", "TRC", "ABC", "CLOAK", "CRC", "ATMOS", "ETZ", "BLK", "LINA", "KRB", "HEAT", "CRM", "$$$", "SHA", "SRC", "MTNC", "KNC", "TOK", "RBY", "MBRS", "BUMBA", "PINK", "CLAM", "PAY", "ACOIN", "DGC", "LTB", "VPRC", "ARG", "BCPT", "BSTY", "GRN", "RED", "MTL", "BRG", "NMS", "ATOM", "XRA", "TTY", "BKCAT", "DUO", "AMP", "SCL", "BAY", "UNIC", "ALIS", "BIP", "SPANK", "SHRM", "CAR", "DEM", "VRC", "SIB", "MNE", "TGC", "NTRN", "CCN", "BEEZ", "VRM", "MAC", "ENJ", "BTCS", "CAP", "PF", "EDDIE", "CL", "FT", "CDN", "CJ", "PUT", "SKC", "XCO", "OOO", "CC", "BERN", "XP", "IVY", "GNO", "BCF", "OTN", "SKRL", "BVB", "PIGGY", "ARC", "SYNX", "CHC", "R", "VOISE", "XBTS", "ARCO", "ABY", "UNIFY", "INPAY", "HST", "ETHD", "LANA", "IRL", "RICKS", "WEED", "EXP", "WHL", "GDC", "LBTC", "AUR", "PCOIN", "CMT", "CHAN", "APX", "XRY", "EZT", "XWC", "GAP", "CNO", "MAR", "PBL", "TES", "NET", "GRWI", "FLT", "RNS", "GUN", "BOLI", "PXC", "BLC", "BTG", "GLD", "MST", "KUMA", "MARX", "WDC", "DAS", "COPPER", "PASL", "STV", "RPC", "OPCX", "SXC", "MATRX", "I0C", "EQT", "TTC", "PND", "IQT", "TX", "BTB", "NOBL", "TAJ", "FTCC", "XMY", "KEK", "ALT", "IDH", "CXT", "TIX", "BDL", "CPN", "MARS", "ZSE", "ARI", "V", "CTIC3", "TER", "RIYA", "START", "COAL", "KOBO", "SDRN", "MCI", "PAK", "INFX", "EDRC", "CBX", "EFL", "RKC", "MOIN", "LEMON", "SOIL", "CACH", "WILD", "XLC", "GPL", "SONG", "XCXT", "CHESS", "IXC", "DRXNE", "AGA", "HAL", "FC2", "YOVI", "SFC", "MOJO", "RC", "SWING", "OSC", "HYP", "SIRX", "ERY", "ALL", "BUN", "RBT", "DPP", "ORB", "BLZ", "EUC", "XID", "XPD", "BCS", "TEK", "NAMO", "QRK", "PCN", "XMG", "EMD", "PLC", "QBT", "LTCU", "SMC", "ELM", "QTUM", "BGR", "ZNY", "QTL", "NEVA", "ELC", "KED", "PTC", "TIT", "WW", "HAV", "LEA", "AC", "DIME", "EBG", "DAXX", "PXI", "GXG", "DCY", "CON", "NYAN", "LIT", "ARGUS", "DALC", "XBL", "HBN", "BENJI", "FRN", "FONZ", "FST", "BTA", "INSN", "SAND", "WSP", "POST", "MAGN", "XST", "SQL", "TRK", "MOTO", "FLAX", "KRONE", "UMO", "ATH", "ALEX", "SKR", "XRE", "VUC", "EVO", "MINEX", "ECOB", "VCC", "PR", "SPR", "CAN", "UTC", "OZC", "MAGE", "MNM", "BOXX", "FFC", "XJO", "XCT", "QWARK", "PHS", "KDC", "IN", "DARK", "CQST", "SPACE", "DON", "KUSH", "SOON", "CAT", "PCC", "ITI", "LDC", "POP", "TOP", "OFF", "8BIT", "LDOGE", "GRW", "SJW", "BNX", "CFC", "SPT", "TRI", "GP", "DIRTY", "SLG", "BTCD", "TRBO", "EGC", "BUCKS", "EVIL", "VADE", "FUZZ", "TRUMP", "PROUD", "EDC", "CRX", "OPAL", "KASH", "UR", "Q2C", "SEL", "WRC", "MLITE", "SAFEX", "EC", "WLC", "PEPE", "C2", "REP", "CRYPT", "21M", "BNC", "DDF", "DRP", "BRO", "OX", "ETT", "SKIN", "MYB", "STRC", "NDAO", "BOP", "COR", "HDLB", "KING", "KAYI", "RUP", "HLM", "SBC", "IZE", "MGX", "XCPO", "MONK", "PLX", "AURS", "DBET", "HBC", "DRPU", "GEO", "FUTX", "BITS"]

var union = {
    "LTC": 3,
    "ETH": 3,
    "ETC": 3,
    "BTS": 2,
    "EOS": 3,
    "QTUM": 3,
    "HSR": 3,
    "XRP": 2,
    "DASH": 3,
    "BCD": 2,
    "SBTC": 2,
    "BCX": 2,
    "LBTC": 2,
    "CHAT": 2,
    "TOPC": 2,
    "BAT": 2,
    "QUN": 2,
    "DOGE": 2,
    "NEO": 3,
    "OMG": 3,
    "BTM": 3,
    "SNT": 2,
    "ICX": 2,
    "ZRX": 2,
    "MANA": 2,
    "RCN": 2,
    "MCO": 2,
    "KNC": 3,
    "GNT": 3,
    "MTL": 3,
    "XEM": 3,
    "KAN": 2,
    "ADA": 3,
    "XWC": 2,
    "DGB": 2,
    "XMR": 2,
    "ZEC": 2,
    "TRX": 2,
    "BCH": 2,
    "DCR": 2,
    "POWR": 2,
    "LSK": 2,
    "SRN": 2,
    "PAY": 2,
    "CMT": 2,
    "BTG": 2,
    "BLZ": 2
}
var hot = ["LTC", "ETH", "ETC", "EOS", "QTUM", "HSR", "DASH", "NEO", "OMG", "BTM", "KNC", "GNT", "MTL", "XEM", "ADA"]