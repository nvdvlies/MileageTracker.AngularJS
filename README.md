MileageTracker.AngularJS
========================

Single Page Application to track your car trips built with AngularJS, which uses a ASP.NET Web API ([MileageTracker.AspNetWebApi](https://github.com/nvdvlies/MileageTracker.AspNetWebApi)) as the backend.

<p align="center">
	<img src="https://github.com/nvdvlies/MileageTracker.AngularJS/blob/master/assets/screenshot.png?raw=true"/>
</p>

### Install dependencies

	$ npm install
	$ bower install

### Start development environment

	$ gulp

### Build

	$ gulp build

### Unit testing

	$ gulp karma

### End to end testing

	$ webdriver-manager update
	$ webdriver-manager start
	$ gulp protractor