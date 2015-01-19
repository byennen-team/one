// TODO: refactor this. Lance & Dave
var cumuloCheckboxColor = function( checkbox, label, checkedClass, uncheckedClass ){
  /* Changes a label's color if it's checkbox is clicked
  // 		Works great with icon fonts
  //		Both label and checkbox must have an #id
  // 		Checkboxes only - no radio buttons
  // input - checkbox			: 	$(id) of the checkbox (usually hidden)
  // input - label			: 	$(id) of the label
  // input - checkedClass		: 	Class to indicate checked
  // input - uncheckedClass	: 	class to indicate unchecked (optional)
  ----------------------------------------------------- */
  if( uncheckedClass !== null ){
    checkbox.on('click', function(){
      if( ! checkbox.is( ':checked' ) ){
        label.removeClass( checkedClass ).addClass( uncheckedClass );
      } else{
        label.removeClass( uncheckedClass ).addClass( checkedClass );
      }
    });
  } else {
    checkbox.on('click', function(){
      if( ! checkbox.is( ':checked' ) ){
        label.removeClass( checkedClass );
      } else{
        label.addClass( checkedClass );
      }
    });
  }
};

var cumuloRadioColor = function( radio1, radio2, label1, label2, checkedClass ){
  /* Changes a label's color if it's radio is clicked
  // 		Works on 2 radio buttons
  // 		Works great with icon fonts
  //		Both label and checkbox must have an #id
  // 		Radios only - no checkboxes
  // input - radio			: 	$(id) of the checkbox (usually hidden)
  // input - label			: 	$(id) of the label
  // input - checkedClass		: 	Class to indicate checked
  ----------------------------------------------------- */
  if( radio2.is( ':checked' ) ){
    label1.removeClass( checkedClass );
    label2.addClass( checkedClass );
  } else if( radio1.is( ':checked' ) ){
    label2.removeClass( checkedClass );
    label1.addClass( checkedClass );
  }

  radio1.on('change', function(){
    if( ! radio1.is( ':checked' ) ){
      label1.removeClass( checkedClass );
      label2.addClass( checkedClass );
    } else{
      label1.addClass( checkedClass );
      label2.removeClass( checkedClass );
    }
  });

  radio2.on('change', function(){
    if( ! radio2.is( ':checked' ) ){
      label2.removeClass( checkedClass );
      label1.addClass( checkedClass );
    } else{
      label2.addClass( checkedClass );
      label1.removeClass( checkedClass );
    }
  });
};

Template.profilePropertySearch.rendered = function () {
  $('.selectpicker').selectpicker();

  $("#sqft").slider();
  $("#sqft").on("slide", function(slideEvt) {
    $("#sqftSliderVal").text(slideEvt.value);
  });

  $('.datepicker').datepicker();

  // TODO: refactor this. Lance & Dave
  // Checkbox/Radio checker
  cumuloRadioColor( $('#sale-button'), $('#rent-button'), $('#sale-label'), $('#rent-label'), 'checked' );
  cumuloRadioColor( $('#contact-buyer'), $('#contact-seller'), $('#contact-buyer-radio'), $('#contact-seller-radio'), 'checked' );
  cumuloRadioColor( $('#contact-email-button'), $('#contact-text-button'), $('#contact-email-radio'), $('#contact-text-radio'), 'checked' );
  cumuloCheckboxColor( $('#adv-condo'), $('#adv-condo-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-cooperative'), $('#adv-cooperative-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-townhouse'), $('#adv-townhouse-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-house'), $('#adv-house-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-land'), $('#adv-land-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-doorman'), $('#adv-doorman-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-garage'), $('#adv-garage-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-prewar'), $('#adv-prewar-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-pet-friendly'), $('#adv-pet-friendly-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-waterview'), $('#adv-waterview-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-outdoor-space'), $('#adv-outdoor-space-btn'), 'checked' );
  cumuloCheckboxColor( $('#adv-no-contract'), $('#adv-no-contract-btn'), 'checked' );
};

Template.profilePropertySearch.events({
  'click #advanced-search-btn': function () {
    $('#advanced-search-btn').toggleClass("open");
    $('#advanced-search').slideToggle();
  }
});
