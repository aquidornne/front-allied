import { AXIOS } from '@/components/http-common'

export default {
    getPlanetByID: async function (id) {
        return await AXIOS.get(`planets/${id}`)
    }
}