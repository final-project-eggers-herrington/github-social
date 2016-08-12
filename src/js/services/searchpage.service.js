function SearchPageService ($http, GITHUB, SERVER, $cookies) {
	
	this.secondSearch = secondSearch;
	this.postItem     = postItem;

	function secondSearch (searchquery) {
		return $http.get(GITHUB.URL + `search/repositories?q=${searchquery}/`)
	}

	function postItem (obj) {
		return $http.post(SERVER.URL + "post", obj);
	}
}

SearchPageService.$inject = ['$http', 'GITHUB', 'SERVER', '$cookies'];
export { SearchPageService }