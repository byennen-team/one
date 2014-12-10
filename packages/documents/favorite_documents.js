Template.favoriteDocuments.helpers({
  favorites: function () {
    var user = Meteor.user();
    if (!user || !user.favoriteDocumentIds) return [];

    return Files.find({_id: {$in: user.favoriteDocumentIds}});
  },
  date: function (file) {
    return moment(file.uploadDate).format('MMM D, YYYY');
  }
});
