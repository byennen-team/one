Template.communicationPostInput.rendered = function(){
  $('.selectpicker').selectpicker();
// defining global var here doesn't fix JSHint error, since editor isn't used.
/* jshint ignore:start */
  var editor = new MediumEditor('#communication-message-post-textarea');
/* jshint ignore:end */
};

Template.communicationPostInput.events({

  // close the post window
  'click .close-x': function () {
    $( '#communication-message-post' )
      .velocity( "slideUp", { duration: 500 } );
  },

   // minimize the post window
  'click .minimize': function () {
    $( '#communication-message-post' )
      .velocity( { bottom: -355 }, 300 )
      .addClass( 'little' );
  },

   // expand the post window
  'click .icon': function () {
    $( '#communication-message-post' )
      .velocity( { bottom: 0 }, 300 )
      .removeClass( 'little' );
  }
});