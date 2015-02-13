
Template.communicationSidebarFilter.helpers({

	// Checks the session 'filter' to see what communications should be shown
	communicationFilterTop: function(){
		var filter = Session.get('filter');
		// If the session hasn't been set yet, set it to show all communication.
		if(filter === undefined){
			Session.set('filter', {
				'filter': 'all',
				'pretty': 'all communication'
			});
			return 'all communication';
		}else {
			var pretty = filter.pretty;
			return pretty;
		}
	},

// TODO: if the user has any drafts return true, else return false.
  haveDrafts: function () {
    return true;
  }

});

Template.communicationSidebarFilter.events({

	// Dropdown sets Session 'filter' to determine which conversations to show
	'click .filter-option': function(event){
		var li = event.currentTarget;
		var $e = $(li);
		var filter = $e.data('filter');
		var pretty = $e.text();
		var json = {
			'filter': filter,
			'pretty': pretty
		};
		Session.set('filter', json);
	},

	// Scroll to com-hub position when filter is clicked
	'click #communication-filter': function () {
		$( "#transitioner-1" ).animate( { scrollTop: 400 } );
	}

});

