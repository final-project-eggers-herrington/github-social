function LoginController (LoginService, $state, $cookies) {

	let vm = this;
	vm.login = login;

	vm.wrongemail    = false;
	vm.wrongpassword = false;


	function login (user) {
		LoginService.login(user).then( res => {
			$cookies.put('access_token', res.data.access_token);
			$cookies.put('github_account', res.data.github);
			$state.go('root.profile', {username: res.data.github});
		}, (error) => {
			console.log(error);
			if (error.data.error === "Cannot read property 'password' of null") {
				vm.wrongemail = true;
			} else if (error.data.error === "Password mismatch") {
				vm.wrongpassword = true;
			}
		});
	}

}

LoginController.$inject = ['LoginService', '$state', '$cookies'];
export { LoginController };