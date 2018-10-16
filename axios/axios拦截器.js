import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '../router/index'
import { getToken, removeToken, removeMenus } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data) {
      switch (response.data.status) {
        case 201: {
          Message({
            message: response.data.msg,
            type: 'success',
            center: true
          })
          break
        }// 登录成功
        case 400: {
          Message({
            message: response.data.msg,
            type: 'error',
            center: true
          })
          break
        }// 退出失败
        case 402: {
          Message({
            message: response.data.msg,
            type: 'error',
            center: true,
            duration: 0
          })
          break
        }// 用户名密码错误
        case 403: {
          Message({
            message: response.data.msg,
            type: 'warning',
            center: true
          })
          break
        }// 没有权限
        case 415: {
          Message({
            message: response.data.msg,
            type: 'error',
            center: true
          })
          break
        }// 服务器参数错误
        // router.push('/')
      }
    }
    return response
  },
  error => {
    if (error.response) {
      console.log(error.response.status)
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          removeMenus()
          removeToken()
          if (router.currentRoute.fullPath !== '/aboutus' && router.currentRoute.fullPath !== '/faq' && router.currentRoute.fullPath !== '/Permissions') {
            router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
            })
          }
      }
    }
    return Promise.reject(error.response)
  })


export default service