Template.addbottle.events({
  'submit .form-add'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const year = target.year.value;
    const cepage = target.cepage.value;

  }
});