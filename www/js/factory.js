// 
//  factory.js
//  <thinksns.pro>
//  
//  Created by xiaolong on 2016-03-22.
//  Copyright 2016 xiaolong. All rights reserved.
// 
angular.module('starter.factory', [])
	.factory('Weibofactory', function($rootScope, $http, $ionicLoading,EVN,Storage) {
			var weiboLists = {};
			var storageKey = 'Thinksns_user';
			var user = Storage.get(storageKey) || {};
			return {
				public_timeline: function() {
//					$ionicLoading.show();
					$http.get(EVN.public_timeline).success(function(data) {　　　　
						weiboLists = data;
						$rootScope.$broadcast('starter.getBinddata', weiboLists);　　
					});
				},
				user_timeline : function() {
					$ionicLoading.show();
					$http.get(EVN.user_timeline+'&oauth_token='+user.oauth_token+'&oauth_token_secret='+user.oauth_token_secret+'&uid='+user.uid).success(function(data) {　　　　
						weiboLists = data;
						$ionicLoading.hide();
						$rootScope.$broadcast('starter.getUser_timeline', weiboLists);　　
					});
				},
				getUser_timeline: function() {
					var fromtext = [{name: '微博'}, {name: 'normal'}, {name: 'android'}, {name: 'iPhone'}],
					reg = "/\#([^\#|.]+)\#/g";
					for (var i in weiboLists) {
						weiboLists[i].content = weiboLists[i].content.replace(/\#([^\#|.]+)\#/g, function(word) {
							return '<a href="#/app/weibotopic/'+word+'">' + word + '</a>';
						}).replace(/\[(.+?)\]/g,'<img src="smilies/$1.gif" border="0" class="smilies"/>')
					}	
					
				    return weiboLists;
			   },
				getData: function() {
					var fromtext = [{name: '微博'}, {name: 'normal'}, {name: 'android'}, {name: 'iPhone'}],
					reg = "/\#([^\#|.]+)\#/g";
					for (var i in weiboLists) {
						weiboLists[i].from = fromtext[weiboLists[i].from].name;					
						weiboLists[i].content = weiboLists[i].content.replace(/\#([^\#|.]+)\#/g, function(word) {
							return '<a href="#/app/weibotopic/'+word+'">' + word + '</a>';
						}).replace(/\[(.+?)\]/g,'<img src="smilies/$1.gif" border="0" class="smilies"/>')
					}	
				return weiboLists;
			   },
		}
	})
	.factory('PostWeibo', function($rootScope, $http, $ionicLoading,EVN,User) {
			var weiboLists = {};
			var currentUser =  User.getCurrentUser();
			return {
				post: function(content) {					
					$http.get(EVN.post+'&content='+content+'&from=3&oauth_token='+currentUser.oauth_token+'&oauth_token_secret='+currentUser.oauth_token_secret+'').success(function(data) {　　　　
						if(data.status>0){
						   $rootScope.$broadcast('starter.ClosePostbox', data);　　							
						}else{
							$ionicLoading.show({
		                        noBackdrop: true,
		                        template: '错误',
		                        duration: 3000
	                         });
						}

					});
				},
				
			}
		
	})