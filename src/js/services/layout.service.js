function LayoutService ($cookies, $state) {
	this.viewProfile = viewProfile;

	function viewProfile () {
		let account = $cookies.get('github_account')
		$state.go('root.profile', { username: account })
	}

}

LayoutService.$inject = ['$cookies', '$state'];
export { LayoutService };