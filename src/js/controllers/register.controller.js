function RegisterController (RegistrationService, $state, $cookies) {

	let vm = this;
	this.register = register;

	function register (user) {
		RegistrationService.register(user).then( res => {
			$cookies.put('access_token', res.data.access_token);
			$cookies.put('github_account', res.data.github);
			$state.go('login');
		}, (error) => {
			console.log(error);
		});
	}
}

RegisterController.$inject = ['RegistrationService', '$state', '$cookies'];
export { RegisterController };