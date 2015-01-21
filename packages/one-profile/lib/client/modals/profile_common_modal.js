getAFreshBag = function() {
  var freshBag = [
            '<div class="input-bag">',
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
        };