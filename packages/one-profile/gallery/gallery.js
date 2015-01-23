/* globals Galleries: true, PicturesSchema: true */

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
