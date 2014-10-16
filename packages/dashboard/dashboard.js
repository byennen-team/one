Template.dashboard.events({
  'click #chat-button': function (event, template) {
    $('.chat-window').velocity({ bottom: 0 }, "easeInSine");
  },
  'click .chat-window': function (event, template) {
    $('.chat-window').velocity({ bottom: -1000 }, "easeInSine");
  }
});
