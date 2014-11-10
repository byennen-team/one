Routes.getName = function () {
  var current = Router.current();
  return current.route && current.route.getName();
};