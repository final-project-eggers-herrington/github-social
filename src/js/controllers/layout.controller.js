function LayoutController (LayoutService) {
	let vm = this;
	vm.viewProfile = viewProfile;
	
	function viewProfile () {
		LayoutService.viewProfile();
	}

}

LayoutController.$inject = ['LayoutService'];
export { LayoutController };