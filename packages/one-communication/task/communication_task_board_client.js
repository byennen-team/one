Template.taskBoard.rendered = function () {
  var $taskSleeve = $( "#communication-task-board-sleeve" );
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  $taskSleeve.mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside"
  });

  // force scrollbar on sidebar
  var currentHeight = $(window).height();
  $taskSleeve.css({
    'height': currentHeight - 130 + 'px'
  });

  // Percent complete circle
  var fromHidden = -90;

  // utility funciton to align 0 degrees with top
  // takes degrees and returns degrees - 45
  function topAlign( degrees ) {
    return degrees - 45;
  }

  // utility function to rotate a jQuery element
  // takes element and the degree of rotation (from the top)
  function rotate( el, degrees ) {
    degrees = topAlign( degrees || 0 );
    el.css(
      'transform', 'rotate('+degrees+'deg)',
      '-webkit-transform', 'rotate('+degrees+'deg)',
      '-moz-transform', 'rotate('+degrees+'deg)',
      '-ms-transform', 'rotate('+degrees+'deg)',
      '-o-transform', 'rotate('+degrees+'deg)'
    );
  }

  // function to draw semi-circle
  // takes a jQuery element and a value (between 0 and 1)
  // element must contain four .arc_q elements
  function circle(el, normalisedValue) {
    // turn normalised value into degrees
    var degrees = normalisedValue * 360;
    // keeps track of which quarter we're working with
    var counter = 1;
    el.find('.arc_q').each(function(){
      // limit angle to maximum allowed for this quarter
      var angle = Math.min(counter * 90, degrees);
      // rotate from the hiding place
      rotate($(this), fromHidden + angle);
      counter++;
    });
    if (degrees > 90) {   // hide the cover-up square when not needed
      el.find('.arc_cover').css('display', 'none');
    }
  }

  // uses the the circle function to 'animate' drawing of the semi-circle
  // incrementally increses the value passed by 0.01 up to the value required
  function animateCircle( el, normalisedValue, current ) {
    current = current || 0;
    circle(el, current);
    if (current < normalisedValue) {
      current += 0.01;
      setTimeout(function(){ animateCircle(el, normalisedValue, current); }, 1);
    }
  }

// TODO: The percent complete for the task list goes here
//    Format = 0% = 0.00, 50% = 0.50, 100% = 1.00, etc..
  animateCircle($('.circle'), 0.13);


};

Template.taskBoard.events({

  // Show task menu when a dot is clicked
  'click .task': function ( event ) {
    // Set caret height
    var $this = $( event.currentTarget );
    var position = $this.offset();
    $( "#task-menu-caret" ).css( 'top', ( position.top - 91 ) + "px" );

    // add class to task for open styling
    $this.addClass( 'open' );
    // show menu
    $( '#task-menu, #task-menu-clear' ).velocity( "fadeIn", { duration: 300 });
  },

});