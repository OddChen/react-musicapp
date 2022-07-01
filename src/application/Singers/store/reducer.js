import { fromJS } from 'immutable'
import {
  CHANGE_ENTER_LOADING,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_SINGER_LIST,
} from './constant'

const defaultState = fromJS({
  singerList: [],
  enterloading: true,
  pullUpLoading: false, // 上拉加载动画
  pullDownLoading: false, // 下拉加载动画
  pageCount: 0, // 分页
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SINGER_LIST:
      return state.set('singerList', action.data)
    case CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data)
    case CHANGE_ENTER_LOADING:
      return state.set('enterloading', action.data)
    case CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data)
    case CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data)
    default:
      return state
  }
}
