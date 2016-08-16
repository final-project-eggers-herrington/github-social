function RepoController (RepoService, $stateParams, $cookies) {
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

	function viewAllComments () {
		RepoService.viewAllComments().then(res=>{
			vm.comments = res.data;
			console.log('viewAllComments:', res)
		})
	}

	viewAllComments();

	function commentSubmit (comment) {
		let obj = {};
		obj.content = comment.content;
		obj.user_github = $cookies.get('github_account');
		obj.repo_id = $stateParams.repoid;

		RepoService.commentSubmit(obj).then(res=>{
			console.log('commentSubmit:', res)
		})

		viewAllComments();
	}
}

RepoController.$inject = ['RepoService', '$stateParams', '$cookies'];
export { RepoController }