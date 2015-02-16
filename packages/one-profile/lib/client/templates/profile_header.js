
Template.profileHeader.rendered = function () {
  $('body').addClass('public-profile');
};

Template.profileHeader.helpers({
  coverImages: function() {
    var covers = Profile.currentUser().profile.coverUrl;
    if (covers && covers.length  > 0) {
      var modifiedCovers = [];
      _.each(covers, function(item, index) {
        modifiedCovers.push({
          index: index,
          url: item.photoUrl,
          key: item.key
        });
      });
      return modifiedCovers;
    } else {
      //TODO: remove these placeholders maybe?
      return [
        {index: 0, url: '../../images/profile/slide1-sm.jpg'},
        {index: 1, url: '../../images/profile/slide2-sm.jpg'},
        {index: 2, url: '../../images/profile/slide3-sm.jpg'}
      ];
    }
  },
  isFirstCover: function() {
    return (this.index === 0)?'active':'';
  }
});

Template.profileHeader.events({
  'click .nav-about': function () {
    var scrollTarget = $( "#section-about" ).offset();
    $( "#transitioner-1" ).animate( { scrollTop: scrollTarget.top } );
  },

  'click .nav-properties': function () {
    var scrollTarget = $( "#listings" ).offset();
    $( "#transitioner-1" ).animate( { scrollTop: scrollTarget.top } );
  },

  'click .nav-contact, click #send-message-btn': function () {
    var scrollTarget = $( "#contact" ).offset();
    $( "#transitioner-1" ).animate( { scrollTop: scrollTarget.top } );
  }

});








