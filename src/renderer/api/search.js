import request from '@/utils/request'

export function searchMusic(name,type,limit,offset) {
  return request({
    url: '/search',
    method: 'get',
    params: {
        "keywords": name,
        "limit": 30,
        "offset": 0,
        "type": 1
      }
  })
}
///search/suggest
export function searchSuggest(name,type) {
  return request({
    url: '/search/suggest',
    method: 'get',
    params: {
        "keywords": name,
        "type": type
      }
  })
}

///search/hot
export function getSearchHotList() {
  return request({
    url: '/search/hot',
    method: 'get',
})
}

