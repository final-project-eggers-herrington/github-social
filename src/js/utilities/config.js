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
		.state('root.repo-single', {
			url: '/repos/:repoid',
			templateUrl: 'templates/repo.tmpl.html',
			controller: 'RepoController as vm'
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
			url: '/users/:username',
			templateUrl: 'templates/profile.tmpl.html',
			controller: 'ProfileController as vm'
		})
		.state('root.search', {
			url: '/search/:searchquery',
			templateUrl: 'templates/searchpage.tmpl.html',
			controller: 'SearchPageController as vm'
		})
		.state('error404', {
			url: '/nuggets',
			templateUrl: 'templates/error404.tmpl.html',
			controller: 'Error404Controller as vm'
		})
		.state('welcome', {
			url: '/welcome',
			templateUrl: 'templates/welcome.tmpl.html',
			controller: 'WelcomeController as vm'
		})

	$urlRouterProvider.otherwise('/nuggets');
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export { config };
