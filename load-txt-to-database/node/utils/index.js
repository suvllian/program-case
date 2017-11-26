var responseJSON = (res, result, method) => {
	if (method === 'get') {
		result ? res.jsonp(result) : res.json({code: '-200', msg: '操作失败', success: false})
	} else if (method === 'post') {
		result ? res.json({success: true}) : res.json({code: '-200', msg: '操作失败', success: false})
	}
}

module.exports = {
	responseJSON: responseJSON
}