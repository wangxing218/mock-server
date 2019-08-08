// 获取列表
(req, res, mock) => {
  return mock.mock({
    code: 200,
    'result|10': [{
      'id': '@id',
      'userName': '@cname',
      'createTime': '@dateTime',
      'status|1': [1, 2, 3, 4]
    }],
    'total': 129
  })
}