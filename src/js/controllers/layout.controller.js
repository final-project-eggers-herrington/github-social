function LayoutController (LayoutService, $rootScope, $cookies) {
	let vm = this;
	vm.viewProfile = viewProfile;
	vm.search = search;
	vm.isLoggedIn = false;
	vm.logOut = logOut;
	
	function viewProfile () {
		LayoutService.viewProfile();
	}

	function search (search) {
		LayoutService.search(search);
	}

    function loginChecker () {
		let loginStatus = $cookies.get('access_token')
		if (!loginStatus) {
			vm.isLoggedIn = false;
		} else {
			vm.isLoggedIn = true;
		}
	}

	function logOut () {
		LayoutService.logOut();
		loginChecker();
	}

	$rootScope.$on('$stateChangeStart', loginChecker);
}

LayoutController.$inject = ['LayoutService', '$rootScope', '$cookies'];
export { LayoutController };