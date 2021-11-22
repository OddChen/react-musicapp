import axios from 'axios'

export const baseUrl = 'http://localhost:4000/'

// axios实例及拦截器配置
const axiosInstence = axios.create({
  baseURL: baseUrl,
})

axiosInstence.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, '网络错误')
  }
)

export { axiosInstence }
