Template.profileGallery.helpers({
	galleries: function() {
		return Galleries.find({},{sort: {
			createdAt: -1
		}});
	},
	date: function(date) {
		if (moment(date).diff(moment(new Date()), 'days') >= 1) {
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
		event.stopPropagation();
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
	},
	'click .pswipe-picture': function(event) {
		//getting current url to set index
		$url = $(event.currentTarget).data("url");
		//building the slides array
		var slides =[];
		var openIndex = 0;
		var $elements = $(event.currentTarget).closest('.album').find('.full-bg-img');
		_.each($elements,function(item,index) {

			//getting image so that we can get original dimensions, 
			//should not use bandwith as images are already loaded

			var image = new Image();
			image.src = $(item).data('url');

			slides.push({
				src: $(item).data('url'),
				w: image.naturalWidth,
				h: image.naturalHeight
			});

			if ($(item).data('url') === $url)
				openIndex = index;
		});

		var options = {
			index: openIndex
		};

		var gallery = new PhotoSwipe( $('.pswp')[0], PhotoSwipeUI_Default, slides, options);
		gallery.init();
	}
});

Template.profileGallery.rendered = function () {
  $('.album').on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();


    e.originalEvent.dataTransfer.dropEffect = 'copy';
  });

  $('.album').on('dragenter', function (e) {
    $(this).addClass('draggedOver');
  });

  $('.album').on('dragleave', function (e) {
    $(this).removeClass('draggedOver');
  });

  $('.album').on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).removeClass('draggedOver');
    var $galleryId = $(this).attr("album-id");

    //this function is necessary to pass jslint tests :(

    var callbackFunction = function (error, result) {
            if (error) throw new Meteor.Error(500, 'Error in uploading file'); // TODO error message

            var photoUrl = Meteor.settings.public.AWS_BUCKET_URL + '/' + result.filePath;
            Meteor.call('addPictureToGallery',result.filePath, photoUrl, $galleryId, function(error, result) {
              //removing the loading indicator
              $('.gallery-square[data-type="loader"]')[0].remove();
              if (error)
                return; // TODO: present an error to the user

            });
          };


    var files = e.originalEvent.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
    	file = files[i];
    	//check if file is image
    	if (!file.type.match('image.*'))
    		continue;

    	$('.album[album-id="'+$galleryId+'"] .row').append('<div data-type="loader" class="gallery-square col-sm-2 half-gutter m-bottom-10 pointer"><div class="full-bg-img" style="background-image: url(/photo-load.gif);"></div></div>');
    	FileTools.temporaryUpload('signProfilePictureUpload', file, callbackFunction);
    }
  });
};