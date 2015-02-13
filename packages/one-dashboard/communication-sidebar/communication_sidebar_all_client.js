Template.communicationSidebarAll.rendered = function(){

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Repeated to play nice with plugin
  $(".communication-sidebar-sleeve").mCustomScrollbar({
	  	theme:"one-light",
	  	scrollbarPosition: "inside"
  });

};

Template.communicationSidebarAll.helpers({
// TODO: if the user has any drafts return true, else return false.
  haveDrafts: function () {
    return true;
  }
});