function HomeController (HomeService, $cookies, $state) {
	let vm = this;
	vm.viewMore = viewMore;
	vm.deletePost = deletePost;
	vm.editPost = editPost;

	let limit = 20;
	vm.limit = limit;

	vm.popupOpen  = popupOpen;
	vm.popupClose = popupClose;

	vm.upvoteRepo      = upvoteRepo;
	vm.downvoteRepo    = downvoteRepo;

	let accessToken   = $cookies.get('access_token');
	let githubAccount = $cookies.get('github_account');

	function viewMore () {
		vm.limit = vm.limit + 20;
	}

	function getAllRepoData () {
		HomeService.getAllRepos().then(res => {
			vm.allRepoData = res.data;
			console.log(vm.allRepoData)
			vm.allRepoData.forEach(function(datum){
				datum.shown = false;
			})
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

	function editPost(form, id) {
		let obj = {};
		
		obj.id = id;
		obj.user_description = form.new_description;
		HomeService.editPost(obj).then(()=>{
			$state.go($state.current, {}, {reload: true});
		});
	}

	function popupOpen (obj) {
		obj.shown = true;
	}

	function popupClose (obj) {
		obj.shown = false;
	}

	function upvoteRepo (id, item) {
		let obj  = {};
		obj.id   = id;
		obj.vote = 1;
		HomeService.upvoteRepo(obj).then((res)=>{
			console.log(res)
		});
	}

	function downvoteRepo (id, item) {
		let obj  = {};
		obj.id   = id;
		obj.vote = -1;
		HomeService.downvoteRepo(obj);
	}

	function init (){
		getAllRepoData();
	}

	init();
}

HomeController.$inject = ['HomeService', '$cookies', '$state'];
export { HomeController };