function RegistrationService ($http, SERVER, $cookies, $state) {
	this.register = register
	function register (user) {
		$http.post(SERVER.URL + 'register', user).then( res => {
			$cookies.put('access_token', res.data.access_token);
			$cookies.put('github_account', res.data.github);
			console.log("register service ran! : ", res)
			$state.go('root.profile', {username: res.data.github})
		});
	}
}

RegistrationService.$inject = ['$http', 'SERVER', '$cookies', '$state'];
export { RegistrationService };