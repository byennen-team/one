/* globals Notifications: true, Notify: true */

Notifications = new Meteor.Collection('notifications');

Notifications.simpleSchema = new SimpleSchema({
	createdAt: {type: Date},
	createdFor: {type: String},
	notificationText: {type: String},
	notificationTitle: {type: String},
	notificationActionLink: {type: String, optional: true},
	read: {type: Boolean, defaultValue: false},
	expires: {type: Date, optional: true}
});

Notify = {};

Notify.markNotificationAsRead = function(notificationId) {
	Meteor.call('markNotificationAsRead', notificationId,
		function(error) {
			if (error)
				console.log(error);
		});
};

Notify.markAllNotificationsAsRead = function() {
	Meteor.call('markAllNotificationsAsRead',
		function(error) {
			if (error)
				console.log(error);
		});
};

Notify.getUnreadNotifications = function(userId) {
	if (! userId && Meteor.userId())
		userId = Meteor.userId();

	return Notifications.find({
		createdFor: userId,
		read: { $ne: true },
		$or: [
			{ expires:
				{ $gt: new Date() }
			},
			{ expires:
				{ $exists: false }
			}]
		},
		{
			sort: {
				createdAt: -1
			}
		});
};
