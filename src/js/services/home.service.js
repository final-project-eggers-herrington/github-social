function HomeService (SERVER, $http) {
	this.getAllRepos = getAllRepos;

	function getAllRepos () {
		return $http.get(SERVER.URL + 'allrepos')
	}
}

HomeService.$inject = ['SERVER', '$http'];
export { HomeService };