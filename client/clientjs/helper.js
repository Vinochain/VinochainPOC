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

if(Meteor.isClient){
    var Txs = Meteor.call("getTenLastTransactions", '0xf2685c226dfe9b10986d8b5a2f0522abb2d46342');
	Template.bottleinfo.tenLastTxs = function() {
		return Txs;
};
}

