// all functionality wrapped up into a namespace

var Application = (function($) {

	// private data

	var quizDirCollect, quizDirView;
	var quizTitle, quizSet, quizView, questionData;
	var currentQuestion, numWrong, numCorrect;
	var timerId = null;


	// private functions

	function qwizDirInit() {
		loadingOverlayVisibility(true);
		quizDirCollect = new QuizCollection();
		quizDirCollect.fetch({
			success: function() {
				loadingOverlayVisibility(false);
				quizDirView = new QuizListView({collection: quizDirCollect.models});
				quizDirView.render();
				$('#qwiz-list-panel').html(quizDirView.el);
			},
			error: function() {
				loadingOverlayVisibility(false);
				console.log('ERROR: quiz directory service response error');
			}
		});
	}


	function quizInit(quizInfo) {
		initializeData();
		quizTitleSet(quizInfo.title);

		loadingOverlayVisibility(true);
		quizSet = new QuestionCollection();
		quizSet.url = './server/quiz.php?quizName=' + quizInfo.filename;
		quizSet.fetch({
			success: function() {
				loadingOverlayVisibility(false);
				arrowButtonsInit();
				currentQuestionRender();
				correctStatusRender();
				wrongStatusRender();
				questionNumberStatusRender();
				countdownStart();
			},
			error: function() {
				loadingOverlayVisibility(false);
				console.log('ERROR: quiz read service response error');
			}
		});
	}

	function initializeData() {
		// initializing all data members on 1st run, and clearing/recycling for subsequent
		quizSet = null;
		quizView = null;

		quizTitle = null;
		questionData = null;
		currentQuestion = 0;
		numWrong = 0;
		numCorrect = 0;
		timerId = null;
	}


	function currentQuestionRender() {
		questionData = quizSet.at(currentQuestion);
		quizView = null;
		quizView = new QuestionView({model: questionData});
		quizView.render();
	}


	function arrowButtonsInit() {
		$('#previous').click(function() {
			questionNavigateBackward();
		});

		$('#next').click(function() {
			questionNavigateForward();
		});

		$('#results-home-button').click(function() {
			homeNavigate();
		});
	}


	function questionNavigateBackward() {
		currentQuestion--;
		if (currentQuestion < 0) currentQuestion = 0;
		displayCurrentQuestion();
	}


	function questionNavigateForward() {
		currentQuestion++;
		if (currentQuestion >= quizSet.length) currentQuestion = quizSet.length - 1;
		displayCurrentQuestion();
	}


	function displayCurrentQuestion() {
		countdownStop();
		currentQuestionRender();
		questionNumberStatusRender();
		countdownStart();
	}


	function homeNavigate() {
		Application.view.showTitle();
	}


	function quizTitleSet(title) {
		quizTitle = title;
		$('#title > p').html(quizTitle);
	}


	function questionNumberStatusRender() {
		var num = currentQuestion + 1;
		$('#number').text(num.toString(10) + '/' + quizSet.length.toString(10));
	}


	function countdownStart() {
		var timeLabel = "---";
		var timeLimit = questionData.get('timeLimit');

		if (timeLimit != undefined && timeLimit != 0) {
			if (questionData.get('isAnswered') === false) {
				timerId = setInterval(countdownCallback, 1000);
				timeLabel = timeLimit.toString(10);
			}
		}

		timeStatusRender(timeLabel);
	}


	function timeStatusRender(text) {
		$('#time').text(text);
	}


	function countdownCallback() {
		var curTime = questionData.get('timeLimit') - 1;
		questionData.set({timeLimit: curTime});

		if (curTime <= 0) answerWrongFromTimeout();
		else timeStatusRender(curTime.toString(10));
	}


	function countdownStop() {
		if (timerId != null) {
			clearInterval(timerId);
			timerId = null;
			timeStatusRender('---');
		}
	}


	function answerSelect(answerIndex) {
		if (questionData.get('isAnswered') === false) {
			if (questionData.get('answers')[answerIndex] !== undefined) {
				if (questionData.get('correct') === answerIndex) answerCorrect(answerIndex);
				else answerWrong(answerIndex);
			}
		}
	}


	function answerCorrect(chosenIndex) {
		countdownStop();
		questionSetAnswered(chosenIndex, true);
		quizView.markAsCorrectAnswer(chosenIndex);
		numCorrect++;
		correctStatusRender();
		quizCompletedCheck();
	}


	function answerWrong(chosenIndex) {
		countdownStop();
		questionSetAnswered(chosenIndex, false);
		quizView.markAsWrongAnswer(chosenIndex);
		numWrong++;
		wrongStatusRender();
		quizCompletedCheck();
	}


	function answerWrongFromTimeout() {
		alert('Time ran out for answering this question! It\'s counted as incorrect.');
		answerWrong(questionData.get('correct'));
	}


	function quizCompletedCheck() {
		if ((numWrong + numCorrect) === quizSet.length) {
			// fire off next menu state after a slight pause that our user may digest info
			setTimeout("Application.view.showScore()", 1500);
		}
	}


	function questionSetAnswered(chosenIndex, isCorrect) {
		questionData.set({
			isAnswered: true,
			answered: chosenIndex,
			isCorrect: isCorrect
		});
	}


	function correctStatusRender() {
		$('#correct').text(numCorrect.toString(10));
	}


	function wrongStatusRender() {
		$('#wrong').text(numWrong.toString(10));
	}


	function scoreInit() {
		$('#results-title >p').html(quizTitle);
		$('#ResultsCorrect >p').html(numCorrect);
		$('#ResultsTotal >p').html(quizSet.length);
	}


	function loadingOverlayVisibility(isVisible) {
		if (isVisible) $('#loading-overlay').show();
		else $('#loading-overlay').hide();
	}


	// public interface is returned

	return {
		initialize: function() {
			console.log('starting the web app!');

			Application.view = new ApplicationView();
			Application.controller = new QuizController();
			Backbone.history.start();

			Application.view.showLogin();
		},

		quizList: function() {
			qwizDirInit();
		},

		quizStart: function(quizInfo) {
			quizInit(quizInfo);
		},

		scoreReview: function() {
			scoreInit();
		},

		login: function() {
			// TODO: placeholder for consistency, fill this in with stuff...
		},

		answerSelected: function(index) {
			answerSelect(index);
		}
	};

})(jQuery);