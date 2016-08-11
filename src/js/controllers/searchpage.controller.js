import $ from 'jquery';

function SearchPageController ($stateParams, SearchPageService, $cookies) {
	let vm = this;
	vm.toggleClass = toggleClass;
	vm.postSubmit = postSubmit;

	let searchTerm = $stateParams.searchquery;

	// function search(term) 

	SearchPageService.secondSearch(searchTerm).then(function(res) {
		vm.searchItems = res.data.items;
		console.log(vm.searchItems);
	})

	function toggleClass () {

	}

	function postSubmit (search) {
		let obj = {}

		obj.description      = search.description;
		obj.name             = search.name;
		obj.language         = search.language;
		obj.original_creator = search.owner.login;
		obj.creation_date    = search.created_at;
		obj.poster           = $cookies.get('github_account') ? $cookies.get('github_account') : null ;

		SearchPageService.postItem(obj);
	}

}

SearchPageController.$inject = ['$stateParams', 'SearchPageService', '$cookies'];
export { SearchPageController }