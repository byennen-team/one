@Transitioner.animations.none = ->
  insertElement: (node, next) ->
    $node = $(node)
    $node.insertBefore(next)
  removeElement: (node) ->
    $node = $(node)
    $node.remove()