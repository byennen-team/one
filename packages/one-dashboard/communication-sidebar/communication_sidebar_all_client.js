Template.communicationSidebarAll.rendered = function(){

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Repeated to play nice with plugin
  $(".communication-sidebar-sleeve").mCustomScrollbar({
	  	theme:"one-light",
	  	scrollbarPosition: "inside"
  });

};

Template.communicationSidebarAll.helpers({
  haveDrafts: function () {
    var messages = Messages.find({
      creatorId: Meteor.userId(),
      messageType: 'post',
      'messagePayload.draft': true
    });
    return messages.count() > 0;
  }
});