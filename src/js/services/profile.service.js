function ProfileService ($http, GITHUB, $cookies, $state) {
	this.getProfile = getProfile;

	function getProfile (username) {
		console.log(username)
		return $http.get(GITHUB.URL + `users/${username}`)
	}
}

ProfileService.$inject = ['$http', 'GITHUB', '$cookies', '$state'];
export { ProfileService };