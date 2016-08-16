function RegistrationService ($http, SERVER, $cookies, $state) {
	this.register = register
	function register (user) {
		return $http.post(SERVER.URL + 'register', user);
	}
}

RegistrationService.$inject = ['$http', 'SERVER'];
export { RegistrationService };