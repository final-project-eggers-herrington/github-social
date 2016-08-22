function HomeService (SERVER, $http, $cookies) {
	this.getAllRepos = getAllRepos;
	this.deletePost = deletePost;

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
			data: obj.user_description
		})
	}
}

HomeService.$inject = ['SERVER', '$http', '$cookies'];
export { HomeService };