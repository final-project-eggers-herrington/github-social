import $ from "jquery"

function ProfileController (ProfileService, $stateParams) {
	let vm = this
	
	function init () {
		ProfileService.getProfile($stateParams.username).then(function (res){
			console.log(res);
			vm.userData = res.data;
		});
	}

	init();
}

ProfileController.$inject = ['ProfileService', '$stateParams'];
export { ProfileController };