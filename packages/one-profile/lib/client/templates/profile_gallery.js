/* global 
    Galleries: false
*/

Template.profileGallery.helpers({
	galleries: function() {
		return Galleries.find({},{sort: {
			createdAt: -1
		}});
	},
	pictureCount: function() {
		return (this.pictures)?this.pictures.length:0;
	},
	isMyProfileEditable: function() {
    	return (Profile.isMyProfile());
  	}
});

Template.profileGallery.events({
	'click a[data-target="#picturesUploadModal"]': function(event) {
    if($(event.currentTarget).data("id")) {
      $("#select-gallery-dropdown option").each(function() {
        if ($(this).val() === $(event.currentTarget).data("id"))
          $(this).attr('selected','selected');
      });
    }
		$('.selectpicker').selectpicker('refresh');
	},
	'click .remove-gallery': function(event) {
		var $galleryId = $(event.currentTarget).data("id");

		if ($galleryId && $galleryId.length > 0) {
			Meteor.call('deleteGallery', $galleryId);
		}
	},
	'click .delete-photo': function(event) {
		event.stopPropagation();
    event.preventDefault();

		var $photoKey = $(event.currentTarget).data("id");


		if ($photoKey && $photoKey.length > 0) {
			FileTools.deleteStub(
        'deleteFilesFromS3',
        $photoKey,
        function (err) {
          if (err) {
            alert(err);
          } else {
            var $galleryId = $(event.currentTarget)
              .closest('.album')
              .find('.remove-gallery')
              .data("id");
            Meteor.call('deletePictureFromGallery', $photoKey, $galleryId);
          }
			  }
      );
		}
	},

  // Brings up mobile controls
  'click #profile-gallery-mobile-control': function () {
    // scroll to top - otherwise modal is off screen 
    var $transitioner = $( "#transitioner-1" );
    $transitioner.animate( { scrollTop: 50000 } );
    $( "#profile-screen" ).velocity( "fadeIn", { duration: 500 } );
    $( "#profile-gallery-mobile-controls" )
      .velocity( "slideDown", { duration: 500 } );
  }

});

Template.profileGallery.rendered = function () {
  var counter = 0;
  $('.swipebox').swipebox();

  $('#section-gallery').on('dragover', '.album', function (e) {
    e.stopPropagation();
    e.preventDefault();


    e.originalEvent.dataTransfer.dropEffect = 'copy';
  });

  $('#section-gallery').on('dragenter', '.album', function (e) {
  	e.stopPropagation();
    e.preventDefault();

    counter++;
    $(e.currentTarget).addClass('draggedOver');
  });

  $('#section-gallery').on('dragleave', '.album', function (e) {
  	e.stopPropagation();
    e.preventDefault();

    counter--;
    if(counter === 0)
    	$(e.currentTarget).removeClass('draggedOver');
  });

  $('#section-gallery').on('drop', '.album', function (e) {
    e.stopPropagation();
    e.preventDefault();

    $(e.currentTarget).removeClass('draggedOver');
    var $galleryId = $(this).attr("album-id");

    var onComplete = function(result) {
      var photoUrl = Meteor.settings.public.AWS_BUCKET_URL +
        '/' + result.filePath;
        Meteor.call('addPictureToGallery',result.filePath,
          photoUrl, $galleryId,
          function(error) {
          //removing the loading indicator
          $('.gallery-square[data-type="loader"]')[0].remove();
          if (error)
            return; // TODO: present an error to the user

        });
    };


    var onError = function(error) {
      console.log(error);
    };

    var files = e.originalEvent.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
    	var file = files[i];
    	//check if file is image
    	if (!file.type.match('image.*'))
    		continue;

    	$('.album[album-id="'+$galleryId+'"] .galleryHolder')
        .append('<div data-type="loader" ' +
        'class="gallery-square col-sm-2 half-gutter '+
        'm-bottom-10 center picture-loader">' +
        '<img src="/photo-load.gif" /></div>');

      var options = {
        onComplete: onComplete,
        onError: onError,
        filePath: Random.id()
      };

    	FileTools.upload('signProfilePictureUpload', file, options);

    }
  });
};
