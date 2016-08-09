function LoginController (LoginService, $state) {

	let vm = this;
	this.login = login;

	function login (user) {
		LoginService.login(user)
		console.log(user);
	}

}

LoginController.$inject = ['LoginService', '$state'];
export { LoginController };