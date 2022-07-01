import React, { useEffect, useState } from 'react'
import Horizon from '../../baseUI/horizon-item'
import { alphaTypes, categoryTypes } from '../../api/config'
import { ListContainer, List, ListItem, NavContainer } from './style'
import { connect } from 'react-redux'
import Scroll from '../../baseUI/scroll'
import {
  changePageCount,
  changePullUpLoading,
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from './store/actionCreators'
import { changeEnterLoading } from '../Recommend/store/actionCreators'
import Loading from '../../baseUI/loading'
import LazyLoad, { forceCheck } from 'react-lazyload'

function Singers(props) {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const { singerList, enterLoading, pullUpLoading, pullDownLoading } = props
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch,
  } = props

  // const {category, alpha} = data.toJS()

  useEffect(() => {
    getHotSingerDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let handleUpdateAlpha = (val) => {
    setAlpha(val)
    updateDispatch(category, val)
  }
  let handleUpdateCateory = (val) => {
    setCategory(val)
    updateDispatch(val, alpha)
  }

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : []
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className='img_wrapper'>
                <LazyLoad
                  placeholder={
                    <img
                      width='100%'
                      height='100%'
                      src={require('./singer.png')}
                      alt='music'
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300*300`}
                    width='100%'
                    height='100%'
                    alt='music'
                  />
                </LazyLoad>
              </div>
            </ListItem>
          )
        })}
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title={'分类（默认热门）：'}
          handleClick={(val) => handleUpdateCateory(val)}
          oldVal={category}
        ></Horizon>
        <Horizon
          list={alphaTypes}
          title={'首字母：'}
          handleClick={(val) => handleUpdateAlpha(val)}
          oldVal={alpha}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll onScroll={forceCheck}>{renderSingerList()}</Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList(category, alpha))
    },
    // 滑倒最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count + 1))
      if (hot) {
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList(category, alpha))
      }
    },
    // 顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(0))
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
