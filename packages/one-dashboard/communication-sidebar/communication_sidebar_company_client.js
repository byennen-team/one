Template.communicationSidebarCompany.rendered = function(){

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Repeated to play nice with plugin
  $(".communication-sidebar-sleeve").mCustomScrollbar({
	  	theme:"one-light",
	  	scrollbarPosition: "inside"
  });

};

Template.communicationSidebarCompanyFill.helpers({
  companyRooms: function() {
    return Rooms.find({
      roomType: 'company'
    });
  },
  officeRooms: function() {
    return Rooms.find({
      roomType: 'office',
      officeNo: Meteor.user().profile.officeId
    });
  },
  officeName: function() {
    //placeholder until we get the real office names
    var officeNames = [
      '233 Opera Road',
      '122 Kansas City',
      '321 Road Street',
      '143 Blocked Road',
      '45 Hempshey St.',
      '33 Office Road',
      '99 NY',
      '18 Venice St.',
      '575 Madisson'
    ];
    var index = Meteor.user().profile.officeId;
    if (index > 9)
      index = 9;

    return officeNames[index - 1];
  },
  // unreadMessages: function() {
  //   var roomCount = RoomsController.getUnreadMessagesCount(this._id);
  //   return (roomCount > 0) ? roomCount : false;
  // }
});
