// TODO: Router.configure
Teams = new Mongo.Collection("teams");

Router.map(function() {
  this.route('home', {path: ['/', '/home']});
  this.route('create', {path: '/create'});
  this.route('team', {path: '/team', 
  	data: function() {
	  	return this.params.query["captainName"];
	  },
  	waitOn: function () {
  		return Meteor.subscribe("teamByCaptain", this.params.query["captainName"]);
  }});
});