Template.addGalleryModal.events({
	'click #createGallery': function () {
		var $name = $('#galleryNameField');

		if ($name.val() && $name.val().length >0) {


			//TODO: call a server function to add a gallery
			Meteor.call('createGallery', $name.val(), function (error) {
				if (error) {
					//TODO: show error
					console.error(error);
				} else {
					$name.val('');
					$('#addGaleryModal').modal('hide');
				}
			});

		}
    //TODO: show error you have to enter a name?
	},

	'click #cancelCreateGallery': function () {
		$('#galleryNameField').val('');
	}
});

Template.addGalleryModal.rendered = function() {
	$('#addGaleryModal').on('shown.bs.modal', function() {
		$('#galleryNameField').focus();
	});
};
