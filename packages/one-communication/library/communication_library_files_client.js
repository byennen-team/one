Template.libraryFiles.rendered = function(){
  $(".library-files-sleeve").mCustomScrollbar({
  	theme:"one-light",
  	scrollbarPosition: "inside"
  });
};

Template.libraryFiles.helpers({

  documents: function () {
    return Files.find();
  }

});
