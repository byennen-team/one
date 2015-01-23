# check that iron route exists

class TransitionerClass
  constructor: (@default='none') ->
    @animations = {}
    @reverseAnimations = {}
    @transitions = []

  animationPair: (a, b) ->
    @reverseAnimations[a] = b
    @reverseAnimations[b] = a

  reverseAnimation: (a) -> 
    @reverseAnimations[a]
  
  transition: (fromRoute, toRoute, animationName, options) ->
    duration = 600
    easing = 'ease-in-out'
    reverse = true
    if options
      if 'duration' of options then duration = options.duration
      if 'easing' of options then easing = options.easing
      if 'reverse' of options then reverse = options.reverse
    # this is Router.route but for transitions
    # TODO: check that the routes exist in iron router.
    # TODO: check that the animation exists.
    @transitions.push {fromRoute, toRoute, animationName, duration, easing}
    # the reverse
    console.log options, reverse
    if reverse
      reverseAnimationName = @reverseAnimation(animationName)
      if reverseAnimationName
        @transitions.push({fromRoute: toRoute, toRoute: fromRoute, animationName:reverseAnimationName, duration, easing})
    return

  getAnimation: (fromRoute, toRoute) ->
    transitionObj = _.find @transitions, (transition) ->
      transition.fromRoute is fromRoute and transition.toRoute is toRoute

    if transitionObj?.animationName and transitionObj?.animationName of @animations
      return @animations[transitionObj.animationName](transitionObj.duration, transitionObj.easing)
    else
      return @animations[@default]()


@Transitioner = new TransitionerClass()
Transitioner = @Transitioner

counter = () ->
  count = 0
  return () -> count++

uniqueIdMaker = counter()

Template.transitioner.created = ->
  @id = uniqueIdMaker()

Template.transitioner.helpers
  id: () -> Template.instance().id


lastRoute = null
currentRoute = null

Meteor.startup ->
  Tracker.autorun ->
    lastRoute = currentRoute
    currentRoute = Router.current()?.route.getName()

Template.transitioner.rendered = ->

  @find("#transitioner-"+@id)?._uihooks =
    insertElement: (node, next) ->
      Transitioner.getAnimation(lastRoute, currentRoute).insertElement(node, next)

    removeElement: (node) ->
      Transitioner.getAnimation(lastRoute, currentRoute).removeElement(node)

