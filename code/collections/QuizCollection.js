// Backbone Collections maintain an ordered set of Models

var QuizCollection = Backbone.Collection.extend({

	model: Quiz,

	initialize: function() {
		// TBD
	},

    url: './server/dir.php'

});