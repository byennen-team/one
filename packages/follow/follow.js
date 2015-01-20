/* globals Followers: true, Following: true */

// Who the user is followed by
Followers = new Meteor.Collection('followers');

Followers.model = {
  userId: String,
  followerUserIds: [String]
};

// Who the user is following
Following = new Meteor.Collection('following');

Following.model = {
  userId: String,
  followingUserIds: [String]
};
