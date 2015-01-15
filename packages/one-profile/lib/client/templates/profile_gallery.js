Template.profileGallery.helpers({
	galleries: function() {
		return Galleries.find({},{sort: {
			createdAt: -1
		}});
	},
	date: function(date) {
		if (moment(date).diff(moment(new Date), 'days') >= 1) {
			return moment(date).format('MMM D, YYYY');
		} else {
			return moment(date).fromNow();
		}
	
	},
	pictureCount: function() {
		return (this.pictures)?this.pictures.length:0;
	},
	isMyProfileEditable: function() {
    	return (Profile.isMyProfile());
  	}
});

Template.profileGallery.events({
	'click .remove-gallery': function(event) {
		$galleryId = $(event.currentTarget).data("id");

		if ($galleryId && $galleryId.length > 0) {
			Meteor.call('deleteGallery', $galleryId);
		} else {
			//TODO: throw an error
		}
	},
	'click .delete-photo': function(event) {
		$photoKey = $(event.currentTarget).data("id");

		if ($photoKey && $photoKey.length > 0) {
			FileTools.deleteStub('deleteFilesFromS3',$photoKey, function(err,result) {
				if (err) {
					alert(err);
				} else {
					$galleryId = $(event.currentTarget).closest('.album').find('.remove-gallery').data("id");
					Meteor.call('deletePictureFromGallery', $photoKey, $galleryId);
				}
			});
		} else {
			//TODO: throw an error
		}
	}
})