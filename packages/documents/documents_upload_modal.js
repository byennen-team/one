
Template.documentsUploadModal.rendered = function(){
  $('.selectpicker').selectpicker();
};

Template.documentsUploadModal.events({
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
      '              <input class="file-upload upload hidden" type="file" >',
      '            </label>',
      '            <i class="fa fa-times-circle-o hidden"></i>',
      '           </div>'
      ].join('');
    // Check to see if a file has been uploaded
    if( contents.length > 0 ){
      // swap icon if there is a file
      $this.siblings( '.icon-addteam' ).removeClass( 'icon-addteam' ).addClass( 'fa-file-o' );
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
      $this.siblings( '.fa-file-o' ).removeClass( 'fa-file-o' ).addClass( 'icon-addteam' );
      // clear input if there is not a file
      $this.siblings( '.file-name' ).text("");
      // hide x
      $box.find( '.fa-times-circle-o' ).addClass( 'hidden' );
    }
    // Count number of fields with files
    var fileNum = $('.fa-file-o').length;
    var inputNum = $('.uploadCount').length;
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
    var freshBag = [
      '<div class="input-bgx">',
      '          <div class="input-box">',
      '            <label class="upload-input uploadCount">',
      '              <i class="fa icon-addteam"></i>',
      '              <span class="file-name"></span>',
      '              <input class="file-upload upload hidden" type="file" >',
      '            </label>',
      '            <i class="fa fa-times-circle-o hidden"></i>',
      '          </div>',
      '        </div>'
      ].join('');
    $( '.input-bag' ).replaceWith( freshBag );
  }


});