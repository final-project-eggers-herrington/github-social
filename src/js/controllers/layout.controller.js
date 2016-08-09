function LayoutController (LayoutService) {
	let vm = this;
	vm.viewProfile = viewProfile;
	vm.search = search;
	
	function viewProfile () {
		LayoutService.viewProfile();
	}

	function search (search) {
		LayoutService.search(search);
	}

}

LayoutController.$inject = ['LayoutService'];
export { LayoutController };