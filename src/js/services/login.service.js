function LoginService ($http, SERVER, $cookies, $state) {
	this.login = login
	function login (user) {
		$http.post(SERVER.URL + 'login', user).then( res => {
			$cookies.put('access_token', res.data.access_token);
			$cookies.put('github_account', res.data.github);
			console.log("login service ran! : ", res)
			$state.go('root.profile', {username: res.data.github})
		});
	}
}

LoginService.$inject = ['$http', 'SERVER', '$cookies', '$state'];
export { LoginService };