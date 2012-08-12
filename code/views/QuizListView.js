// Backbone Views are a convention for drawing changes to a model to the browser

var QuizListView = Backbone.View.extend({

	///tagName: "ul",

	initialize: function() {
		_.bindAll(this, "renderItem");
	},

	renderItem: function(model) {
		var itemView = new QuizView({model: model});
		itemView.render();
		$(this.el).append(itemView.el);
	},

	render: function() {
		this.collection.forEach(this.renderItem);
	}
});