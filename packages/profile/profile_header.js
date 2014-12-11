var scrollTo = function( target, trigger ){
  trigger.on( 'click', function(){
    if (target.length)
      {
        var top = target.offset().top;
        console.log(top);
        console.log(trigger);
        // $('html,body').animate({scrollTop: top}, 0800);
        return false;
      }
    });
  }

Template.profileHeader.rendered = function () {
  // Sets height and width variables
  var currentWidth = $(window).width();
  var currentHeight = $(window).height();
  currentWidth = Math.round(currentWidth);
  currentHeight = Math.round(currentHeight);

  // ----------  Responsive images Jumbotron  -----------------
  if( currentWidth > 768 && currentWidth <= 1200 ){
    $( '.slide' ).each( function(){
      var $this = $(this);
      var url = $this.data( 'med' );
      $this.attr( 'src', url );
    });
  }else if( currentWidth > 1200 ){
    $( '.slide' ).each( function(){
      var $this = $(this);
      var url = $this.data( 'lg' );
      $this.attr( 'src', url );
    });
  }

  // Scroll to on click ------------------
  scrollTo( $('#about'), $('.nav-about') );
  scrollTo( $('#listings'), $('.nav-properties') );
  scrollTo( $('#contact'), $('.nav-contact') );
  scrollTo( $('#contact'), $('#send-message-btn') );
}
