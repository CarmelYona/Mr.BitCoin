import { userService } from '../../services/user.service.js'
export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, { user }) {
            state.user = { ...user }
        },
    },
    actions: {
        loadUser(context) {
            const user = userService.getUser()
            context.commit({ type: 'setUser', user })
        },
        signUp(context, { name }) {
            const user = userService.createUser(name)
            context.commit({ type: 'setUser', user })
        },
        logout(context) {
            userService.logout()
            context.commit({ type: 'setUser', user: null })
        },
        transferCoins(context, { coins }) {
            const user = userService.transferCoins(coins)
            context.commit({ type: 'setUser', user })
        },
        addMove(context, { move }) {
            const user = userService.addMove(move)
            context.commit({ type: 'setUser', user })
        }
    },
    getters: {
        user(state) { return state.user }
    }
}