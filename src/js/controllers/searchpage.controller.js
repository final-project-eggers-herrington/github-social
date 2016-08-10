function SearchPageController ($stateParams, SearchPageService) {
	let vm = this;

	let searchTerm = $stateParams.searchquery
	SearchPageService.secondSearch(searchTerm).then(function(res) {
		vm.searchItems = res.data.items;
		console.log(vm.searchItems)
	})
}

SearchPageController.$inject = ['$stateParams', 'SearchPageService'];
export { SearchPageController }