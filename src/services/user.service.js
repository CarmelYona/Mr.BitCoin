import { storageService } from "./storage.service"
export const userService = {
    getUser,
    createUser,
    logout,
    transferCoins
}
const STORAGE_KEY = 'user'
let gUser = storageService.load(STORAGE_KEY) ? storageService.load(STORAGE_KEY) : null
function logout() {
    storageService.save(STORAGE_KEY, null)
}

function getUser() {
    if (gUser) return gUser
    return null
}

function createUser(name) {
    const newUser = {
        name,
        coins: 19000,
        moves: []
    }
    gUser = newUser
    storageService.save(STORAGE_KEY, gUser)
    return newUser
}
function transferCoins(coins) {
    gUser.coins -= coins
    storageService.save(STORAGE_KEY, gUser)
    return gUser
}