function HomeController (HomeService) {
	let vm = this;
	vm.viewMore = viewMore;

	let limit = 20;
	vm.limit = limit;

	function viewMore () {
		vm.limit = vm.limit + 20;
	}

	HomeService.getAllRepos().then(res => {
		vm.allRepoData = res.data;
		console.log(vm.allRepoData)
	})
}

HomeController.$inject = ['HomeService'];
export { HomeController };