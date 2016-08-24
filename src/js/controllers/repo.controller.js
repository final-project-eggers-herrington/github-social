import _ from 'lodash';

function RepoController (RepoService, $stateParams, $cookies, $state) {
	let vm = this;
	vm.comment = comment;
	vm.showreplyform = false;
	vm.commentSubmit = commentSubmit;
	vm.replySubmit = replySubmit;
	vm.toggleShown = toggleShown;
	vm.replyShown = false;
	vm.deletePost = deletePost;
	vm.editPost = editPost;
	vm.editShown = editShown;

	vm.upvoteRepo      = upvoteRepo;
	vm.downvoteRepo    = downvoteRepo;
	vm.upvoteComment   = upvoteComment;
	vm.downvoteComment = downvoteComment;

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
		vm.repoData.account = false;
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
				datum.edit = false;
			});

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
				datum.edit = false;
				datum.upvote_count = 0;
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

	function editShown (obj) {
		obj.edit = !obj.edit
	}

	function deletePost (id) {
		RepoService.deletePost(id).then(()=>{
			$state.go($state.current, {}, {reload: true});
		});
	}

	function editPost (content, id) {
		let obj = {}
		
		obj.content = content.new_content;
		obj.id = id;

		RepoService.editPost(obj).then(()=>{
			$state.go($state.current, {}, {reload: true});
		});
	}

	function upvoteRepo (id, item) {
		let obj  = {};
		obj.id   = id;
		obj.vote = 1;
		RepoService.upvoteRepo(obj);
	}

	function downvoteRepo (id, item) {
		let obj  = {};
		obj.id   = id;
		obj.vote = -1;
		RepoService.downvoteRepo(obj);
	}

	function upvoteComment (id, item) {
		let obj  = {};
		obj.id   = id;
		obj.vote = 1;
		RepoService.upvoteComment(obj);
	}

	function downvoteComment (id) {
		let obj  = {};
		obj.id   = id;
		obj.vote = -1;
		RepoService.downvoteComment(obj);
	}

	function init () {
		viewAllComments();
		logStatusCheck();
	}

	init();
}

RepoController.$inject = ['RepoService', '$stateParams', '$cookies', '$state'];
export { RepoController }