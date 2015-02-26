Template.oneInfiniteScrollListForTable
  .inheritsHelpersFrom('oneInfiniteScrollList');
Template.oneInfiniteScrollListForTable
  .inheritsEventsFrom('oneInfiniteScrollList');
Template.oneInfiniteScrollListForTable
  .inheritsHooksFrom('oneInfiniteScrollList');

Template.oneInfiniteScrollListForTable.helpers({

  colspan: function () {
    var colspan = Template.currentData().colspan;

    if (!colspan) {
      throw new Error(
        'oneInfiniteScrollListForTable requires the colspan option'
      );
    }

    return colspan;
  }

});
