function RepoService ($http, SERVER, $cookies) {
	this.getRepoSingle = getRepoSingle;
	this.commentSubmit = commentSubmit;
	this.viewAllComments = viewAllComments;
	this.deletePost = deletePost;
	this.editPost = editPost;

	let token = $cookies.get('access_token');

	function getRepoSingle (id) {
		return $http({
				method: 'POST',
				url: SERVER.URL + 'repo',
				data: {id: id}
			});
	}

	function commentSubmit (obj) {
		return $http({
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			url: SERVER.URL + 'post/comment',
			data: obj
		});
	}

	function viewAllComments (id) {
		return $http.post(SERVER.URL + 'repo/comments', {repo_id: id});
	}

	function deletePost (id) {
		return $http({
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			url: SERVER.URL + 'delete/comment',
			data: {comment_id: id}
		});
	}

	function editPost (obj) {
		console.log(obj);
		// return $http({
		// 	method: 'PUT',
		// 	headers: {
		// 		'Authorization': `Bearer ${token}`
		// 	},
		// 	url: SERVER.URL + 'edit/comment',
		// 	data: obj
		// });
	}
}

RepoService.$inject = ['$http', 'SERVER', '$cookies'];
export { RepoService }