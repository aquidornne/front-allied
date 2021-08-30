import axios from 'axios'
import store from '@/store'

const urlApi = "http://localhost:8000/"

var paramsAxios = {
  baseURL: `${urlApi}`,
  headers: {
    "Content-Type": "application/json"
  }
}

let api = axios.create(paramsAxios)

const errorHandler = async error => {
  store._actions['loader/loading'][0](false)
  const e = {
    responseText: error.request.responseText,
    responseURL: error.request.responseURL,
    status: error.request.status,
    statusText: error.request.statusText,
    requestwithCredentials: error.request.withCredentials
  }
  //Vue.swal('Erro interno na aplicação.')
  return Promise.reject(e)
}

const successHandler = response => {
  store._actions['loader/loading'][0](false)
  return response
}

api.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

api.interceptors.request.use((config) => {
  store._actions['loader/loading'][0](true)
  return config
}, (error) => {
  store._actions['loader/loading'][0](false)
  return Promise.reject(error)
})

export const AXIOS = api