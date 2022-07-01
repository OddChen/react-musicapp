import { axiosInstence } from './config'

export const getBannerRequest = () => {
  return axiosInstence.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstence.get('/personalized')
}

export const getHotSingerListRequest = (count) => {
  return axiosInstence.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstence.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  )
}
