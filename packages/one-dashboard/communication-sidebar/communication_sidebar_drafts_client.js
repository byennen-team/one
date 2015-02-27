/* globals Messages: false, RoomsController: false */
Template.communicationSidebarDraftsFill.rendered = function(){
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Repeated to play nice with plugin
  $(".communication-sidebar-sleeve").mCustomScrollbar({
      theme:"one-light",
      scrollbarPosition: "inside"
  });

};

Template.communicationSidebarDraftsFill.helpers({
  drafts: function() {
    return Messages.find({
      creatorId: Meteor.userId(),
      messageType: 'post',
      'messagePayload.draft': true
    });
  }
});

Template.draftTemplate.events({
  'click .draft': function (event) {
    Session.set('draftId', $(event.currentTarget).data('id'));
    $('.selectpicker').selectpicker('render');
    $( '#communication-message-post' )
      .velocity( "slideDown", { duration: 500 } );
  },
  'click .delete-channel': function (event) {
    var postId = $(event.currentTarget).parent('li.draft').data('id');
    console.log(postId);

    if(! postId)
      return;

    RoomsController.deleteMessage(postId);
  }
});