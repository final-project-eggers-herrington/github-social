import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';

import { config } from './utilities/config';
import { SERVER } from './utilities/servers/server';
import { GITHUB } from './utilities/servers/github.server'

// Import controllers
import { HomeController }       from './controllers/home.controller';
import { LayoutController }     from './controllers/layout.controller';
import { LoginController }      from './controllers/login.controller';
import { ProfileController }    from './controllers/profile.controller';
import { RegisterController }   from './controllers/register.controller';
import { SearchPageController } from './controllers/searchpage.controller';
import { RepoController }       from './controllers/repo.controller';
import { Error404Controller }   from './controllers/error404.controller';

// Import services
import { LoginService }        from './services/login.service';
import { RegistrationService } from './services/registration.service';
import { ProfileService }      from './services/profile.service';
import { LayoutService }       from './services/layout.service';
import { HomeService }         from './services/home.service';
import { SearchPageService }   from './services/searchpage.service';
import { RepoService }         from './services/repo.service';
import { Error404Service }     from './services/error404.service';

angular
	.module('app', ['ui.router', 'ngCookies'])
	.config(config)
	.constant('SERVER', SERVER)
	.constant('GITHUB', GITHUB)
	.controller('HomeController',       HomeController)
	.controller('LayoutController',     LayoutController)
	.controller('LoginController',      LoginController)
	.controller('ProfileController',    ProfileController)
	.controller('RegisterController',   RegisterController)
	.controller('SearchPageController', SearchPageController)
	.controller('RepoController',       RepoController)
	.controller('Error404Controller',   Error404Controller)
	.service('LoginService',        LoginService)
	.service('RegistrationService', RegistrationService)
	.service('ProfileService',      ProfileService)
	.service('LayoutService',       LayoutService)
	.service('HomeService',         HomeService)
	.service('SearchPageService',   SearchPageService)
	.service('RepoService',         RepoService)
	.service('Error404Service',     Error404Service)
;