function RepoService ($http, SERVER) {
	this.getRepoSingle = getRepoSingle;

	function getRepoSingle (id) {
		return $http({
			method: 'POST',
			url: SERVER.URL + 'repo',
			data: {id: id}
			});
	}
}

RepoService.$inject = ['$http', 'SERVER'];
export { RepoService }