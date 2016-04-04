// 
//  factory.js
//  <thinksns.pro>
//  
//  Created by xiaolong on 2016-03-22.
//  Copyright 2016 xiaolong. All rights reserved.
// 
angular.module('starter.user', [])
	.factory('User', function($rootScope, $http, EVN,Storage,$ionicLoading) {
			var storageKey = 'Thinksns_user';
			var user = Storage.get(storageKey) || {};
			return {
				logout:function(){
					 user = {};
                     Storage.remove(storageKey);
                     $rootScope.$broadcast('starter.Needlogin',user);　
				},
				getCurrentUser: function() {
					return user;
                },
                doLoginget:function($loginData){
                	  var uname = $loginData.username;
                	  var password = $loginData.password;
                	  $http.get(EVN.login+'&login='+uname+'&password='+password).success(function(data) {　　　　
						if(data.uid){
							$http.get(EVN.userinfo+'&oauth_token='+data.oauth_token+'&oauth_token_secret='+data.oauth_token_secret+'&uid='+data.uid).success(function(otherdata) {　　
							  user.avatar = otherdata.avatar;
							  user.uname = otherdata.uname;					  
							  user.uid = data.uid
							  user.oauth_token = data.oauth_token;
							  user.oauth_token_secret = data.oauth_token_secret;
							  console.log(user)
							  Storage.set(storageKey, user);
						      $rootScope.$broadcast('starter.DologinCallback',user);　　	
						    })
						}else{
							$ionicLoading.show({
		                        noBackdrop: true,
		                        template:data.msg,
		                        duration: 1100
	                         });
						}

					});
                }
		     }
	})
