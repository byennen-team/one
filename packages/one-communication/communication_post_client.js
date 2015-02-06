Template.communicationPostInput.rendered = function(){
  $('.selectpicker').selectpicker();
// defining global var here doesn't fix JSHint error, since editor isn't used.
/* jshint ignore:start */
  this.editor = new MediumEditor('#communication-message-post-textarea');
  that = this;
  $('#communication-message-post-textarea').mediumInsert({
        editor: that.editor
    });
/* jshint ignore:end */
};

Template.communicationPostInput.helpers({
  isSelected: function() {
    return (Session.get('openRoomId') === this._id)?'selected':'';
  },
  companyChannels: function() {
    return Rooms.find({
      roomType: 'company'
    });
  },
  officeChannels: function() {
    return Rooms.find({
      roomType: 'office'
    });
  },
  dmChannels: function() {
    return Rooms.find({
      roomType: 'dm'
    });
  },
  roomChannels: function() {
    return Rooms.find({
      roomType: 'room'
    });
  },
  partnerName: function() {
    if(this.roomType !== 'dm')
      return;

    var participant = _.find(this.participants, function(item){
      return (item.participantId !== Meteor.userId());
    });
    console.log(participant)
    var partner = Meteor.users.findOne(participant.participantId);
    return partner.profile.firstName + ' ' + partner.profile.lastName;
  }
});

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
      postContent: Template.instance().editor
        .serialize()['communication-message-post-textarea'].value,
      draft: false
    };
    console.log(context.postContent)

    var roomsArray = $("#roomSelect").val();

    if (roomsArray.length <= 0)
      return null;

    var postImage = $("#fileId").val();

    if(postImage)
      context.fileId = postImage;

    if (context.title !== '' && context.postContent !== '') {

      _.each(roomsArray, function(room) {
        RoomsController.addPostMessageToRoom(room,
          context);
        //also mark room as read
        RoomsController.updateTimestamp(Session.get('openRoomId'));
      })


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