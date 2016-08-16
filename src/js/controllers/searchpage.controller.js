import $ from 'jquery';

function SearchPageController ($stateParams, SearchPageService, $cookies) {
	let vm = this;
	vm.toggleClass = toggleClass;
	vm.postSubmit  = postSubmit;
	vm.searchItems = {};

	let limit = 20;
	vm.limit = limit;

	function viewMore () {
		vm.limit + 20;
		console.log(vm.limit)
	}

	let searchTerm = $stateParams.searchquery;

	SearchPageService.secondSearch(searchTerm).then(function(res) {
		console.log(res)
		vm.searchItems = res.data.items;
		// console.log(vm.searchItems);
	})

	function toggleClass () {

	}

	function postSubmit (search) {
		let obj = {}

		obj.description   = search.description;
		obj.title         = search.name;
		obj.language      = search.language;
		obj.oc_login      = search.owner.login;
		obj.oc_url        = search.owner.html_url;
		obj.repo_url      = search.html_url;
		obj.create_date = search.created_at;

		console.log(obj)

		SearchPageService.postItem(obj).then( res => {
			console.log(res)
		});
	}
}

SearchPageController.$inject = ['$stateParams', 'SearchPageService', '$cookies'];
export { SearchPageController }