@Transitioner.animations.fade = (duration, easing) ->
  insertElement: (node, next) ->
    $node = $(node)
    $.Velocity.hook($node, "opacity", "0");
    $node.insertBefore(next)
      .velocity {opacity: '1'},
        duration: duration
        easing: easing
        queue: false
  removeElement: (node) ->
    $node = $(node)
    $node.velocity {opacity: '0'},
      duration: duration
      easing: easing
      queue: false
      complete: -> 
        # remove when animation is complete
        $node.remove()

@Transitioner.animationPair 'fade', 'fade'