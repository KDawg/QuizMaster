QuizController = Backbone.Router.extend({

	currentPage: null,

	routes: {
		'/title': 'showHome',
		'/test': 'showTest',
		'/score': 'showScore',
		'*actions': 'defaultRoute'  // catches http://example.com/#anything-you-chose
	},

	defaultRoute: function(actions) {
		console.log('default route[' + actions + ']');
	}

});