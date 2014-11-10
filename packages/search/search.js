Search = {};

var contains = function (str) {
  return {$regex: new RegExp('.*' + str + '.*', 'i')};
};

var startsWith = function (str) {
  return {$regex: new RegExp('^' + str, 'i')};
};

Search.cursor = function (search, options) {
  var selector;

  if (search.letter) {
    selector = {'profile.lastName': startsWith(search.letter)};
  }

  if (search.text) {
    var containsRegex = contains(search.text);

    var containsSelector = {
      $or: [
        {'profile.firstName': containsRegex},
        {'profile.lastName': containsRegex},
        {'profile.title': containsRegex}
      ]
    };

    if (selector) selector = {$and: [selector, containsSelector]};
    else selector = containsSelector;
  }

  if (!selector) selector = {};

  options = options || {};
  options.sort = {'profile.lastName': 1};

  return Meteor.users.find(selector, options);
};