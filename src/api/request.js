import { axiosInstence } from './config'

export const getBannerRequest = () => {
  return axiosInstence.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstence.get('/personalized')
}
