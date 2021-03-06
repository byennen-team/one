Template.communicationDirectoryModal.created = function () {
  var self = this;
  this.searchText = new ReactiveVar();
  this.searchText.set({
    text: '',
    limit: 5
  });

  Tracker.autorun(function () {
    return Meteor.subscribe('searchResults', self.searchText.get());
  });
};

Template.communicationDirectoryModal.helpers({
  people: function() {
    return Search.cursor(Template.instance().searchText.get());
  }
});

Template.communicationDirectoryModal.events({
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
  },
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

Template.person.helpers({
  isChecked: function(user) {
    var isInFavs = Meteor.users.findOne({
      $and: [{
              _id: Meteor.userId()
            },
            {
              teamMembers: user._id
            }]
    });

    if(isInFavs)
      return 'checked';
  }
});