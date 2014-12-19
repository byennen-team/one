var scrollTo = function( target, trigger ){
  trigger.on( 'click', function(){
    if (target.length) {
      var top = target.offset().top;
      $('html,body').animate({scrollTop: top}, 800);
      return false;
    }
  });
}

Template.profileHeader.rendered = function () {
  $('body').addClass('public-profile');

  // Scroll to on click ------------------
  scrollTo($('#about'), $('.nav-about'));
  scrollTo($('#listings'), $('.nav-properties') );
  scrollTo($('#contact'), $('.nav-contact') );
  scrollTo($('#contact'), $('#send-message-btn'));
}
