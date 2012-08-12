// Backbone Views are a convention for drawing changes to a model to the browser

var QuizView = Backbone.View.extend({

	///tagName: 'li',

	initialize: function() {
		// bind 'this' to the following event callback functions assuring proper context
		_.bindAll(this, 'render');

		// when our model changes, re-render to display those updates
		this.model.bind('change', this.render);

		// when our model is deleted, remove its display DOM element
		this.model.bind('delete', this.remove);
	},

	// attach a callback handler to an DOM event/selector
	events: {
		'click .quiz-list-entry': 'handleClick'
	},

	// how the Model template is rendered
	render: function() {
		var template =
			'<div class="quiz-list-entry">' +
				'<div class="quiz-title"><%= title %></div>' +
				'<div class="quiz-author">By <%= author %></div>' +
				'<div class="quiz-stats"><%= count %> Questions</div>' +
				'</div>';
		var compiledTemplate = _.template(template);

		$(this.el).append(compiledTemplate(this.model.toJSON()));

		return this;
	},

	remove: function() {
		$(this.el).remove();
	},

	handleClick: function(tgt) {
		tgt.preventDefault();
		Application.view.showTest(this.model.attributes);
	}

});