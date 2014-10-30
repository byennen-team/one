Meteor.subscribe('user');

Template.leftNav.rendered = function () {
  $('.menu-link').leftNav();
};

$.fn.leftNav = function(options) {

  var settings = $.extend({
    'menu': ('#left_nav'),
    'push': ('.push'),
    'menuWidth': '22em',
    'activeBtn':'menu-open'
  }, options);

  var menuLink = this,
    menu = $(settings.menu),
    push = $(settings.push),
    width = settings.menuWidth;

  menu._state = 'closed';

  menu.open = function() {
    menu._state = 'open';
    menuLink.addClass(settings.activeBtn);
    push.velocity({ left: width }, {easing: [100, 0]});
    menu.velocity({ left: 0 }, {easing: [100, 0]});
  };

  menu.close = function() {
    menu._state = 'closed';
    menuLink.removeClass(settings.activeBtn);
    menu.velocity({ left: '-' + width }, {easing: [100, 0]});
    push.velocity({ left: 0 }, {easing: [100, 0]});
  };

  $(document).on('click.leftNav', function(e) {
    if (!$(e.target).parents().andSelf().is(menuLink) && menu._state === 'open')  {
      menu.close();
      menuLink.removeClass(settings.activeBtn);
    }
  });

  menuLink.on('click.leftNav', function(e) {
    e.preventDefault();
    if (menu._state === 'closed') {
      menu.open();
    } else {
      menu.close();
    }
  });

  menuLink.on('touchend', function(e){
    menuLink.trigger('click.leftNav');
    e.preventDefault();
  });

  return menu;

};
