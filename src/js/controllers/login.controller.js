function LoginController (LoginService, $state, $cookies) {

	let vm = this;
	vm.login = login;

	function login (user) {
		LoginService.login(user).then( res => {
			$cookies.put('access_token', res.data.access_token);
			$cookies.put('github_account', res.data.github);
			$state.go('root.profile', {username: res.data.github});
		});
	}

}

LoginController.$inject = ['LoginService', '$state', '$cookies'];
export { LoginController };