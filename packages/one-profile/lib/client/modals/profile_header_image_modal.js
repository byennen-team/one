Template.profileHeaderImageModal.events({

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
  'click #header-upload-image': function(){
    //Uploading the files
    $(".file-upload").each(function() {
      if($(this).prop('files')) {
        var $contents = $(this).prop('files');
        if ($contents && $contents.length > 0) {

          var onComplete = function(result) {
            var photoUrl = Meteor.settings.public.AWS_BUCKET_URL + '/' + result.filePath;
              Meteor.users.update(Meteor.userId(),{
                $push: {
                  'profile.coverUrl': {
                    photoUrl: photoUrl,
                    key: result.filePath
                  }
                }
              });
          };

          var onError = function(error) {
            console.log(error);
          };

          //check if file is image
          if (!$contents[0].type.match('image.*'))
            return;

          var options = {
            onComplete: onComplete,
            onError: onError,
            filePath: Random.id()
          };

          FileTools.upload('signProfilePictureUpload', $contents[0], options);
        }
      }
    });

  }

});

Template.profileHeaderImageModal.rendered = function() {
  $('#add-image').on('hidden.bs.modal', function() {
    getAFreshBag();
  });
};
