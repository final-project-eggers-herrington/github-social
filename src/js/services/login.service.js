function LoginService ($http, SERVER) {
	this.login = login
	function login (user) {
		return $http.post(SERVER.URL + 'login', user)
	}
}

LoginService.$inject = ['$http', 'SERVER'];
export { LoginService };