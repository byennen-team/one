Template.documentUploader.events({
  "click button.upload": function(){
    var files = $("input.file_bag")[0].files
    // TODO: add company name to directory?
    S3.upload(files,"/documents/",function(e,r){
      console.log(r.url);
      // TODO: save document
    });
  }
});

Template.profileUploader.helpers({
  "files": function(){
    return S3.collection.find();
  }
});
