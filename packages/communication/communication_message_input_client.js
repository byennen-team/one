Template.messageInput.events({
	'mouseenter #communication-message-input-btn': function(){
		$('#communication-message-input-btn').velocity({ 
	    rotateZ: "90deg"
		});
	},

	'mouseleave #communication-message-input-btn': function(){
		$('#communication-message-input-btn').velocity({ 
	    rotateZ: "0deg"
		});
	}

});