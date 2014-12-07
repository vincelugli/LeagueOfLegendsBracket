// TODO: Router.configure

Router.map(function() {
  this.route('home', {path: ['/', '/home']});
  this.route('create', {path: '/create'});
  this.route('team_profile', {path: '/team_profile'});
});