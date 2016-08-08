function LoginService ($http, SERVER, $cookies, $state) {

this.login = login

function login (user) {
    $http.post(SERVER.URL + 'login', user).then( res => {
      $cookies.put('access_token', res.data.access_token);
      console.log("login service ran! : ", res)
      // $state.go('profile'); ENDPOINT AFTER LOGIN IS TO BE DECIDED
    });
  }
}

LoginService.$inject = ['$http', 'SERVER', '$cookies', '$state'];
  export { LoginService };
