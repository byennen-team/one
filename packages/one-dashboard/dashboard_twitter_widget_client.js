/* global SocialStatuses: true */
Template.dashboardTwitterWidget.rendered = function () {
  Meteor.call('getLatestCompanyTweets',
    Meteor.settings.public.twitter.COMPANY_USERID);
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
  twitterScreenName: function() {
    return Meteor.settings.public.twitter.COMPANY_SCREENNAME;
  },
  tweets: function() {
    return SocialStatuses.find({
      userNetworkId: Meteor.settings.public.twitter.COMPANY_USERID
    });
  }
});

Template.tweetTemplate.helpers({
  media: function() {
    if(this.media)
      return this.media.slice(0,4);
  },
  mediaCount: function() {
    switch (this.media.slice(0,4).length) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
    }
  },
  date: function (dateToFormat) {
    return moment(dateToFormat).calendar();
  }
});