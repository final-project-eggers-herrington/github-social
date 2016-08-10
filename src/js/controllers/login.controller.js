function LoginController (LoginService, $state, $cookies) {

	let vm = this;
	vm.login = login;

	function login (user) {
		LoginService.login(user).then( res => {
			$cookies.put('access_token', res.data.access_token);
			$cookies.put('github_account', res.data.github);
			console.log("login service ran! : ", res)
			$state.go('root.profile', {username: res.data.github})
		});
		console.log(user);
	}

}

LoginController.$inject = ['LoginService', '$state', '$cookies'];
export { LoginController };