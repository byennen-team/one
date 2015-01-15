Template.libraryMembers.rendered = function(){
  $(".library-board-sleeve").mCustomScrollbar({
  	theme:"one-light",
  	scrollbarPosition: "inside"
  });
}

Template.libraryMembers.events({

	'click #communication-library-invite': function(){
		$('#communication-library-invite-input').focus();
		$('#communication-library-invite-directory').css('opacity', '1');
	},

	'blur #communication-library-invite-input': function(){
		$('#communication-library-invite-directory').css('opacity', '0');
	}

});