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

// if(Meteor.isClient){
//     var Txs = Meteor.call("getTenLastTransactions", Router.current().params._id);
// }

// Template.header.tenLastTxs = function() {
// 	return Router.current().route.path(this);
// };
