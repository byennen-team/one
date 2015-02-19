Template.profileGalleryMobileControls.events({

  // Closes mobile gallery controls modal
  'click #profile-gallery-mobile-cancel': function () {
    $( "#profile-gallery-mobile-controls" )
      .velocity( "slideUp", { duration: 500 } );
    $( "#profile-screen" ).velocity( "fadeOut", { duration: 500 } );
  }
});