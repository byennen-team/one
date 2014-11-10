Routes.getName = function () {
  var current = Router.current();
  return current && current.route && current.route.getName();
};