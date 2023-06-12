import axios, { AxiosInstance } from 'axios'

export const customAxios: AxiosInstance = axios.create()

customAxios.defaults.timeout = 2500
customAxios.defaults.baseURL = 'https://opendata.resas-portal.go.jp'
customAxios.defaults.headers.get['X-API-KEY'] =
  import.meta.env.VITE_RESAS_API_KEY

export default customAxios
