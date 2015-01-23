@Transitioner.animations.slideRight = (duration, easing) ->
  insertElement: (node, next) ->
    $node = $(node)
    $.Velocity.hook($node, "translateX", "100%");
    $node.insertBefore(next)
      .velocity {translateX: '0%'},
        duration: duration
        easing: easing
        queue: false
  removeElement: (node) ->
    $node = $(node)
    $node.velocity {translateX: '-100%'},
      duration: duration
      easing: easing
      queue: false
      complete: -> 
        # remove when animation is complete
        $node.remove()

@Transitioner.animations.slideLeft = (duration, easing) ->
  insertElement: (node, next) ->
    $node = $(node)
    $.Velocity.hook($node, "translateX", "-100%");
    $node.insertBefore(next)
      .velocity {translateX: '0%'},
        duration: duration
        easing: easing
        queue: false
  removeElement: (node) ->
    $node = $(node)
    $node.velocity {translateX: '100%'},
      duration: duration
      easing: easing
      queue: false
      complete: -> 
        # remove when animation is complete
        $node.remove()

@Transitioner.animationPair 'slideLeft', 'slideRight'


@Transitioner.animations.slideUp = (duration, easing) ->
  insertElement: (node, next) ->
    $node = $(node)
    $.Velocity.hook($node, "translateY", "100%");
    $node.insertBefore(next)
      .velocity {translateY: '0%'},
        duration: duration
        easing: easing
        queue: false
  removeElement: (node) ->
    $node = $(node)
    $node.velocity {translateY: '-100%'},
      duration: duration
      easing: easing
      queue: false
      complete: -> 
        # remove when animation is complete
        $node.remove()


@Transitioner.animations.slideDown = (duration, easing) ->
  insertElement: (node, next) ->
    $node = $(node)
    $.Velocity.hook($node, "translateY", "-100%");
    $node.insertBefore(next)
      .velocity {translateY: '0%'},
        duration: duration
        easing: easing
        queue: false
  removeElement: (node) ->
    $node = $(node)
    $node.velocity {translateY: '100%'},
      duration: duration
      easing: easing
      queue: false
      complete: -> 
        # remove when animation is complete
        $node.remove()

@Transitioner.animationPair 'slideUp', 'slideDown'
