import { AXIOS } from '@/components/http-common'

export default {
    getListByPage: async function (page) {
        return await AXIOS.get(`people/${page}`)
    }
}