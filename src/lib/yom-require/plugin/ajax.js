/**
 * YOM require ajax plugin
 */
define('require-plugin/ajax', ['global'], function(global) {
	var _ERROR_OBJ = {}

	var _cache = {}
	var _queue = {}

	function _loadXhr(url, callback, opt) {
		var xhr
		try {
			xhr = new XMLHttpRequest()
		} catch(e) {
			xhr = new ActiveXObject('MSXML2.XMLHTTP')
		}
		xhr.open('GET', url, true)
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
		if(opt.noCache) {
			xhr.setRequestHeader('If-Modified-Since', 'Sun, 27 Mar 1983 00:00:00 GMT')
			xhr.setRequestHeader('Cache-Control', 'no-cache')
		}
		if(opt.withCredentials) {
			xhr.withCredentials = true
		}
		xhr.onreadystatechange = function() {
			var res
			if(xhr.readyState !== 4) {
				return
			}
			if(xhr.status >= 200 && xhr.status < 300) {
				try {
					res = eval('(' + xhr.responseText + ')')
				} catch(e) {
					if(require.debug) {
						throw e
					} else {
						callback(null, _ERROR_OBJ)
					}
				}
				callback(res)
			} else {
				callback(null, _ERROR_OBJ)
			}
		}
		xhr.send()
	};

	function req(id, config, callback, errCallback) {
		var url = this._getResource(id)
		var params, queue
		if(callback) {
			if(url) {
				params = this._getParams(id)
				if(params['dataType'] == 'jsonp' || params['dataType'] != 'json' && url.indexOf(location.protocol + '//' + location.host + '/') !== 0) {
					require([id.replace(/^ajax/, 'jsonp')], function(data) {
						_cache[url] = data
						callback(data)
					}, function(err, info) {
						errCallback && errCallback(err, info)
					})
				} else {
					if(!params['noCache'] && _cache[url]) {
						callback(_cache[url])
					} else if(!params['noCache'] && _queue[url]) {
						_queue[url].push({callback: callback, errCallback: errCallback});
					} else {
						queue = _queue[url] = _queue[url] || [];
						queue.push({callback: callback, errCallback: errCallback});
						_loadXhr(url, function(data, err) {
							if(err === _ERROR_OBJ) {
								while(queue.length) {
									errCallback = queue.shift().errCallback
									errCallback && errCallback(require.ERR_CODE.LOAD_ERROR, {uri: url})
								}
							} else {
								_cache[url] = data
								while(queue.length) {
									queue.shift().callback(data);
								}
							}
						}, {
							noCache: !!params['noCache'],
							withCredentials: !!params['withCredentials']
						})
					}
				}
			} else {
				callback(this)
			}
		}
		return url && _cache[url] || this
	}

	return {
		require: req
	}
})
