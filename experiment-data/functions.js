function trial_pair(A, B, relation = "causes", present = true, block, network, type, feedback = true) {

    var trials = []

    var trial_stim = "<p>" + A + " " + relation + " " + B + "</p>"

    var stim_trial = {type: "html-keyboard-response",
		      stimulus: trial_stim,
		      choices: [70, 74],
		      data: {present: present,
			     block: block,
			     network, network,
			     type: type},
		      on_finish: function(data) {

			  if ((present)) {

			      if (data.key_press==70) {
				  data.correct = true;
			      }
			      else {
				  data.correct = false;
			      }
			      
			  }
			  else {

			      if (data.key_press==74) {
				  data.correct = true;
			      }
			      else {
				  data.correct = false;
			      }
			  }
		      }
		     }

    trials.push(stim_trial)

    if (feedback) {
	var feedback_trial = {type: "html-keyboard-response",
			      data: {type: "feedback"},
			      stimulus:function() {
				  var last_trial = jsPsych.data.get().last(1).values()[0].correct;
				  console.log(last_trial)
				  if (last_trial) {
				      return  trial_stim + "<p><big>Correct!</big></p>"
				  }
				  else {
				      return  trial_stim + "<p><big>Incorrect!</big></p>"
				  }
			      },
			      response_ends_trial: function() {
				  var last_trial = jsPsych.data.get().last(1).values()[0].correct;
				  if (last_trial) {
				      return 500
				  }
				  else {
				      return 1000
				  }
			      }
			     }
	trials.push(feedback_trial)
    }

    return trials

}
