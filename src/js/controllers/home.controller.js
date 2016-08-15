function HomeController (HomeService) {
	let vm = this;

	HomeService.getAllRepos().then(res => {
		console.log(res);
		vm.allRepoData = res.data;
	})
}

HomeController.$inject = ['HomeService'];
export { HomeController };