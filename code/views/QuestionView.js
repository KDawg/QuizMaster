// Backbone Views are a convention for drawing changes to a model to the browser

var QuestionView = Backbone.View.extend({

	// all Views must have a DOM element
	el: $('#question-panel'),

	initialize: function() {
		// bind 'this' to the following event callback functions assuring proper context
		_.bindAll(this, 'render');

		// when our model changes, re-render to display those updates
		///this.model.bind('change', this.render);

		// when our model is deleted, remove its display DOM element
		///this.model.bind('delete', this.remove);
	},


	// attach a callback handler to an user event/DOM element selector pair
	events: {
		'click .answer-container': 'handleAnswerClick'
	},


	// how the Model template is rendered
	render: function() {
		var template =
			'<span><%= question %></span>' +
				'	<div class="answer-panel">' +
				'         <% for (var i = 0; i < answers.length; i++) { %>' +
				'         <%     var answerId = "A" + i.toString(10); %>' +
				'         <%     var letters = ["A", "B", "C", "D"]; %>' +
				'             <div id="<%= answerId %>" class="answer-container" data-answer-id="<%= i %>">' +
				'                 <div class="answer-letter"><p><%= letters[i] %></p></div>' +
				'                 <div class="answer-body"><%= answers[i] %></div>' +
				'             </div>' +
				'         <% } %>' +
				' </div>';

		var compiledTemplate = _.template(template);   // underscore template
		this.el.html(compiledTemplate(this.model.toJSON()));

		this.markIfPreviouslyAnswered();

		return this;    // enables chaining
	},


	remove: function() {
		$(this.el).remove();
	},


	handleAnswerClick: function(tgt) {
		tgt.preventDefault(); // @TODO: research what this does, but I've seen it in many web tuts

		var answerId = $(tgt.currentTarget).data('answer-id');
		Application.answerSelected(answerId);
	},


	markIfPreviouslyAnswered: function() {
		if (this.model.get('isAnswered') === true) {
			var controlId = '#A' + this.model.get('answered') + ' > div.answer-body';
			if (this.model.get('isCorrect') === true)
				$(controlId).addClass('answer-correct');
			else
				$(controlId).addClass('answer-wrong');
		}
	},


	markAsCorrectAnswer: function(answerIndex) {
		var controlId = '#A' + answerIndex.toString(10) + ' > div.answer-body';
		$(controlId).addClass('answer-correct');
	},


	markAsWrongAnswer: function(answerIndex) {
		var controlId = '#A' + answerIndex.toString(10) + ' > div.answer-body';
		$(controlId).addClass('answer-wrong');
	}

});