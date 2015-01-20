User.generateSlug = function (firstName, lastName) {
  // Strip any non-alphanumeric characters.
  var seedSlug = (
    firstName.replace(/\W/g, '') + '-' + lastName.replace(/\W/g, '')
  ).toLowerCase();

  var potentialSlugs = [seedSlug];

  var index = 1;

  var slug = null;
  while (!slug) {
    // remove the existing aliases from the potential names
    var existing = Meteor.users.find({slug: {$in: potentialSlugs}}).fetch();

    existing = _.pluck(existing, 'slug');
    potentialSlugs = _.difference(potentialSlugs, existing);

    slug = _.first(potentialSlugs);

    // if all the slugs are taken, generate another 10 potential aliases,
    // and perform the search again
    if (!slug) {
      potentialSlugs = [];

      for (var i = 0; i < 10; i++) {
        potentialSlugs.push(seedSlug + index);
        index++;
      }
    }
  }

  return slug;
};
