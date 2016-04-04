// 
//  app.js  路由控制
//  <thinksns.m>
//  
//  Created by xiaolong on 2016-03-23.
//  Copyright 2016 xiaolong. All rights reserved.
// 

angular.module('starter', ['ionic','starter.controllers','starter.factory','starter.config','starter.user','starter.service','ngCordova'])

.run(function($ionicPlatform,$cordovaNetwork) {
	
    

  $ionicPlatform.ready(function() {
     if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
 
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
   //$ionicSideMenuDelegate.canDragContent(false);
   $ionicConfigProvider.views.swipeBackEnabled(false);
  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
 

  .state('tab.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('tab.my', {
      url: '/my',
      views: {
        'member': {
          templateUrl: 'templates/my.html',
          controller: 'MyhomeCtrl'
        }
      }
    })
    .state('tab.weibolists', {
      url: '/weibolists',
      views: {
        'menuContent': {
          templateUrl: 'templates/weibolists.html',
          controller: 'WeibolistsCtrl'
        }
      }
    })
   .state('tab.weibotopic', {
      url: '/weibotopic/:keys',
      views: {
        'menuContent': {
          templateUrl: 'templates/weibolists.html',
          controller: 'TopicCtrl'
        }
      }
    })
   .state('tab.login', {
      url: '/login',
      views: {
        'member': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
  .state('tab.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/weibolists');
});
