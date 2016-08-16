function RepoService ($http, SERVER, $cookies) {
	this.getRepoSingle = getRepoSingle;
	this.commentSubmit = commentSubmit;
	this.viewAllComments = ViewAllComments;

	function getRepoSingle (id) {
		return $http({
				method: 'POST',
				url: SERVER.URL + 'repo',
				data: {id: id}
			});
	}

	function commentSubmit (obj) {
		let token = $cookies.get('access_token');
		return $http({
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`
				},
				url: SERVER.URL + 'post/comment',
				data: obj
			});
	}

	function ViewAllComments () {
		return $http.get(SERVER.URL + 'allcomments');
	}
}

RepoService.$inject = ['$http', 'SERVER', '$cookies'];
export { RepoService }