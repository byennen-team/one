Meteor.methods({
	createGallery: function (name) {
		check(name, String);

		if (!this.userId)
			throw new Meteor.Error(401,'You have to be logged in!');

		return Galleries.insert({
			galleryName: name,
			createdAt: new Date(),
			userId: Meteor.userId()
		}, function (error, result) {
			if (error)
				throw new Meteor.Error(500, 'Error in creating gallery');

			return (null, result);
		});
	},
	deleteGallery: function (galleryId) {
		check(galleryId, String);
		if (!this.userId)
			throw new Meteor.Error(401,'You have to be logged in!');

		//check gallery exists
		var gallery = Galleries.findOne(galleryId);
		if (!gallery)
			throw new Meteor.error(404,'Gallery not found');

		if (gallery.userId != this.userId)
			throw new Meteor.Error(403,'Not allowed to delete gallery!');

		//deleting all files from s3 first
		_.each(gallery.pictures, function(item) {
			FileTools.deleteStub('deleteFilesFromS3',item.pictureKey, function(err,result) {
				if (err) throw new Meteor.Error(500,'Error in deleting file from s3 bucket');
			});
		});

		Galleries.remove({_id: galleryId}, function(error, result) {
			if (error)
				throw new Meteor.Error(500, 'Error in deleting gallery');

			return(null, result);
		});

	},
	addPictureToGallery: function(key,url,galleryId) {
		check(key, String);
		check(url, String);
		check(galleryId, String);

		if (!this.userId)
			throw new Meteor.Error(401,'You have to be logged in!');

		//check gallery exists
		var gallery = Galleries.findOne(galleryId);
		if (!gallery)
			throw new Meteor.error(404,'Gallery not found');

		if (gallery.userId != this.userId)
			throw new Meteor.Error(403,'Not allowed to delete gallery!');

		var picture = {
			pictureUrl: url,
			pictureKey: key
		};

		Galleries.update(galleryId, {$push: {
			pictures: picture
		}}, function(error, result) {
			if (error)
				throw new Meteor.Error(500, 'Error inserting in db');

			return (null, result);
		});
	},
	deletePictureFromGallery: function(pictureKey, galleryId) {
		check(pictureKey, String);
		check(galleryId, String);

		if (!this.userId)
			throw new Meteor.Error(401,'You have to be logged in!');

		//check gallery exists
		var gallery = Galleries.findOne(galleryId);
		if (!gallery)
			throw new Meteor.error(404,'Gallery not found');

		if (gallery.userId != this.userId)
			throw new Meteor.Error(403,'Not allowed to delete from this gallery!');

		Galleries.update(galleryId, {$pull: {
			pictures: {
				pictureKey: pictureKey
			}
		}}, function(error, result) {
			if (error)
				throw new Meteor.Error(500, 'Error deleting from db');

			return (null, result);
		});
	}
});

Meteor.publish('galleries', function(userId) {
	check(userId, String);

	return Galleries.find({userId: userId});
});