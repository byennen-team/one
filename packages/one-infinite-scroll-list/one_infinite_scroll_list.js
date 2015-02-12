/**
 * A reusable infinite scroll list.
 *
 * For a usage example see one-documents package.
 *
 * Arguments:
 * - subscription
 *   - name
 *   - arguments
 * - cursor
 */

var itemsPerPage = 10;

Template.oneInfiniteScrollList.created = function () {
  var templateInstance = this;

  this.autorun(function () {
    var data = Template.currentData();
    var args = [data.subscription.name].concat(
      data.subscription.arguments,
      [itemsPerPage]
    );
    templateInstance.subscriptionHandler =
      Meteor.subscribeWithPagination.apply(Meteor, args);
  });
};

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
