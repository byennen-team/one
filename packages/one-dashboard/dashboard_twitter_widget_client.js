Template.dashboardTwitterWidget.rendered = function () {
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  var sleeve = $( ".feed" );
  sleeve.mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside",
      autoHideScrollbar: true
  });
  // Delay gives the plugin a change to load fully 
  setTimeout(function(){
    sleeve.mCustomScrollbar( "scrollTo", "bottom" );
  }, 200);
};

Template.dashboardTwitterWidget.helpers({

// TODO: Return Tweet Author's avatar url. String. At least 69x69px
  avatarURL: function () {
    return 'images/dashboard/twitter-1.jpg';
  },

// TODO: Return Tweet Author's handle. String.
  handle: function () {
    return '@DouglasElliman';
  },

//TODO: Return true if the tweet has been retweeted, false if it hasn't 
  retweeted: function () {
    return false;
    // return true; 
  },

// TODO: Return Tweet's timestamp. String.
  tweetTime: function () {
    return '13h';
  },

// TODO: Return Message's text. Full HTML. 
  tweetText: function () {
/* jshint ignore:start */
    return 'The Holmes Team of Douglas Elliman Real Estate 58 Turner Drive Chappaqua NY: <a href="http://youtu.be/UZ2FEiC3LOg?a" target="_blank"> http://youtu.be/UZ2FEiC3LOg?a</a> via <a href="http://twitter.com/youtube" target="_blank">@YouTube</a>';
/* jshint ignore:end */
  },

// TODO: Returns true if the tweet has an image, false if it does not.
  image: function () {
    return false;
    // return true;
  },

// TODO: Returns image's URL. String.
  imageURL: function () {
    return 'images/dashboard/twitter-pic.jpg';
  },

// TODO: Returns URL for tweet reply. String.
// (not sure how to do this - twitter uses a modal. Maybe just go to the tweet?)
  replyURL: function () {
    return 'https://twitter.com/DouglasElliman/status/560174040066056193';
  },

// TODO: Returns URL for retweet. String.
// (not sure how to do this - twitter uses a modal. Maybe just go to the tweet?)
  retweetURL: function () {
    return 'https://twitter.com/DouglasElliman/status/560174040066056193';
  },

// TODO: Returns number of retweets.
  retweets: function () {
    return 5;
  },

// TODO: Returns URL for favoriting tweet. String.
// (not sure how to do this - twitter uses a modal. Maybe just go to the tweet?)
  favoriteURL: function () {
    return 'https://twitter.com/DouglasElliman/status/560174040066056193';
  },

// TODO: Returns number of retweets.
  favorites: function () {
    return 14;
  }

});