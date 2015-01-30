Template.dashboardNewsWidget.helpers({

// TODO: returns sticky post's banner image url. String.
  bannerURL: function () {
    return 'images/dashboard/news-banner.jpg';
  },

// TODO: returns sticky post's banner image file name. String.
  bannerName: function () {
    return 'news banner name';
  },

// TODO: Returns sticky post's title. String.
  stickyTitle: function () {
    return 'Douglas Elliman REiNVENT';
  },

// TODO: Returns sticky post's text. Full HTML.
  stickyText: function () {
/* jshint ignore:start */
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate fringilla eros nec stagittis. Proin a lvorem sit amet elit scelerisque consequat ut at ante. Morbi cursus neque et urna commodo pellentesque. Vivamus lacinia sd';
/* jshint ignore:end */
  },

// TODO: Returns article 1's title. String.
  article1Title: function () {
    return 'Global Brand Alliance Party';
  },

// TODO: Returns article 1's date. Abreviated month and day of month. String.
  article1Date: function () {
    return 'Sept 20';
  },

// TODO: Returns article 1's text. Full HTML.
  article1Text: function () {
/* jshint ignore:start */
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate fringilla eros nec sagittis. Proin a lvorem sit amet elit scelerisque consequat ut at';
/* jshint ignore:end */ 
  },

  // TODO: Returns article 2's title. String.
  article2Title: function () {
    return 'New Offices in CT';
  },

// TODO: Returns article 2's date. Abreviated month and day of month. String.
  article2Date: function () {
    return 'Sept 18';
  },

// TODO: Returns article 2's text. Full HTML.
  article2Text: function () {
/* jshint ignore:start */
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate fringilla eros nec sagittis. Proin a lvorem sit amet elit scelerisque consequat ut at';
/* jshint ignore:end */ 
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
// TODO: need to open the news channel
    // expands the main dialog box t0 60% of full screen - task bar open
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
// TODO: need to open the news channel, to the expanded version of the post.
    // expands the main dialog box t0 60% of full screen - task bar open
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