
Template.profileHeaderImageModal.events({
  'change .image-upload': function (event) {
  	// get string of file path (fake)
    var $this = $(event.target);
		var contents = $this.val();
		var formGroup = $this.closest('.form-group');
		// check if there's actually a file, if so, change the color		
		if( contents.length > 0 ){
			// swap icon if there is a file
			$this.siblings( '.icon-addteam' ).removeClass( 'icon-addteam' ).addClass( 'fa-camera-retro' );
			// toggle close button
			formGroup.find( '.fa-times-circle-o' ).removeClass( 'hidden' );
			// Retrieve file name & display it
			var ary = contents.split("\\");
			var x = ary.length;
			var fileName = ary[x-1];
			$this.siblings( '.file-name' ).text(fileName);
		} else{
			// swap icon if there isn't a file
			$this.siblings( '.fa-camera-retro' ).removeClass( 'fa-camera-retro' ).addClass( 'icon-addteam' );
			// clear input if there is not a file
			$this.siblings( '.file-name' ).text("");
			// hide x
			formGroup.find( '.fa-times-circle-o' ).addClass( 'hidden' );
		}
  },

  'click .fa-times-circle-o': function () {
   	var $this = $(event.target);
   	var formGroup = $this.closest('.form-group');
  	// clear input
  	formGroup.find( '.image-upload' ).val('');
  	// Clear input text
  	formGroup.find( '.file-name' ).text("");
  	// Swap icon
  	formGroup.find( '.fa-camera-retro' ).removeClass( 'fa-camera-retro' ).addClass( 'icon-addteam' );
  	// hide X
  	$this.addClass( 'hidden' );
  }

});