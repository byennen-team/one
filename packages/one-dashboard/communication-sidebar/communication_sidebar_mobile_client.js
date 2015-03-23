Template.communicationMobileSidebar.rendered = function () {

  $( "#communication-mobile-sidebar-sleeve" ).mCustomScrollbar({
    theme:"one-dark",
    scrollbarPosition: "inside"
  });
};

Template.communicationMobileSidebar.helpers({
  isLoggedIn: function() {
    if (Meteor.userId())
      return true;
    else
      return false;
  }
});

Template.communicationMobileSidebar.events({

  'click .back, click .logo': function () {
    $( "#communication-mobile-sidebar" )
      .velocity( "fadeOut", { duration: 350 } );
    // un-lock scroll position
    var body = $('body');
    if( body.data('scroll-position') ){
      var scrollPosition = body.data('scroll-position');
      body.css('overflow', body.data('previous-overflow'));
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
    }
  } 

});