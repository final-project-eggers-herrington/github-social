function RepoController (RepoService, $stateParams) {
	let vm = this;

	let id = $stateParams.repoid;
	console.log(id)
	RepoService.getRepoSingle(id).then(res => {
		vm.repoData = res.data[0]
		console.log(vm.repoData)
	});
}

RepoController.$inject = ['RepoService', '$stateParams'];
export { RepoController }