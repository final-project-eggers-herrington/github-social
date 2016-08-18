function HomeService (SERVER, $http, $cookies) {
	this.getAllRepos = getAllRepos;
	this.deletePost = deletePost;

	let token = $cookies.get('access_token');

	function getAllRepos () {
		return $http.get(SERVER.URL + 'allrepos')
	}

	function deletePost (id) {
		console.log(id)
		return $http({
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			url: SERVER.URL + 'delete/repo',
			data: {id: id}
		});
	}
}

HomeService.$inject = ['SERVER', '$http', '$cookies'];
export { HomeService };