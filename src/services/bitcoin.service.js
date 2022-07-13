import axios from "axios"
import { dbService } from "@/services/db.service"

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

