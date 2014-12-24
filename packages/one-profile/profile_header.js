var goScroll = function(target, trigger){
  trigger.on( 'click', function(){
    if (target.length) {
      $("html").velocity("scroll", {offset: target.offset().top, duration: 800, easing: "easeInSine", mobileHA: false });
      return false;
    }
  });
}

Template.profileHeader.rendered = function () {
  $('body').addClass('public-profile');

  $(document).ready(function($) {
    goScroll($('#section-about'), $('.nav-about'));
    goScroll($('#listings'), $('.nav-properties'));
    goScroll($('#contact'), $('.nav-contact'));
    goScroll($('#contact'), $('#send-message-btn'));
  });
}
