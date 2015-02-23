Template.profileScreen.events({ 

  // Dismiss mobile controls
  'click #profile-screen': function () {
    $( "#profile-gallery-mobile-controls" )
      .velocity( "slideUp", { duration: 500 } );
    $( "#profile-screen" ).velocity( "fadeOut", { duration: 500 } );
  }
});