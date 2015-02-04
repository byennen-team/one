/* globals RoomsController: true */
Template.communicationAddTeammemberModal.created = function () {
  var self = this;
  this.searchText = new ReactiveVar();
  this.searchText.set({
    text: '',
    limit: 3
  });
  Session.set("teamMembers",[]);

  Tracker.autorun(function () {
    return Meteor.subscribe('searchResults', self.searchText.get());
  });
};

Template.communicationAddTeammemberModal.helpers({
  people: function() {
    return Search.cursor(Template.instance().searchText.get());
  },
  teamMembers: function() {
    return Meteor.users.find({
      _id: {
        $in: Session.get("teamMembers")
      }
    });
  },
  isNewRoom: function() {
    return (Session.get('teamModalPurpose') === 'newTeam');
  }
});

Template.communicationAddTeammemberModal.events({
  'keyup #modalAddMembersSearchInput': function(event, template) {
    event.preventDefault();
    if( $('#modalAddMembersSearchInput').val().length > 2 ) {
      var currentLimit = template.searchText.get().limit;
      template.searchText.set({
        text: $('#modalAddMembersSearchInput').val(),
        limit: currentLimit
      });
    }
  },
  'click .load-more': function(event, template) {
    event.preventDefault();

    var currentLimit = template.searchText.get().limit;
    var currentText = template.searchText.get().text;
      template.searchText.set({
        text: currentText,
        limit: currentLimit + 5
      });
  },
  'click input.userid-checkbox': function(event) {
    var currentMembers;
    if ($(event.currentTarget).prop('checked') === true) {
      currentMembers = Session.get("teamMembers");
      currentMembers.push($(event.currentTarget).val());
      Session.set("teamMembers", currentMembers);
    } else {
      currentMembers = Session.get("teamMembers");
      var parsedMembers = _.reject(currentMembers, function(item) {
        return (item === $(event.currentTarget).val());
      });
      Session.set("teamMembers", parsedMembers);
    }
  },
  'click #add-team-members': function() {
    var newRoomMembers = Session.get("teamMembers");
    //adding current user to the room
    var currentUserExists = _.find(newRoomMembers,function(item){
      return item === Meteor.userId();
    });
    if(! currentUserExists)
      newRoomMembers.push(Meteor.userId());

    var roomName = $('input#new-room-name').val();

    if((! roomName || roomName.length === 0) &&
      Session.get('teamModalPurpose') === 'newTeam')
      return;

    var participants = [];

    _.each(newRoomMembers, function(item) {
      participants.push({
        participantId: item,
        dateJoined: new Date()
      });
    });

    if(Session.get('teamModalPurpose') === 'newTeam') {
      RoomsController.createRoom(participants, 'room', roomName);
    } else {
      RoomsController.adjustParticipantsInRoom(
        Session.get('openRoomId'), newRoomMembers
        );
    }

    Session.set("teamMembers",[]);
    $('input#new-room-name').val("");
    $('input#modalAddMembersSearchInput').val("");
    Template.instance().searchText.set({
      text: '',
      limit: 3
    });

    //trick to rerun subscription
    var currentRoomId = Session.get('openRoomId');
    Session.set('openRoomId', null);
    Session.set('openRoomId', currentRoomId);

    $("#communication-add-teammember-modal").hide();

  },
  'click #cancel-team-members': function() {
    Session.set("teamMembers",[]);
    $('input#new-room-name').val("");
    $('input#modalAddMembersSearchInput').val("");
    Template.instance().searchText.set({
      text: '',
      limit: 3
    });
  }
});

Template.teamMember.helpers({
  isChecked: function() {
    var user = this;
    var isInChannel = _.find(Session.get("teamMembers"),
      function(item) {
        return (item === user._id);
      });

    if(isInChannel)
      return 'checked';
  }
});

Template.teamMember.events({
  // adds class on mousenter if checkbox is checked
  'mouseenter .checkbox': function ( event ) {
    var $this = $( event.currentTarget );
    var $input = $this.find( '.userid-checkbox' );
    if( $input.is( ":checked" ) ){
      $this.addClass( 'hovered' );
    }
  },
  // removes class on mouseleave
  'mouseleave .checkbox': function ( event ) {
    var $this = $( event.currentTarget );
    $this.removeClass( 'hovered' );
  }
});