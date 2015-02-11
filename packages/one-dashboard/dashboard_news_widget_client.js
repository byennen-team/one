Template.dashboardNewsWidget.helpers({
  stickyNews: function() {
    return Messages.findOne({
      messageType: 'news',
    },{
      sort: {
        dateCreated: -1
      }
    });
  },
  otherNews: function() {
    return Messages.find({
      messageType: 'news',
    },{
      sort: {
        dateCreated: -1
      },
      limit: 2,
      skip: 1
    });
  },
  date: function(dateToFormat) {
    return moment(this.dateCreated).format('MMM DD');
  }

});

var rememberScrollPosition = function(){
  // lock scroll position, but retain settings for later
    var scrollPosition = [
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft,
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    ];
    var body = $('body');
    body.data('scroll-position', scrollPosition);
    body.data('previous-overflow', body.css('overflow'));
    body.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
};

Template.dashboardNewsWidget.events({

  // Opens the com_hub to the news channel
  'click .view-news': function() {
    var newsRoom = Rooms.findOne({
      roomType: 'company',
      roomName: 'News'
    });
    if(! newsRoom)
      return false;

    Session.set('openRoomId',newsRoom._id);
    $('#sidebar-scroll-target').velocity("scroll",600);
    $.Velocity.hook($('#communication-main'), "width", "100%");
    $.Velocity.hook($('#communication-message-board'), "width", "60%");
    $.Velocity.hook($('#communication-task-board'), "width", "0");
    $.Velocity.hook($('#communication-library-board'), "width", "15.5%");
    // force scrollbar on sidebar
    var currentHeight = $(window).height();
    $('.communication-sidebar-sleeve').css({
      'height': currentHeight - 130 + 'px',
      'position': 'fixed',
      'top': '120px',
      'width': '24%'
    });
    // lock scroll position, but retain settings for later
    rememberScrollPosition();
  },

  // Opens the com_hub, to the news channel, to the expanded version of the post
  'click .read-more': function() {
    var newsRoom = Rooms.findOne({
      roomType: 'company',
      roomName: 'News'
    });
    if(! newsRoom)
      return false;

    Session.set('openRoomId',newsRoom._id);
    $('#sidebar-scroll-target').velocity("scroll",600);
    $.Velocity.hook($('#communication-main'), "width", "100%");
    $.Velocity.hook($('#communication-message-board'), "width", "60%");
    $.Velocity.hook($('#communication-task-board'), "width", "0");
    $.Velocity.hook($('#communication-library-board'), "width", "15.5%");
    // force scrollbar on sidebar
    var currentHeight = $(window).height();
    $('.communication-sidebar-sleeve').css({
      'height': currentHeight - 130 + 'px',
      'position': 'fixed',
      'top': '120px',
      'width': '24%'
    });
    // lock scroll position, but retain settings for later
    rememberScrollPosition();
  }

});