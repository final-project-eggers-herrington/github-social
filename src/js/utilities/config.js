function config ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('root', {
			abstract: true,
			templateUrl: 'templates/layout.tmpl.html',
			controller: 'LayoutController as vm'
		})
		.state('root.home', {
			url: '/',
			templateUrl: 'templates/home.tmpl.html',
			controller: 'HomeController as vm'
		})
		.state('root.login', {
			url: '/login',
			templateUrl: 'templates/login.tmpl.html',
			controller: 'LoginController as vm'
		})
		.state('root.register', {
			url: '/register',
			templateUrl: 'templates/register.tmpl.html',
			controller: 'RegisterController as vm'
		})
		.state('root.profile', {
			url: '/:username',
			templateUrl: 'templates/profile.tmpl.html',
			controller: 'ProfileController as vm'
		})

	$urlRouterProvider.otherwise('/');
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export { config };