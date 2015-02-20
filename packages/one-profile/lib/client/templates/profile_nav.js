var navOffset = new ReactiveVar();

Template.profileNav.rendered = function () {
  // add/remove sticky class on navbar based on scroll position
  var $navTabs = $( '#profile-nav-tabs' );
  navOffset = $navTabs.offset().top - 60; // return height from page top
  $( '#transitioner-1' ).on( 'scroll', function() {         
    var scrollPosition = $( '#transitioner-1' ).scrollTop();
    if ( scrollPosition > navOffset ) { 
      $navTabs.addClass( 'sticky' );  
    }else {
      $navTabs.removeClass( 'sticky' );  
    }
  }); 
};

Template.profileNav.helpers({
  followingCount: function () {
    var user = Profile.currentUser();

    var following = Following.findOne({userId: user._id});
    var followingUserIds = following && following.followingUserIds;

    return followingUserIds &&
      Meteor.users.find({_id: {$in: followingUserIds}}).count();
  },
  followersCount: function () {
    var user = Profile.currentUser();

    var followers = Followers.findOne({userId: user._id});
    var followerUserIds = followers && followers.followerUserIds;

    return followerUserIds &&
      Meteor.users.find({_id: {$in: followerUserIds}}).count();
  }
});

Template.profileNav.events({

  // Scroll window to top when nav is clicked
  'click .tab': function () {
    var currentWidth = $( window ).width();
    if( currentWidth < 768 ){ // Only fire on mobile
      $( "#transitioner-1" ).animate( { scrollTop: navOffset + 1 } );
    }
  }

});
 