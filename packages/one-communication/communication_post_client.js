/* globals Rooms: false, RoomsController: false, Messages: false */
Template.communicationPostInput.created = function() {
  this.autorun( function() {
    var draftId = Session.get('draftId');

    if (! draftId)
      return;

    var draft = Messages.findOne(draftId);

    if(! draft)
      return;

    $('#new-post-subject').val(draft.messagePayload.title);
    $('#communication-message-post-textarea').html(draft.message);
  });
};

Template.communicationPostInput.rendered = function(){
  $('.selectpicker').selectpicker();

  this.$editor = $('#communication-message-post-textarea').wysiwyg({
    classes: 'bottom-toolbar',
    toolbar: 'bottom',
    //selection'|'top'|'top-selection'|'bottom'|'bottom-selection
    buttons: {
      bold: {
          title: 'Bold (Ctrl+B)',
          image: '\uf032',
          hotkey: 'b'
      },
      italic: {
          title: 'Italic (Ctrl+I)',
          image: '\uf033',
          hotkey: 'i'
      },
      underline: {
          title: 'Underline (Ctrl+U)',
          image: '\uf0cd',
          hotkey: 'u'
      },
      forecolor: {
          title: 'Text color',
          image: '\uf1fb'
      },
      unorderedList: {
          title: 'Unordered list',
          image: '\uf0ca',
          showselection: false
      },
      orderedList: {
          title: 'Ordered list',
          image: '\uf0cb',
          showselection: false
      },
      insertimage: {
        title: 'Insert image',
        image: '\uf03e',
        showselection: false
      },
      insertlink: {
        title: 'Insert link',
        image: '\uf0c1'
      }
      // removeformat: {
      //     title: 'Remove format',
      //     image: '\uf12d'
      // }
    },
    submit: {
      title: 'Submit',
      image: '\uf00c'
    },
    placeholder: 'Type a post...',
    dropfileclick: 'Click or drop image',
    placeholderUrl: 'www.example.com',
    /* jshint camelcase: false */
    onImageUpload: function( insert_image ){

      var file = $(this)[0].files[0];
      var options = {
        onComplete: function (jqxhr) {
          insert_image(Meteor.settings.public.AWS_BUCKET_URL +
            '/' +jqxhr.filePath);
        },
        onError: function(error) {
          console.log(error);
        },
        filePath: 'posts/' + Random.id()
      };
      FileTools.upload('signProfilePictureUpload', file, options);
    },
    onKeyEnter: function(){}
  });

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // $( "#communication-message-post-textarea-sleeve" ).mCustomScrollbar({
  //     theme:"one-dark",
  //     scrollbarPosition: "inside"
  // });
  // Can't use scrollbar (plugin or native) with the WYSIWYG because it
  // scrolls the tools out of sight.
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
    var partner = Meteor.users.findOne(participant.participantId);
    return partner.profile.firstName + ' ' + partner.profile.lastName;
  }
});

Template.communicationPostInput.events({

  // close the post window
  'click .close-x': function () {
    $( '#communication-message-post' )
      .velocity( "slideUp", { duration: 500 } );

    Session.set('draftId', null);
  },

   // minimize the post window
  'click .minimize': function () {
    $( '#communication-message-post' )
      .velocity( {
        bottom: -355,
        height: 400,
        width: 315,
        right: '20%'
      }, 300 )
      .removeClass( 'big' )
      .addClass( 'little' );
  },

   // maximize the post window
  'click .maximize': function () {
    var $win = $( window );
    var currentHeight = $win.height();
    var currentWidth = $win.width();
    var tall = currentHeight - 100;
    if( tall < 400 ){ // don't shrink the window when expanding it!
      tall = 400;
    }
    var wide = currentWidth * 0.9;    // 90% of window
    var margin = currentWidth * 0.05; // 5% of window
    $( '#communication-message-post' )
      .velocity( {
        bottom: 0,
        width: wide,
        height: tall,
        right: margin
      }, 300 )
      .removeClass( 'little' )
      .addClass( 'big' );
    $( '#communication-message-post-textarea' ).velocity({
      height: tall - 234
    });
  },

   // medium post window
  'click .little .medium-btn, click .mediumize': function () {
    $( '#communication-message-post' )
      .velocity( {
        bottom: 0,
        width: 600,
        height: 400,
        right: '20%'
      }, 300 )
      .removeClass( 'little big' );
    $( '#communication-message-post-textarea' ).velocity({
      height: 180
    });
  },

  'click #communication-message-post-btn': function() {
    var context = {
      title: $('#new-post-subject').val(),
      postContent: $(Template.instance().$editor).html(),
      draft: false
    };

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
      });

      var draftId = Session.get('draftId');

      if (draftId)
        RoomsController.deleteMessage(draftId);

      Session.set('draftId', null);

      //and cleanup
      $('#new-post-subject').val("");
      $('#communication-message-post-textarea').html("");

      $( '#communication-message-post' )
      .velocity( "slideUp", { duration: 500 } );

    } else {
      return null;
    }

  },
  'click #communication-message-post-save': function() {
    var context = {
      title: $('#new-post-subject').val(),
      postContent: $(Template.instance().$editor).html(),
      draft: true
    };

    var postImage = $("#fileId").val();

    if(postImage)
      context.fileId = postImage;

    if (context.title !== '' && context.postContent !== '') {
      RoomsController.addPostMessageToRoom(Session.get('openRoomId'),
        context);

      //also mark room as read

      RoomsController.updateTimestamp(Session.get('openRoomId'));

      var draftId = Session.get('draftId');

      if (draftId)
        RoomsController.deleteMessage(draftId);

      Session.set('draftId', null);
      //and cleanup
      $('#new-post-subject').val("");
      $('#communication-message-post-textarea').html("");

      $( '#communication-message-post' )
      .velocity( "slideUp", { duration: 500 } );

    } else {
      return null;
    }

  },
  'click #communication-message-post-trash': function(event) {
    if($(event.currentTarget).data("id"))
      RoomsController.deleteMessage($(event.currentTarget).data("id"));

    //deleting all images in post
    $('#communication-message-post-textarea img').each(function() {
      var key = $(this).attr('src').replace(
        Meteor.settings.public.AWS_BUCKET_URL + '/', '');
      FileTools.deleteStub('deleteFilesFromS3',key);
    });

    var draftId = Session.get('draftId');

      if (draftId)
        RoomsController.deleteMessage(draftId);

      Session.set('draftId', null);
    //and cleanup
    $('#new-post-subject').val("");
    $('#communication-message-post-textarea').html("");

    $( '#communication-message-post' )
    .velocity( "slideUp", { duration: 500 } );
  },
  'click #communication-message-post-attachment-btn': function() {
    $('.wysiwyg-toolbar').toggle();
  },
// ANDREAS: can't get this click event to fire. I guess it's not in this
// template?
  'click .wysiwyg-toolbar-icon': function ( event ) {
    console.log( 'click' );
    var $this = $( event.currentTarget );
    if( $this.hasClass( 'active' ) ){
      $this.removeClass( 'active' );
    }else {
      $this.addClass( 'active' );
    }
  }
});