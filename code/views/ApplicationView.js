
var ApplicationView = Backbone.View.extend({

	initialize: function() {
		// bind 'this' to the following event callback functions assuring proper context
		_.bindAll(this, 'render');

		this.currentPage = null;
	},

	swapCurrentPages: function(newPageId) {
		if (this.currentPage) $(this.currentPage).hide();
		this.currentPage = newPageId;
		$(this.currentPage).show();
	},

	showTitle: function() {
		this.swapCurrentPages('#home-page');
		Application.quizList();
	},

	showTest: function(quizInfo) {
		this.swapCurrentPages('#test-page');
		Application.quizStart(quizInfo);
	},

	showScore: function() {
		this.swapCurrentPages('#results-page');
		Application.scoreReview();
	},

	showLogin: function() {
		this.swapCurrentPages('#login-page');
		Application.login();
	},

	showTweet: function() {
		// SEE: "Twitter Devs - Tweet Buttons" :: https://dev.twitter.com/docs/tweet-button
		var url = 'https://twitter.com/share' +
			'?url=' + encodeURIComponent('http://www.twitter.com') +
			'&related=' + encodeURIComponent('KenTabor') +
			'&text=' + encodeURIComponent('Check it out test');
		window.location = url;
	}

});
