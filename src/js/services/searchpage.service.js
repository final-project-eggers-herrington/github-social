function SearchPageService ($http, GITHUB) {
	
	this.secondSearch = secondSearch;
	function secondSearch (searchquery) {
		return $http.get(GITHUB.URL + `search/repositories?q=${searchquery}/`)
	}
}

SearchPageService.$inject = ['$http', 'GITHUB'];
export { SearchPageService }