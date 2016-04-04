// 
//  controllers.js
//  <thinksns.m>
//  
//  Created by xiaolong on 2016-03-23.
//  Copyright 2016 xiaolong. All rights reserved.
// 
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state,$ionicModal,$cordovaNetwork, $ionicLoading,$timeout,$cordovaHealthKit,PostWeibo,User) {
    var currentUser =  User.getCurrentUser();
    $scope.uid = currentUser.uid || null;
    
    //console.log($scope.uid)
    var tc = new Date().toLocaleDateString()
    console.log(new Date(Date.parse(tc) - 1*24*60*60*1000));
    console.log(new Date(new Date().getTime()-2*24*60*60*1000));
	$scope.loginData = {};

	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});
	
	
	$scope.d = function(){
		$cordovaHealthKit.findWorkouts().then(function(gender) {
  // valuea
  alert(gender)
}, function(err) {
});
	}
	if(!$scope.uid){
       $state.go('tab.login');
       return false;
    }
    
    console.log(currentUser)
	$scope.uname = currentUser.uname;
	

	
	$scope.login = function() {
		$scope.modal.show();
	};
	
	 $scope.logout = function(){
    	      User.logout()
       }
	
	$scope.$on('starter.Needlogin', function() {      
       	   $scope.modal.show();
     });
       
	 $scope.newNewWeiboData = {content: '' };
	 $scope.saveNewWeibo = function(){
		//console.log($scope.newNewWeiboData)
		PostWeibo.post($scope.newNewWeiboData.content)
	 }
})

.controller('WeibolistsCtrl', function($scope, $state,$ionicModal,$stateParams, $ionicLoading,Weibofactory,User) {
	   /* common  */
	  //
	   var currentUser =  User.getCurrentUser();
    $scope.uid = currentUser.uid || null;
          $ionicModal.fromTemplateUrl('templates/newWeibo.html', {
		scope: $scope
	}).then(function(modald) {
		$scope.newWeibo = modald;
	});

	$scope.NewWeibo = function(){	
	  //var n = $cordovaNetwork.getNetwork()
      //alert(33)
      $scope.newWeibo.show();
	}
	
	$scope.closePostWeibo = function(){
		
		$scope.newWeibo.hide();
	}
	
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};
       
       
       
		Weibofactory.public_timeline();
		$scope.$on('starter.getBinddata', function() {      
            $scope.weibolists = Weibofactory.getData();    
            $ionicLoading.hide()
        });
        
        $scope.$on('starter.goListback', function() {      
            $scope.doRefresh();
        });
         $scope.$on('starter.ClosePostbox', function() { 
         	$scope.newWeibo.hide();
            $scope.doRefresh();
            
        });
        
        
        $scope.doRefresh = function(){
        	       Weibofactory.public_timeline();        	      
        	       $scope.$broadcast('scroll.refreshComplete');
        }
       
})

.controller('PlaylistCtrl', function($scope, $stateParams) {})
.controller('LoginCtrl', function($scope,$state,$rootScope,$timeout,$stateParams,$ionicNavBarDelegate,$ionicScrollDelegate,$cordovaBarcodeScanner,$cordovaTouchID,User,Weibofactory) {
	$ionicNavBarDelegate.showBar(false);
	$ionicScrollDelegate.resize()
	$scope.$on('starter.DologinCallback', function() {      
         $state.go('tab.weibolists');		
    });
    $scope.$on('$ionicView.beforeEnter', function() {
      $rootScope.hideTabs = 'tabs-item-hide';
    });
    
        
    $scope.loginData = {username: '',password:'' };
    $scope.doLogin = function(){
    	    if(!$scope.loginData.username){
    	    	    $ionicLoading.show({
		                        noBackdrop: true,
		                        template: '请输入用户名',
		                        duration: 1200
	                         });
	         return false;
    	    }
    	    if(!$scope.loginData.password){
    	    	    $ionicLoading.show({
		                        noBackdrop: true,
		                        template: '请输入密码',
		                        duration: 1200
	                         });
	        return false;                 
    	    }
    	    User.doLoginget($scope.loginData);
    }
      
//  二维码扫描登录	
//	$scope.scanBarcode = function() {
//		$cordovaBarcodeScanner.scan().then(function(imageData) {
//			alert(imageData.text);
//			console.log("Barcode Format -> " + imageData.format);
//			console.log("Cancelled -> " + imageData.cancelled);
//		});
//  }
// Touch ID
   $scope.supported = function(){
		$cordovaTouchID.authenticate("使用Touch id解锁ThinkSNS").then(function(d) {
		  // success, TouchID supported
		  alert(d)
		}, function (error) {
		  alert(error); // TouchID not supported
		});
   }
})
.controller('LeftSilderCtrl', function($scope, $ionicSideMenuDelegate) {
	//$ionicSideMenuDelegate.canDragContent(false)
})
.controller('MyhomeCtrl', function($scope, $http,$stateParams,$ionicNavBarDelegate,User,EVN,Weibofactory) {
	$scope.$on('$ionicView.afterEnter', function() {
	   $ionicNavBarDelegate.showBar(true);
	})   
	var user =  User.getCurrentUser();
	$scope.user = User.getCurrentUser();
	$http.get(EVN.userinfo+'&oauth_token='+user.oauth_token+'&oauth_token_secret='+user.oauth_token_secret+'&uid='+user.uid).success(function(otherdata) {　　
			$scope.userinfo = 　	otherdata;
    })
	Weibofactory.user_timeline();
		$scope.$on('starter.getUser_timeline', function() { 
//			$ionicLoading.hide()
            $scope.weibolists = Weibofactory.getUser_timeline();    
            console.log($scope.weibolists)
        });
});