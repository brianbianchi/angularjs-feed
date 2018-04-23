(function (angular) {
  'use strict';

  angular
    .module('feedApp')
    .factory('FeedService', ['$http', function ($http) {
      return {
        parseFeed: function (url) {
          return $http.jsonp('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url))
            .then(function successCallback(res) {
              return res.data;
            }, function failureCallback(res) {
              return res.data;
            });
        }
      }
    }]);

})(angular);