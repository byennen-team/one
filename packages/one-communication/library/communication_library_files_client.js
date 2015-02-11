Template.libraryFiles.rendered = function(){
  $(".library-board-sleeve").mCustomScrollbar({
  	theme:"one-light",
  	scrollbarPosition: "inside"
  });
};

Template.libraryFiles.helpers({

  documents: function () {
    return Files.find();
  }

});
