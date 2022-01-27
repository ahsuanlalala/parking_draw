import Api from './api'

export default {
    first(info) {
        return Api().post('/firstrand', info)
    },
    createRand(info) {
        return Api().post('/rand', info)
    },
    getAll(info) {
        return Api().post('/allList', info)
    },
    AllRand(info) {
        return Api().post('/Allrand', info)
    },
    ifDraw(info) {
        return Api().post('/drawOver', info)
    },
    ifAllDraw(info) {
        return Api().post('/lastOver', info)
    },
    // reborn(info){
    //     return Api().post('/reborn', info)
    // }
}