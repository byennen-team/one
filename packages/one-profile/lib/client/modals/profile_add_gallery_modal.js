Template.addGalleryModal.events({
	'click #createGallery': function(event) {
		var $name = $('#galleryNameField');

		if ($name.val() && $name.val().length >0) {


			//TODO: call a server function to add a gallery
			Meteor.call('createGallery', $name.val(), function(error, response) {
				if (error) {
					//TODO: show error
					console.error(error); 
				} else {
					$name.val('');
					$('#addGaleryModal').modal('hide');
				}
			});

		} else {
			//TODO: show error you have to enter a name? 
		}
	},

	'click #cancelCreateGallery': function(event) {
		$('#galleryNameField').val('');
	}
});

Template.addGalleryModal.rendered = function() {
	$('#addGaleryModal').on('shown.bs.modal', function() {
		$('#galleryNameField').focus();
	});
};