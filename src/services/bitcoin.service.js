import axios from "axios"
import { dbService } from "@/services/db.service"

// const PRICE_HISTORY_KEY = 'price-historyDB'
// const TRANSACTIONS_HISTORY_KEY = 'transactions-historyDB'
// const AVG_BLOCK_SIZE = 'avg-block-sizeDB'

const STORAGE_KEYS = {
    PRICE_HISTORY_KEY: 'price-historyDB',
    TRANSACTIONS_HISTORY_KEY: 'transactions-historyDB',
    AVG_BLOCK_SIZE: 'avg-block-sizeDB'
}

const API_KEYS = {
    priceApi: 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true',
    transactionsApi: 'https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true',
    avgBlockSIzeApi: 'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true '
}

export const bitcoinService = {
    getRate,
    // getPriceHistory,
    // getTransactionsHistory,
    // getAvgBlockSize,
    getDataFromApi
}
async function getRate(coins) {
    const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    return res.data
}

async function getDataFromApi(storageKey, apiKey) {
    let dataFromApi = await dbService.query(STORAGE_KEYS[storageKey])
    if (!dataFromApi || !dataFromApi.length) {
        const res = await axios.get(API_KEYS[apiKey])
        console.log(res)
        await dbService.insert(STORAGE_KEYS[storageKey], res.data.values)
        dataFromApi = res.data.values
    }
    return dataFromApi
}




// async function getPriceHistory() {
//     let priceHistory = await dbService.query(PRICE_HISTORY_KEY)
//     if (!priceHistory || !priceHistory.length) {
//         const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
//         console.log('priceHistroy', res.data);
//         await dbService.insert(PRICE_HISTORY_KEY, res.data.values)
//         priceHistory = res.data.values
//     }
//     return priceHistory
// }
// async function getTransactionsHistory() {
//     let transactionsHistory = await dbService.query(TRANSACTIONS_HISTORY_KEY)
//     if (!transactionsHistory || !transactionsHistory.length) {
//         const res = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
//         await dbService.insert(TRANSACTIONS_HISTORY_KEY, res.data.values)
//         transactionsHistory = res.data.values
//     }
//     return transactionsHistory
// }
// async function getAvgBlockSize() {
//     let avgBlockSIze = await dbService.query(AVG_BLOCK_SIZE)
//     if (!avgBlockSIze || !avgBlockSIze.length) {
//         const res = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true ')
//         await dbService.insert(TRANSACTIONS_HISTORY_KEY, res.data.values)
//         avgBlockSIze = res.data.values
//     }
//     return avgBlockSIze
// }
