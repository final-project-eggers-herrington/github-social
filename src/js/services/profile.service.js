function ProfileService ($http, GITHUB, $cookies, $state) {
	this.getProfile = getProfile;
	this.getRepos = getRepos;
	this.getUsersRepos = getUsersRepos;

	function getProfile (username) {
		return $http.get(GITHUB.URL + `users/${username}`)
	}

	function getRepos (username) {
		return $http.get(GITHUB.URL + `users/${username}/repos`)
	}

	function getUsersRepos (query, username) {
		return $http.get(GITHUB.URL + `search/repositories?q=${query}+user:${username}`)
	}
}

ProfileService.$inject = ['$http', 'GITHUB', '$cookies', '$state'];
export { ProfileService };