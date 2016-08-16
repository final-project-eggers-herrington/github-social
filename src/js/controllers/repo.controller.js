function RepoController (RepoService, $stateParams, $cookies) {
	let vm = this;
	vm.comment = comment;
	vm.showreplyform = false;
	vm.commentSubmit = commentSubmit;
	vm.replySubmit = replySubmit;
	vm.toggleShown = toggleShown;

	let id = $stateParams.repoid;
	console.log(id)
	RepoService.getRepoSingle(id).then(res => {
		vm.repoData = res.data[0]
		console.log(vm.repoData)
	});

	function comment () {
		vm.showreplyform = true;
	}

	function toggleShown(obj){
		
		obj.shown = !obj.shown;
	}

	function viewAllComments () {
		RepoService.viewAllComments(id).then(res=>{
			vm.comments = res.data;
			res.data.forEach(function(datum){
				datum.shown = false;
			})
			console.log('viewAllComments:', res)
		})
	}

	function viewAllReplies () {
		RepoService.viewAllReplies().then(res=>{
			vm.replies = res.data;
			res.data.forEach(function(datum){
				datum.shown = false;
			})
		})
	}

	viewAllComments();

	function commentSubmit (comment) {
		let obj = {};
		obj.content = comment.content;
		obj.user_github = $cookies.get('github_account');
		obj.repo_id = $stateParams.repoid;
		obj.parent_id = comment.parent_id;

		RepoService.commentSubmit(obj).then(res=>{
			console.log('commentSubmit:', res)
		})

		viewAllComments();
	}

	function replySubmit (comment) {
		let obj = {};

		obj.content = comment.content;
		obj.user_github = $cookies.get('github_account');
		obj.repo_id = $stateParams.repoid;
		obj.parent_id = comment.parent_id;

		RepoService.commentSubmit(obj).then(res=>{
			console.log(res)
		});
	}
}

RepoController.$inject = ['RepoService', '$stateParams', '$cookies'];
export { RepoController }