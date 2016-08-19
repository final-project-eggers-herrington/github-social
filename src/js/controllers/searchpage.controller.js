import $ from 'jquery';

function SearchPageController ($stateParams, SearchPageService, $cookies, $state) {
	let vm = this;
	vm.postSubmit  = postSubmit;
	vm.viewMore = viewMore;
	vm.searchItems = {};

	let limit = 20;
	vm.limit = limit;

	vm.popupOpen  = popupOpen;
	vm.popupClose = popupClose;

	function viewMore () {
		vm.limit = vm.limit + 20;
	}

	let searchTerm = $stateParams.searchquery;

	SearchPageService.secondSearch(searchTerm).then(function(res) {
		vm.searchItems = res.data.items;
		vm.searchItems.forEach(function (datum){
			datum.shown = false;
		})
	})

	function postSubmit (search, searchform) {
		let obj = {}

		obj.description      = search.description;
		obj.title            = search.name;
		obj.language         = search.language;
		obj.oc_login         = search.owner.login;
		obj.oc_url           = search.owner.html_url;
		obj.repo_url         = search.html_url;
		obj.create_date      = search.created_at;
		obj.user_description = searchform.user_description;

		SearchPageService.postItem(obj).then( function (res) {
			$state.go('root.repo-single', {repoid: res.data.id});
		})
	}

	function popupOpen (obj) {
		obj.shown = true;
	}

	function popupClose (obj) {
		obj.shown = false;
	}
}

SearchPageController.$inject = ['$stateParams', 'SearchPageService', '$cookies', '$state'];
export { SearchPageController }