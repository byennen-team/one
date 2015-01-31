Template.communicationAddTeammemberModal.created = function () {
  var self = this;
  this.searchText = new ReactiveVar();
  this.searchText.set({
    text: '',
    limit: 5
  });
  this.teamMembers = new ReactiveVar([]);

  if(Session.get('teamModalPurpose') === 'editTeam') {
    var room = Rooms.findOne('openRoomId');
    var members = _.pluck(room.participants, 'participantId');
    this.teamMembers.set(members);
  }

  Tracker.autorun(function () {
    return Meteor.subscribe('searchResults', self.searchText.get());
  });

  Tracker.autorun(function () {
    return Meteor.subscribe('userProfiles', self.teamMembers.get());
  });
};

Template.communicationAddTeammemberModal.helpers({
  people: function() {
    return Search.cursor(Template.instance().searchText.get());
  },
  teamMembers: function() {
    return Meteor.users.find({
      _id: {
        $in: Template.instance().teamMembers.get()
      }
    });
  },
  teamMembersArray: function() {
    return Template.instance().teamMembers.get();
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
    if ($(event.currentTarget).prop('checked') === true) {
      var currentMembers = Template.instance().teamMembers.get();
      currentMembers.push($(event.currentTarget).val());
      Template.instance().teamMembers.set(currentMembers);
    } else {
      var currentMembers = Template.instance().teamMembers.get();
      var parsedMembers = _.reject(currentMembers, function(item) {
        return (item === $(event.currentTarget).val());
      });
      Template.instance().teamMembers.set(parsedMembers);
    }
  }
});

Template.teamMember.helpers({
  isChecked: function(userIdArray) {
    var user = this;
    var isInChannel = _.find(userIdArray,
      function(item) {
        return (item === user._id)
      });

    if(isInChannel)
      return 'checked';
  }
});