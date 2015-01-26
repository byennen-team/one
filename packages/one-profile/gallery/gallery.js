/* globals Galleries: true, PicturesSchema: true, Gallery: true */

Galleries = new Meteor.Collection('galleries');


PicturesSchema = new SimpleSchema({
	pictureUrl: {type: String, regEx: SimpleSchema.RegEx.Url},
	pictureKey: {type: String}
});

Galleries.schema = new SimpleSchema({
  galleryName: {type:String},
  createdAt: {type:Date},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  pictures: {type: [PicturesSchema], optional: true}
});

Gallery = {};

Gallery.getAFreshBag = function() {
  var freshBag = [
            '<div class="input-bag">',
            '          <div class="input-box">',
            '            <label class="upload-input uploadCount">',
            '              <i class="fa icon-addteam"></i>',
            '              <span class="file-name"></span>',
            '              <input class="file-upload upload hidden" '+
            'type="file" accept="image/*" >',
            '            </label>',
            '            <i class="fa fa-times-circle-o hidden"></i>',
            '          </div>',
            '        </div>'
            ].join('');
          $( '.input-bag' ).replaceWith( freshBag );
        };