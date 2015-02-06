Template.communicationPostInput.rendered = function(){
  $('.selectpicker').selectpicker();
// defining global var here doesn't fix JSHint error, since editor isn't used.
/* jshint ignore:start */
  var editor = new MediumEditor('#communication-message-post-textarea');
  $('#communication-message-post-textarea').mediumInsert({
        editor: editor
    });
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
  },

  'click #communication-message-post-btn': function(event) {
    var context = {
      title: $('#new-post-subject').val(),
      postContent: $('#communication-message-post-textarea').html(),
      draft: false
    };

    var postImage = null;

    if(postImage)
      context.fileId = postImage;

    console.log(context);
    if (context.title !== '' && context.postContent !== '') {
      RoomsController.addPostMessageToRoom(Session.get('openRoomId'),
        //TODO: multiple room selector
        context);

      //also mark room as read

      RoomsController.updateTimestamp(Session.get('openRoomId'));

      //and cleanup
      $('#new-post-subject').val("");
      $('#communication-message-post-textarea').html("Type a post");

      $( '#communication-message-post' )
      .velocity( "slideUp", { duration: 500 } );

    } else {
      return null;
    }

  },
  'click #communication-message-post-save': function(event) {
    var context = {
      title: $('#new-post-subject').val(),
      postContent: $('#communication-message-post-textarea').html(),
      draft: true
    };

    var postImage = null;

    if(postImage)
      context.fileId = postImage;

    console.log(context);
    if (context.title !== '' && context.postContent !== '') {
      RoomsController.addPostMessageToRoom(Session.get('openRoomId'),
        //TODO: multiple room selector
        context);

      //also mark room as read

      RoomsController.updateTimestamp(Session.get('openRoomId'));

      //and cleanup
      $('#new-post-subject').val("");
      $('#communication-message-post-textarea').html("Type a post");

      $( '#communication-message-post' )
      .velocity( "slideUp", { duration: 500 } );

    } else {
      return null;
    }

  },
  'click #communication-message-post-trash': function(event) {
    if($(event.currentTarget).data("id"))
      RoomsController.deleteMessage($(event.currentTarget).data("id"));
    //and cleanup
    $('#new-post-subject').val("");
    $('#communication-message-post-textarea').html("Type a post");

    $( '#communication-message-post' )
    .velocity( "slideUp", { duration: 500 } );
  },
  'click #communication-message-post-attachment-btn': function(event) {
    //TODO: add attachments (cover photo)
  }
});