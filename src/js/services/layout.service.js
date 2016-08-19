function LayoutService ($cookies, $state, $http, GITHUB) {
	this.viewProfile = viewProfile;
	this.search = search;
	this.logOut = logOut;

	function viewProfile () {
		let account = $cookies.get('github_account')
		if (account === undefined) {
			$state.go('root.login')
		} else {
			$state.go('root.profile', { username: account })
		}
	}

	function search (search) {
		$state.go('root.search', {searchquery: search.q});
	}

	function logOut () {
		$cookies.remove('github_account')
		$cookies.remove('access_token')
		$state.go('root.home')
	}
}

LayoutService.$inject = ['$cookies', '$state', '$http', 'GITHUB'];
export { LayoutService };