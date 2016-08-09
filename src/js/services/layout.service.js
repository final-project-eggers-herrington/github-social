function LayoutService ($cookies, $state, $http, GITHUB) {
	this.viewProfile = viewProfile;
	this.search = search;

	function viewProfile () {
		let account = $cookies.get('github_account')
		$state.go('root.profile', { username: account })
	}

	function search (search) {
		console.log(search)
		return $http.get(GITHUB.URL + `search/repositories?q=${search.q}/`).then(function (res) {
			console.log(res)
		})
	}

}

LayoutService.$inject = ['$cookies', '$state', '$http', 'GITHUB'];
export { LayoutService };