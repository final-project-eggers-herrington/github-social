import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';

import { config } from './utilities/config';
import { SERVER } from './utilities/servers/server';
import { GITHUB } from './utilities/servers/github.server'

import { HomeController }     from './controllers/home.controller';
import { LayoutController }   from './controllers/layout.controller';
import { LoginController }    from './controllers/login.controller';
import { ProfileController }  from './controllers/profile.controller';
import { RegisterController } from './controllers/register.controller';

// Import services
import { LoginService } from './services/login.service';
import { RegistrationService } from './services/registration.service'
import { ProfileService } from './services/profile.service'
import { LayoutService } from './services/layout.service'
import { HomeService } from './services/home.service'

angular
	.module('app', ['ui.router', 'ngCookies'])
	.config(config)
	.constant('SERVER', SERVER)
	.constant('GITHUB', GITHUB)
	.controller('HomeController',     HomeController)
	.controller('LayoutController',   LayoutController)
	.controller('LoginController',    LoginController)
	.controller('ProfileController',  ProfileController)
	.controller('RegisterController', RegisterController)
	.service('LoginService', LoginService)
	.service('RegistrationService', RegistrationService)
	.service('ProfileService', ProfileService)
	.service('LayoutService', LayoutService)
	.service('HomeService', LayoutService)
;