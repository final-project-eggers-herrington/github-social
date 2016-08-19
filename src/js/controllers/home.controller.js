function HomeController (HomeService, $cookies, $state) {
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
		HomeService.deletePost(id).then(()=>{
			$state.go($state.current, {}, {reload: true});
		});
	}

	function init (){
		getAllRepoData();
	}

	init();
}

HomeController.$inject = ['HomeService', '$cookies', '$state'];
export { HomeController };