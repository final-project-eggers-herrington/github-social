import _ from 'lodash';

function RepoController (RepoService, $stateParams, $cookies, $state) {
	let vm = this;
	vm.comment = comment;
	vm.showreplyform = false;
	vm.commentSubmit = commentSubmit;
	vm.replySubmit = replySubmit;
	vm.toggleShown = toggleShown;
	vm.replyShown = false;
	vm.account = false;
	vm.deletePost = deletePost;

	let accessToken   = $cookies.get('access_token');
	let githubAccount = $cookies.get('github_account');

	function logStatusCheck () {
		if (!accessToken) {
			vm.replyShown = false;
		} else {
			vm.replyShown = true;
		}
	}

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

	function arrayCheck (comment, reply) {
		if (_.isArray(comment.replies)) {
				comment.replies.push(reply);
			} else {
				comment.replies = [reply];
			}
	}

	function viewAllComments () {
		RepoService.viewAllComments(id).then(res=>{
			vm.allComments = res.data;
			vm.allComments.forEach(function(datum){
				datum.shown = false;
			});

			console.log('viewAllComments:', res)

			vm.comments = [];
			vm.replies = [];

			vm.allComments.filter(function (obj) {
				if (obj.is_child === 0 || obj.is_child === false) {
					vm.comments.push(obj)
				} else {
					vm.replies.push(obj)
				}
			});

			vm.replies.forEach( function (reply) {
				let comment = _.find(vm.comments, { 'id': reply.parent_id });
				if (comment) {
					arrayCheck (comment, reply);		
				} else {
					let comment = _.find(vm.replies, { 'id': reply.parent_id });
					arrayCheck (comment, reply);
				}
			});

			opCheck();
		})
	}

	function viewAllReplies () {
		RepoService.viewAllReplies().then(res=>{
			vm.replies = res.data;
			vm.replies.forEach(function(datum){
				datum.shown = false;
			})
		})
	}

	function commentSubmit (comment) {
		let obj         = {};
		obj.content     = comment.content;
		obj.user_github = githubAccount;
		obj.repo_id     = $stateParams.repoid;
		obj.parent_id   = comment.parent_id;

		RepoService.commentSubmit(obj).then(res=>{
			$state.go($state.current, {}, {reload: true});
		})

		viewAllComments();
	}

	function replySubmit (comment) {
		let obj         = {};
		obj.content     = comment.content;
		obj.user_github = githubAccount;
		obj.repo_id     = $stateParams.repoid;
		obj.parent_id   = comment.parent_id;

		RepoService.commentSubmit(obj).then(res=>{
			$state.go($state.current, {}, {reload: true})
		});
	}

	function opCheck () {
		vm.allComments.forEach(function(obj){
			if (githubAccount === obj.github) {
				obj.account = true;
			} else {
				obj.account = false;
			}
		})
	}

	function deletePost (id) {
		RepoService.deletePost(id);
	}

	function init () {
		viewAllComments();
		logStatusCheck();
	}

	init();
}

RepoController.$inject = ['RepoService', '$stateParams', '$cookies', '$state'];
export { RepoController }