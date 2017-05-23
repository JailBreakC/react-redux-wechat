const API = {
  pro: '//wx.vgee.cn',
  dev: 'http://127.0.0.1:8877'
}

let exportAPI

if (process.env.NODE_ENV === 'production') {
  exportAPI = API.pro
} else {
  exportAPI = API.dev
}
console.log(process.env.NODE_ENV)

export default exportAPI