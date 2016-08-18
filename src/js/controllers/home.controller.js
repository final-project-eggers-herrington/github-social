function HomeController (HomeService, $cookies) {
	let vm = this;
	vm.viewMore = viewMore;
	vm.deletePost = deletePost;

	let limit = 20;
	vm.limit = limit;

	let accessToken   = $cookies.get('access_token');
	let githubAccount = $cookies.get('github_account');

	function viewMore () {
		vm.limit = vm.limit + 20;
	}

	function getAllRepoData () {
		HomeService.getAllRepos().then(res => {
			vm.allRepoData = res.data;
			console.log(vm.allRepoData)
			opCheck();
		})
	}

	function opCheck () {
		vm.allRepoData.forEach(function(obj){
			if (githubAccount === obj.github) {
				obj.account = true;
			} else {
				obj.account = false;
			}
		})
	}

	function deletePost (id) {
		HomeService.deletePost(id);
	}

	function init (){
		getAllRepoData();
	}

	init();
}

HomeController.$inject = ['HomeService', '$cookies'];
export { HomeController };