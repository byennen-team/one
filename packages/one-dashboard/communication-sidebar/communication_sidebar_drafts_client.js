Template.communicationSidebarDrafts.rendered = function(){

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

Template.communicationSidebarDraftsFill.events({
  'click .draft': function (event) {
    Session.set('draftId', $(event.currentTarget).data('id'));
    $('.selectpicker').selectpicker('render');
    $( '#communication-message-post' )
      .velocity( "slideDown", { duration: 500 } );
  }
});