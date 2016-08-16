function RepoService ($http, SERVER) {
	this.getRepoSingle = getRepoSingle;
	this.commentSubmit = commentSubmit;

	function getRepoSingle (id) {
		return $http({
				method: 'POST',
				url: SERVER.URL + 'repo',
				data: {id: id}
			});
	}

	function commentSubmit (comment) {
		return $http({
				method: 'POST',
				url: SERVER.URL + 'comment',
				data: {comment: comment}
			});
	}
}

RepoService.$inject = ['$http', 'SERVER'];
export { RepoService }