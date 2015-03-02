/* globals 
  comSidebarCurrentWidth: false,
  Messages: false 
*/

Template.communicationSidebarAll.rendered = function(){

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Desktop Only
  if( comSidebarCurrentWidth >= 992 ){
    $(".communication-sidebar-sleeve").mCustomScrollbar({
  	  	theme:"one-light",
  	  	scrollbarPosition: "inside"
    });
  }
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