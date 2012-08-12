// A Backbone Model contains interactive data for an application object

var Question = Backbone.Model.extend({

	// default missing values on object creation
	defaults: {
		question: null,
		correct: 0,
		timeLimit: 0,
		answers: []
	},

    // called when creating an instance of a model
	initialize: function (spec) {
		if (!spec || !spec.question || spec.correct === undefined || !spec.answers) {
			throw "InvalidConstructArgs";
		}

		// default values for internal book-keeping
		this.set({
			isAnswered: false,
			answered: null,
			isCorrect: null
		});

		// bind callback for any attribute changing
		this.bind('change', function() {
			///console.log('values for this model have changed');
		});

		// bind callback for a specific attribute changing
		this.bind('change:timeLimit', function() {
			///console.log('user changes Model\'s timelimit');
		});

	},

	validate: function (attrs) {
		if (attrs.question) {
			if (!_.isString(attrs.question) || attrs.question.length === 0 ) {
				return 'Question must be a string with a length';
			}
		}

		if (attrs.timeLimit) {
			if (!_.isNumber(attrs.timeLimit) || attrs.timeLimit <= 0 ) {
				return 'timeLimit must be a number greater than 0';
			}
		}
	}

});