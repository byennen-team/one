Template.picturesUploadModal.rendered = function(){
  $('.selectpicker').selectpicker();
};

Template.picturesUploadModal.helpers({
  galleries: function() {
    return Galleries.find({userId: Meteor.userId()}, {sort: {
      createdAt: -1
    }});
  }
});

Template.picturesUploadModal.events({
  'change .file-upload': function (event) {
    // get string of file path (fake)
    var $this = $(event.target);
    var $label = $this.closest('.upload-input');
    var $box = $this.closest('.input-box');
    var $bag = $this.closest('.input-bag');
    var contents = $this.val();
    var formHTML = [
      '<div class="input-box">',
      '            <label class="upload-input uploadCount">',
      '              <i class="fa icon-addteam"></i>',
      '              <span class="file-name"></span>',
      '              <input class="file-upload upload hidden" type="file" accept="image/*" >',
      '            </label>',
      '            <i class="fa fa-times-circle-o hidden"></i>',
      '           </div>'
      ].join('');
    // Check to see if a file has been uploaded
    if( contents.length > 0 ){
      // swap icon if there is a file
      $this.siblings( '.icon-addteam' ).removeClass( 'icon-addteam' ).addClass( 'fa-camera-retro' );
      // toggle close button
      $label.next( '.fa-times-circle-o' ).removeClass( 'hidden' );
      // Retrieve file name & display it
      var ary = contents.split("\\");
      var x = ary.length;
      var fileName = ary[x-1];
      $this.siblings( '.file-name' ).text(fileName);
    }
    else{
      // swap icon if there isn't a file
      $this.siblings( '.fa-camera-retro' ).removeClass( 'fa-camera-retro' ).addClass( 'icon-addteam' );
      // clear input if there is not a file
      $this.siblings( '.file-name' ).text("");
      // hide x
      $box.find( '.fa-times-circle-o' ).addClass( 'hidden' );
    }
    // Count number of fields with files
    var fileNum = $bag.find('.fa-camera-retro').length;
    var inputNum = $bag.find( '.uploadCount' ).length;
    if( fileNum == inputNum){
      // append a new input-box
      $bag.append(formHTML);
      $bag.find('.input-box:last').hide().slideDown(1000);
    }
  },

  'click .fa-times-circle-o': function (event) {
    var $this = $(event.target);
    var doomed = $this.closest('.input-box');
    doomed.slideUp( "fast", function() {
      doomed.remove();
    });
  },

  'click .upload-modal-btn': function(){
    //Uploading the files

    $(".file-upload").each(function() {
      if($(this).prop('files')) {
        var $contents = $(this).prop('files');
        if ($contents && $contents.length > 0) {
          //we have a file, let's add a loading indicator
          var $galleryId = $("#select-gallery-dropdown").val();

           var onComplete = function(result) {
              var photoUrl = Meteor.settings.public.AWS_BUCKET_URL + '/' + result.filePath;
                Meteor.call('addPictureToGallery',result.filePath, photoUrl, $galleryId,
                  function(error, result) {
                  //removing the loading indicator
                  $('.gallery-square[data-type="loader"]')[0].remove();
                  if (error)
                    return; // TODO: present an error to the user

                });
            };

            var onError = function(error) {
              console.log(error);
            };

          $('.album[album-id="'+$galleryId+'"] .galleryHolder').append('<div data-type="loader" class="gallery-square col-sm-2 half-gutter m-bottom-10 center picture-loader"><img src="/photo-load.gif" /></div>');
          var options = {
            onComplete: onComplete,
            onError: onError,
            filePath: Random.id()
          };

          FileTools.upload('signProfilePictureUpload', $contents[0], options);
        }
      }
    });

    var freshBag = [
      '<div class="input-bgx">',
      '          <div class="input-box">',
      '            <label class="upload-input uploadCount">',
      '              <i class="fa icon-addteam"></i>',
      '              <span class="file-name"></span>',
      '              <input class="file-upload upload hidden" type="file" accept="image/*" >',
      '            </label>',
      '            <i class="fa fa-times-circle-o hidden"></i>',
      '          </div>',
      '        </div>'
      ].join('');
    $( '.input-bag' ).replaceWith( freshBag );
  }


});