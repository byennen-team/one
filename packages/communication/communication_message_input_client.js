Template.messageInput.rendered = function(){
	Session.set('menuOpen', false);
}

Template.messageInput.events({
	// toggle the menu on button click
	'click #communication-message-input-btn': function(){
		var x = Session.get('menuOpen');
		if(x){
			Session.set("menuOpen", false);
		}else{
			Session.set("menuOpen", true);
		}
	},

	// close the menu when an option is selected
	'click #communication-message-input-options-post, click #communication-message-input-options-attachment, click #communication-message-input-options-task': function(){
		Session.set("menuOpen", false);
	}

});

Tracker.autorun(function () {
  var menuOpen = Session.get('menuOpen');
  if (menuOpen){
    $('#communication-message-input-btn').velocity({ rotateZ: "90deg"}, 400);
		$('#communication-message-input-options')
			.velocity({ opacity: 1 })
			.velocity("slideDown", { duration: 200 });
  } else {
  	$('#communication-message-input-btn').velocity({ rotateZ: "0deg"}, 400);
		$('#communication-message-input-options')
			.velocity("fadeOut", { duration: 300 })
			.velocity({ opacity: 0 });
  }
});
