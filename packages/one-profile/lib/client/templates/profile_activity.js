/* globals SocialStatuses: true */

Template.profileActivity.events({
  'change #activity-image-upload': function (event) {
  	// get string of file path (fake)
    var $this = $(event.target);
		var contents = $this.val();
		// check if there's actually a file, if so, change the color
		if( contents.length > 0 ){
			// swap icon if there is a file
			$this.siblings( '.fa' ).removeClass( 'grey' ).addClass( 'accent' );
		} else{
			// swap icon if there isn't a file
			$this
        .siblings( '.fa-camera-retro' )
        .removeClass( 'accent' )
        .addClass( 'grey' );
		}

		// Lance - need your help here.
		// Usual methods for manipulating url from file input aren't working.
		// I imagine we can get it from miniMongo?
   	// Something like this should work:
   	// var url = path to uploaded image
   	// $( '#activity-thumb' )
   	//   .attr( 'style', "background-image: url(" + url+ ")" );

    $( '#activity-thumb' ).removeClass( 'hidden' );
    $( '#activity-textarea' ).removeClass( 'width-100' ).addClass( 'width-80' );

  },

  'click #x-box': function () {

    $( "#activity-image-upload" ).val('');

    // manually change color (change event won't be triggered)
  	$( '#activity-image-upload' )
      .siblings( 'label.fa' )
      .removeClass( 'accent' )
      .addClass( 'grey' );

	  $( '#activity-thumb' ).addClass( 'hidden' );
    $( '#activity-textarea' ).removeClass( 'width-80' )
      .addClass( 'width-100' );
	}

});
Template.profileActivity.helpers({
  hasSocialMedia: function () {
    var user = Profile.currentUser();
    return (user && user.services) &&
      (user.services.twitter || user.services.facebook) ? true : false;
  }
});
Template.socialMediaTemplate.rendered = function() {
  var user = Profile.currentUser();

  if (user && user.services && user.services.twitter)
    Meteor.call('getLatestTweets', user._id);
};
Template.socialMediaTemplate.helpers({
  socialStatuses: function() {
    return SocialStatuses.find({},{
      sort: {
            datePosted: -1
          }
    });
  },
  hasTwitter: function() {
    var user = Profile.currentUser();
    return (user && user.services && user.services.twitter) ? true : false;
  },
  hasFacebook: function() {
    var user = Profile.currentUser();
    return (user && user.services && user.services.facebook) ? true : false;
  },
  services: function() {
    var user = Profile.currentUser();
    return (user && user.services && user.services) ? user.services : false;
  }
});
Template.socialMediaTemplate.events({
  'submit form.comment-box': function(e) {
    e.preventDefault();
    var value = $('input.tweeter').val();

    if (! value || value === '')
      return false;

    Meteor.call('postTweet', value, function(e) {
      if (e)
        console.log(e);


      $('input.tweeter').val('');
    });
  }
});
