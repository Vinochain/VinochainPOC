import { Template } from 'meteor/templating';
import '../imports/startup/accounts-config.js';

Template.content.helpers({
  bottles: [
    { name: 'Château le Pourcaud', year: '2015', region: 'Bordeaux' },
    { name: 'Saint-joseph', year: '2010', region: 'Rhone' },
    { name: 'Côte-rôtie', year: '2009', region: 'Rhone'  },
    { name: 'Château le Pourcaud', year: '2015', region: 'Bordeaux' },
    { name: 'Saint-joseph', year: '2010', region: 'Rhone' },
    { name: 'Côte-rôtie', year: '2009', region: 'Rhone'  },
  ],
});