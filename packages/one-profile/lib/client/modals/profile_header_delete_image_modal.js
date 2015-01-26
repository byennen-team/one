Template.profileHeaderDeleteImageModal.events({
	'click #header-delete-image': function () {
		//getting the image's key (if set)
		var key = $('.carousel-indicators li.active').data('key');
		if (key && key.length > 0) {
			FileTools.deleteStub('deleteFilesFromS3',key, function (err) {
				if (err) {
					alert(err);
				} else {
					Meteor.users.update(Meteor.userId(),{
						$pull: {
							'profile.coverUrl': {key:key}
						}
					}, function(e) {
						if (e)
							console.log(e);
						else {
							$('.carousel-indicators li').first().addClass('active');
							$('.carousel-inner .item').first().addClass('active');
						}
					});
				}
			});
		} else {
			alert("This is the default image, and it cannot be deleted");
		}
	}
});
