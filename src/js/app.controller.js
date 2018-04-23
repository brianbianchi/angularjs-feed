(function (angular) {
  'use strict';

  angular.module('feedApp')
    .controller('FeedController', ['FeedService', function (Feed) {

      var feed = this;

      feed.subs = [];
      feed.pages = [];
      feed.popular = [
        { title: 'Reddit Front Page', url: 'https://www.reddit.com/.rss' },
        { title: '/r/programming', url: 'https://www.reddit.com/r/programming/.rss' },
        { title: 'Hacker News', url: 'https://news.ycombinator.com/rss' },
        { title: 'A List Apart', url: 'https://feeds.feedburner.com/alistapart/main' },
        { title: 'NetTuts+', url: 'https://feeds.feedburner.com/nettuts' },
        { title: 'DZone', url: 'https://feeds.dzone.com/home?format=rss' },
        { title: 'The Guardian', url: 'https://www.theguardian.com/international/rss' },
        { title: 'NY Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
        { title: 'Casey Neistat', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCtinbF-Q-fVthA0qrFQTgXQ' },
      ];

      feed.addFeed = function (feedurl) {
        feed.subs.push({ title: '', url: feedurl });
        feed.feedUrl = '';
        feed.displayFeed();
        angular.forEach(feed.popular, function (popPage) {
          angular.forEach(feed.subs, function (subPage) {
            if (popPage.url == subPage.url) {
              feed.removeFeed(popPage, 'popular');
            }
          });
        });
      };

      feed.removeFeed = function (removePage, arr) {
        if (arr == 'subs') {
          var oldArr = feed.subs;
          feed.subs = [];
          angular.forEach(oldArr, function (page) {
            if (page != removePage) {
              feed.subs.push(page);
            }
          });
          feed.displayFeed();
        }
        else if (arr == 'popular') {
          var oldArr = feed.popular;
          feed.popular = [];
          angular.forEach(oldArr, function (page) {
            if (page.url != removePage.url) {
              feed.popular.push(page);
            }
          });
        }
      };

      feed.displayFeed = function () {
        feed.pages = [];
        angular.forEach(feed.subs, function (key, val) {
          Feed.parseFeed(key.url)
            .then(function (res) {
              if (res.status == "ok") {
                feed.pages.push(res);
                key.title = res.feed.title;
              } else {
                alert("You have inserted an invalid rss url.");
                feed.removeFeed(key, 'subs');
              }
            });
        });
        console.log(feed.pages);
        console.log(feed.subs);
      }

      feed.displayFeed();

    }]);

})(angular);