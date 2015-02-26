var defaultItemsPerPage = 10;

Template.oneInfiniteScrollList.hooks({

  created: function () {
    var templateInstance = this;

    this.autorun(
      function () {
        var data = Template.currentData();
        var itemsPerPage = data.itemsPerPage || defaultItemsPerPage;
        var args = [data.subscription.name].concat(
          data.subscription.arguments, [itemsPerPage]
        );
        templateInstance.subscriptionHandler =
          Meteor.subscribeWithPagination.apply(Meteor, args);
      }
    );
  }

});

Template.oneInfiniteScrollList.helpers({

  items: function () {
    return Template.instance().data.cursor;
  },

  moreAvailable: function () {
    var templateInstance = Template.instance();
    var cursorCount = templateInstance.data.cursor.count();
    var subscriptionHandler = templateInstance.subscriptionHandler;

    return subscriptionHandler.limit() <= cursorCount;
  },

  isLoading: function () {
    var templateInstance = Template.instance();

    return !templateInstance.subscriptionHandler.ready();
  }

});

Template.oneInfiniteScrollList.events({
  'click [data-action="load-more"]': function (event, templateInstance) {
    templateInstance.subscriptionHandler.loadNextPage();
  }
});
