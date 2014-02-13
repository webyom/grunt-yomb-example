define (require) ->
	$ = require('jquery')

	foo = {}

	foo.bar = ->
		alert('Hello world!')

	foo