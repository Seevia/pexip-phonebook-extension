angular.module('pexapp.popup')
  .factory('externalPhonebook', function(){
		return {
			init: function(htmlElement, options, cb) {
				htmlElement.innerHTML = '<p>Hello from extension, closes in 2 secs</p>';
				setTimeout(cb.bind(null, '', {}),2000);
			}
		}
		
	});
