// 
//  config.js
//  <thinksns.m>
//  
//  Created by xiaolong on 2016-03-23.
//  Copyright 2016 xiaolong. All rights reserved.
// 
var hosts = "http://demo.thinksns.com/ts4/";
angular.module("starter.config", [])
    .constant("EVN", {
        // "name": "production",
        "accessToken": '',
        "debug": false,       
        'public_timeline':hosts+"index.php?app=api&mod=WeiboStatuses&act=public_timeline",  //获取公共微博
        'friends_timeline':hosts+"index.php?app=api&mod=WeiboStatuses&act=friends_timeline",  //获取关注人微博      
        //'user_timeline':hosts+"index.php?app=api&mod=WeiboStatuses&act=user_timeline",  //获取某人的微博线，get:uid
        
        
        'user_timeline':hosts+"api.php?mod=Weibo&act=user_timeline",
        'userinfo':hosts+"api.php?mod=User&act=show",
        'login':hosts+"api.php?mod=Oauth&act=authorize",
        'post':hosts+"api.php?mod=Weibo&act=post_weibo",//发条微博
        'add_digg':hosts+"index.php?app=api&mod=WeiboStatuses&act=add_digg",//赞某条微博
        'show':hosts+"index.php?app=api&mod=WeiboStatuses&act=show",//获取某条微博详情
        'repost':hosts+"index.php?app=api&mod=WeiboStatuses&act=repost",//转发
        'comments':hosts+"index.php?app=api&mod=WeiboStatuses&act=comments",//获取评论列表    
    })
;