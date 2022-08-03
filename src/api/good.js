import request from '@/utils/request'

// 商品列表接口（与用户有关）
export function getGoodList(params) {
  return request({
    url: '/good/list',
    method: 'GET',
    params
  })
}

// 品类接口
export function getAllCates(params = {}) {
  return request({
    url: '/cate/all',
    method: 'GET',
    params
  })
}

// 商品添加或编辑
export function submitGood(data) {
  return request({
    url: '/good/update',
    method: 'POST',
    data
  })
}
