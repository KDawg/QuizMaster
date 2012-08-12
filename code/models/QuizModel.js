// A Backbone Model contains interactive data for an application object

var Quiz = Backbone.Model.extend({

	// default missing values on object creation
	defaults: {
		title: null,
		author: null,
		createdate: null,
		modifydate: null,
		filename: null
	},

    // called when creating an instance of a model
	initialize: function(spec) {
		if (!spec || !spec.title || spec.author === undefined || !spec.filename) {
			throw "InvalidConstructArgs";
		}

		// bind callback for any attribute changing
		this.bind('change', function() {
			///console.log('values for this model have changed');
		});
	}
});