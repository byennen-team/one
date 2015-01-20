var goScroll = function(target, trigger){
  trigger.on( 'click', function(){
    if (target.length) {
      $("html").velocity("scroll", {
        offset: target.offset().top,
        duration: 800,
        easing: "easeInSine",
        mobileHA: false
      });
      return false;
    }
  });
};

Template.profileHeader.rendered = function () {
  $('body').addClass('public-profile');

  $(document).ready(function($) {
    goScroll($('#section-about'), $('.nav-about'));
    goScroll($('#listings'), $('.nav-properties'));
    goScroll($('#contact'), $('.nav-contact'));
    goScroll($('#contact'), $('#send-message-btn'));
  });
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
