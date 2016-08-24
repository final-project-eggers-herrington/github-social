function HomeService (SERVER, $http, $cookies) {
	this.getAllRepos     = getAllRepos;
	this.deletePost      = deletePost;
	this.editPost        = editPost;
	this.upvoteRepo      = upvoteRepo;
	this.downvoteRepo    = downvoteRepo;

	let token = $cookies.get('access_token');

	function getAllRepos () {
		return $http.get(SERVER.URL + 'allrepos')
	}

	function deletePost (id) {
		return $http({
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			url: SERVER.URL + 'delete/repo',
			data: {repo_id: id}
		});
	}

	function editPost (obj) {
		return $http({
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			url: SERVER.URL + `post/repo/${obj.id}`,
			data: {user_description: obj.user_description}
		})
	}

	function upvoteRepo (obj) {
		return $http({
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			url: SERVER.URL + `vote/repo/${obj.id}`,
			data: {vote: obj.vote}
		})
	}

	function downvoteRepo (obj) {
		return $http({
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			url: SERVER.URL + `vote/repo/${obj.id}`,
			data: {vote: obj.vote}
		})
	}
}

HomeService.$inject = ['SERVER', '$http', '$cookies'];
export { HomeService };