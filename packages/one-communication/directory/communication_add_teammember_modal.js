Template.communicationAddTeammemberModal.created = function () {
  var self = this;
  this.searchText = new ReactiveVar();
  this.searchText.set({
    text: '',
    limit: 5
  });
  this.teamMembers = new ReactiveVar([]);

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
  }
});

Template.communicationAddTeammemberModal.events({
  'keyup #modalDirectorySearchInput': function(event, template) {
    event.preventDefault();
    if( $('#modalDirectorySearchInput').val().length > 2 ) {
      var currentLimit = template.searchText.get().limit;
      template.searchText.set({
        text: $('#modalDirectorySearchInput').val(),
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
    if ($(event.currentTarget).prop('checked') === true)
      Meteor.call('addTeamMember',$(event.currentTarget).val());
    else
      Meteor.call('removeTeamMember',$(event.currentTarget).val());
  }
});

Template.teamMember.helpers({
  isChecked: function(user) {
    var isInChannel = Meteor.users.findOne({
      $and: [{
              _id: Meteor.userId()
            },
            {
              teamMembers: user._id
            }]
    });

    if(isInChannel)
      return 'checked';
  }
});