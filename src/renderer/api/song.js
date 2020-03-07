import request from '@/utils/request'

export function getSongUrlById(id) {
  console.log("songid")
  console.log(id)
  return request({
    url: 'http://140.143.128.100:3000/song/url',
    method: 'get',
    params: {
        id: id
      }
  })
}
//http://140.143.128.100:3000/top/list?idx=1
export function getSongTopListByType(type) {
  console.log("getSongListByType-->")
  return request({
    url: 'http://140.143.128.100:3000/top/list',
    method: 'get',
    params: {
      idx: type
    }
  })
}

