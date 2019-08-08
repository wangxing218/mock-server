// 详情
(req, res, mock) => {
  /**
   * req.cookies.name 获取cookie
   * res.cookie('name','value', {}) 设置cookie
   * req.session.user = null 设置/删除session
   */
  return mock.mock({
    code: 200,
    result: {
      'id': '@id',
      'vcode': req.session.vcode,
      'name': 'name',
      'title': '@ctitle',
      'time': '@dateTime',
      'phone': /^1[3-9]\d{9}$/,
      'money|100-1000.2': 1928.32,
    }
  })
}