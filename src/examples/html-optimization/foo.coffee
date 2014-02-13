$ = require('jquery')

foo = {}

foo.bar = ->
	tpl = require('./foo.tpl.html')
	data = [
		{name: 'foo'},
		{name: 'bar'}
	]
	$('#bar-div').html(tpl.render(data))

module.exports = foo