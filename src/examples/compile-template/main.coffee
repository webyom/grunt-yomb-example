$ = require('jquery')

foo = {}

foo.bar = ->
	tpl = require('./main.tpl.html')
	data = [
		{name: 'foo'},
		{name: 'bar'}
	]
	$('#foo-div').html(tpl.render(data))

module.exports = foo