import _ from 'lodash';

function RepoController (RepoService, $stateParams, $cookies, $state) {
	let vm = this;
	vm.comment = comment;
	vm.showreplyform = false;
	vm.commentSubmit = commentSubmit;
	vm.replySubmit = replySubmit;
	vm.toggleShown = toggleShown;
	vm.replyShown = false;

	function logStatusCheck () {
		if (!$cookies.get('access_token')) {
			vm.replyShown = false;
		} else {
			vm.replyShown = true;
		}
	}

	logStatusCheck ();

	let id = $stateParams.repoid;
	RepoService.getRepoSingle(id).then(res => {
		vm.repoData = res.data[0]
	});

	function comment () {
		vm.showreplyform = true;
	}

	function toggleShown(obj){
		
		obj.shown = !obj.shown;
	}

	function viewAllComments () {
		RepoService.viewAllComments(id).then(res=>{
			res.data.forEach(function(datum){
				datum.shown = false;
			})
			console.log('viewAllComments:', res)
			vm.comments = [];
			vm.replies = [];
			res.data.filter(function (obj) {
				if (obj.is_child === 0 || obj.is_child === false) {
					vm.comments.push(obj)
				} else {
					vm.replies.push(obj)
				}
			});

			vm.replies.forEach( reply => {
				let comment = _.find(vm.comments, { 'id': reply.parent_id });
				if (comment) {
					if (_.isArray(comment.replies)) {
						comment.replies.push(reply);
					} else {
						comment.replies = [reply];
					}					
				} else {
					let comment = _.find(vm.replies, { 'id': reply.parent_id });
					if (_.isArray(comment.replies)) {
						comment.replies.push(reply);
					} else {
						comment.replies = [reply];
					}
				}
			});
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
			console.log(res)
			$state.go($state.current, {}, {reload: true});
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
			$state.go($state.current, {}, {reload: true})
		});
	}
}

RepoController.$inject = ['RepoService', '$stateParams', '$cookies', '$state'];
export { RepoController }