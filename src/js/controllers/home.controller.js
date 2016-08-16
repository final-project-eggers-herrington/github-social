function HomeController (HomeService) {
	let vm = this;

	HomeService.getAllRepos().then(res => {
		vm.allRepoData = res.data;
		console.log(vm.allRepoData)
	})
}

HomeController.$inject = ['HomeService'];
export { HomeController };