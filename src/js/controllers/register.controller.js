function RegisterController (RegistrationService, $state) {

	let vm = this;
	this.register = register;

	function register (user) {
		RegistrationService.register(user);
		console.log(user);
	}
}

RegisterController.$inject = ['RegistrationService', '$state'];
export { RegisterController };