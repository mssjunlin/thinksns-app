// 
//  service.js
//  <thinsns.m 服务化>
//  
//  Created by xiaolong on 2016-03-23.
//  Copyright 2016 xiaolong. All rights reserved.
// 


angular.module('starter.service', [])
  .factory('Storage', function() {
    "use strict";
    return {
      set: function(key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data));
      },
      get: function(key) {

        return window.JSON.parse(window.localStorage.getItem(key));
      },
      remove: function(key) {
        return window.localStorage.removeItem(key);
      }
    };
  })
 .factory('Push', function() {
    var push;
    return {
      setBadge: function(badge) {
        if (push) {
          console.log('jpush: set badge', badge);
          plugins.jPushPlugin.setBadge(badge);
        }
      },
      setAlias: function(alias) {
        if (push) {
          console.log('jpush: set alias', alias);
          plugins.jPushPlugin.setAlias(alias);
        }
      },
      check: function() {
        if (window.jpush && push) {
          plugins.jPushPlugin.receiveNotificationIniOSCallback(window.jpush);
          window.jpush = null;
        }
      },
      init: function(notificationCallback) {
        console.log('jpush: start init-----------------------');
        push = window.plugins && window.plugins.jPushPlugin;
        if (push) {
          console.log('jpush: init');
          plugins.jPushPlugin.init();
          plugins.jPushPlugin.setDebugMode(true);
          plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;
          plugins.jPushPlugin.receiveNotificationIniOSCallback = notificationCallback;
        }
      }
    };
})
  .factory('CommonService', function($http, $rootScope, LXS, Storage) {

    return {
      getIOSVersion: function() {

        return $http.post(LXS.api + "/getIOSVersion.do")
          .success(function(data, status, headers, config) {


            $rootScope.$broadcast('lxs.IOSVersionUpdate', data);
          });
      },
      getAndroidVersion: function() {

        return $http.post(LXS.api + "/getAndroidVersion.do")
          .success(function(data, status, headers, config) {

            $rootScope.$broadcast('lxs.AndroidVersionUpdate', data);
          });
      }
    };
  })
//.directive('hideTabs',function($rootScope){
//  return {
//      restrict:'AE',
//      link:function($scope){
//          $rootScope.hideTabs = 'tabs-item-hide';
//          $scope.$on('$destroy',function(){
//              $rootScope.hideTabs = ' ';
//          })
//      }
//  }
//})
  .filter('link', function($sce) {
    return function(content) {
      if (typeof content === 'string') {
        var userLinkRegex = /href="\/user\/([\S]+)"/gi;
        var noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
        var externalLinkRegex = /href="((?!#\/user\/)[\S]+)"/gi;
        return $sce.trustAsHtml(
          content
          .replace(userLinkRegex, 'href="#/user/$1"')
          .replace(noProtocolSrcRegex, 'src="https://$1"')
          .replace(externalLinkRegex, "onClick=\"window.open('$1', '_blank', 'location=yes')\"")
        );
      }
      return content;
    };
  })
 