import ajaxJsonp from 'jsonp'

export default function jsonp (url, param, opt) {
  // jsonp所需要的url是一个完整的，不接受json对象的形式，所以需要把url与各种参数拼接起来
  url += (url.indexOf('?') < 0 ? '?' : '&') + resolveParam(param)
  return new Promise((resolve, reject) => {
    ajaxJsonp(url, opt, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// param参数是json对象的形式，包含key和value,需要解析
function resolveParam (param) {
  let urlparam = ''
  for (let k in param) {
    let value = param[k] !== undefined ? param[k] : ''
    urlparam += '&' + k + '=' + encodeURIComponent(value)
  }
  return urlparam ? urlparam.substring(1) : ''
}
