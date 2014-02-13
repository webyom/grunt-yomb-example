/**
 * YOM require jsonp plugin
 */
define('require-plugin/jsonp', ['global'], function(global) {
	var _ERROR_OBJ = {}

	var _head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
	var _isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]'
	var _callbackHolder = {}
	var _callbackAll = {}
	var _interactiveMode = false
	var _scriptBeingInserted = null
	var _cache = {}
	var _queue = {}
	var _count = 0

	var CallbackHolder = function(name) {
		var self = this
		this._name = name
		this._callbackArgs = CallbackHolder.NOT_CALLBACKED
		global[name] = function() {
			return self._callback.apply(self, _getArray(arguments))
		}
	}

	CallbackHolder.NOT_CALLBACKED = new Object()

	CallbackHolder.prototype._callback = function() {
		var script, loaderId, callback
		if(_interactiveMode) {
			script = _scriptBeingInserted || _getInteractiveScript()
			if(script) {
				loaderId = script.getAttribute('data-require-jsonp-id')
				if(loaderId) {
					callback = _callbackAll[loaderId]
					callback && callback.apply(null, _getArray(arguments))
				}
			}
		} else {
			this._callbackArgs = arguments
		}
	}

	CallbackHolder.prototype.getCallbackArgs = function() {
		var res = this._callbackArgs
		this._callbackArgs = CallbackHolder.NOT_CALLBACKED
		return res
	}

	function _getArray(arr) {
		return Array.prototype.slice.call(arr)
	}

	function _getInteractiveScript() {
		var script, scripts
		scripts = document.getElementsByTagName('script')
		for(var i = 0; i < scripts.length; i++) {
			script = scripts[i]
			if(script.readyState == 'interactive') {
				return script
			}
		}
		return script
	}

	function _clearJsonp(jsEl, callbackName, onload, onerror) {
		if(jsEl.addEventListener)  {
			jsEl.removeEventListener('load', onload, false)
			jsEl.removeEventListener('error', onerror, false)
		} else {
			jsEl.detachEvent('onreadystatechange', onload)
		}
		jsEl.parentNode.removeChild(jsEl)
	}

	function _loadJsonp(url, callback, callbackName, charset) {
		var id = 'REQUIRE_JSONP_' + (_count++)
		var callbacked = false
		var _callback = _callbackAll[id] = function() {
			delete _callbackAll[id]
			callbacked = true
			callback.apply(null, _getArray(arguments))
		}
		_callbackHolder[callbackName] = _callbackHolder[callbackName] || new CallbackHolder(callbackName)
		function onload() {
			_clearJsonp(jsEl, callbackName, onload, onerror)
			var callbackArgs = _callbackHolder[callbackName].getCallbackArgs()
			if(callbackArgs == CallbackHolder.NOT_CALLBACKED) {
				callback(null, _ERROR_OBJ)
			} else {
				_callback.apply(null, _getArray(callbackArgs))
			}
		}
		function onerror() {
			_clearJsonp(jsEl, callbackName, onload, onerror)
			callback(null, _ERROR_OBJ)
		}
		function ieOnload() {
			if(jsEl && (jsEl.readyState == 'loaded' || jsEl.readyState == 'complete')) {
				_clearJsonp(jsEl, callbackName, ieOnload)
				jsEl = null
				if(!callbacked) {
					callback(null, _ERROR_OBJ)
				}
			}
		}
		var jsEl = document.createElement('script')
		if(jsEl.attachEvent && !_isOpera) {
			_interactiveMode = true
			jsEl.attachEvent('onreadystatechange', ieOnload)
		} else {
			jsEl.addEventListener('load', onload, false)
			jsEl.addEventListener('error', onerror, false)
		}
		jsEl.charset = charset
		jsEl.type = 'text/javascript'
		jsEl.async = 'async'
		jsEl.src = url
		jsEl.setAttribute('data-require-jsonp-id', id)
		_scriptBeingInserted = jsEl
		jsEl = _head.insertBefore(jsEl, _head.firstChild)
		_scriptBeingInserted = null
	}

	function req(id, config, callback, errCallback) {
		var url = this._getResource(id)
		var params, callbackName, charset, queue
		if(callback) {
			if(url) {
				params = this._getParams(id)
				if(!params['noCache'] && _cache[url]) {
					callback(_cache[url])
				} else if(!params['noCache'] && _queue[url]) {
					_queue[url].push({callback: callback, errCallback: errCallback});
				} else {
					queue = _queue[url] = _queue[url] || [];
					queue.push({callback: callback, errCallback: errCallback});
					callbackName = params['callbackName'] || 'callback'
					charset = params['charset'] || 'utf-8'
					_loadJsonp(url, function(data, err) {
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
					}, callbackName, charset)
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

