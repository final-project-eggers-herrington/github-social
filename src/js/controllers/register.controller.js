function RegisterController (RegistrationService, $state, $cookies) {

	let vm = this;
	this.register = register;

	function register (user) {
		RegistrationService.register(user).then( res => {
			$cookies.put('access_token', res.data.access_token);
			$cookies.put('github_account', res.data.github);
			console.log("register service ran! : ", res)
			$state.go('root.profile', {username: res.data.github})
		});
		console.log(user);
	}
}

RegisterController.$inject = ['RegistrationService', '$state', '$cookies'];
export { RegisterController };