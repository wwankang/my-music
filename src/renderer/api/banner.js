import request from '@/utils/request'

export function banner() {
  return request({
    url: 'http://140.143.128.100:3000/banner',
    method: 'get'
  })
}