function RepoController (RepoService, $stateParams) {
	let vm = this;
	vm.reply = reply;
	vm.showreplyform = false;
	vm.commentSubmit = commentSubmit;

	let id = $stateParams.repoid;
	console.log(id)
	RepoService.getRepoSingle(id).then(res => {
		vm.repoData = res.data[0]
		console.log(vm.repoData)
	});

	function reply () {
		vm.showreplyform = true;
	}

	function commentSubmit (comment) {
		RepoService.commentSubmit(comment).then(res=>{
			console.log(res)
		})
	}
}

RepoController.$inject = ['RepoService', '$stateParams'];
export { RepoController }