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
  var args = [this.data.subscription.name].concat(
    this.data.subscription.arguments,
    [itemsPerPage]
  );
  this.subscriptionHandler = Meteor.subscribeWithPagination.apply(Meteor, args);
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
  }
});

Template.oneInfiniteScrollList.events({
  'click [data-action="load-more"]': function (event, templateInstance) {
    templateInstance.subscriptionHandler.loadNextPage();
  }
});
