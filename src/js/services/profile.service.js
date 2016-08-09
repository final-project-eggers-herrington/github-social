function ProfileService ($http, GITHUB) {
	this.getProfile = getProfile;

	function getProfile (username) {
		console.log(username)
		return $http.get(GITHUB.URL + `users/${username}`)
	}
}

ProfileService.$inject = ['$http', 'GITHUB'];
export { ProfileService };