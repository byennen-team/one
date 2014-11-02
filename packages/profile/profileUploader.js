Template.profileUploader.events({
  "click button.upload": function(){
    var files = $("input.file_bag")[0].files
    S3.upload(files,"/profile-images/",function(e,r){
      console.log(r.url);
      // TODO: resize image
      Meteor.users.update({_id: Meteor.userId()},{$set:{profile: {photoUrl: r.url}}})
    });
  }
});

Template.profileUploader.helpers({
  "files": function(){
    return S3.collection.find();
  }
});
