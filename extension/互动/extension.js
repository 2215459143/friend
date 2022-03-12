game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"互动",editable:false,content:function (config,pack){


    //添加全局技能
	lib.skill._hudong_kill={
		trigger:{global:"gameStart"},
		forced:true,
		priority:9999,
		content:function (){game.countPlayer2(function(current){
            game.me.addSkill('互动');
            current.addSkill('shoushang');
            
		});},
	};
    var staff=[];
    var staffshadow=[];
    j=0;
//主动丢花       pleyer.storage.xianhua==undefined
	if (config.CLZ) {
	lib.skill._互动={
        superCharlotte:true,
        enable:"phaseUse",
        content:function(event){3
            'step 0'
            event.target=[];
            'step 1'
            player.chooseTarget(1);
            'step 2'
            if(result.bool){
               event.target=result.targets[0];
               if(event.target.storage.xianhua==undefined){event.target.storage.xianhua=1}
               else event.target.storage.xianhua++;
            }
            'step 3'
            player.chooseControl('鲜花','美酒','鸡蛋','拖鞋','cancel2');
            'step 4'
            
            if (result.control=='鲜花') { 
                var name='flower';
                if(event.target.storage.xianhua<3){
                    for(var i=0;i<10;i++){
                        var time=Math.random()*180+i*180;
                        setTimeout(function(){
                            thrown(player,event.target,name,i);
                        },time);
                    }
                }
                else{           
                    for(var i=0;i<80;i++){
                        var time=Math.random()*90+i*90;
                        setTimeout(function(){
                            thrownmax(player,event.target,name,i);
                        },time);
                    }
                }     
            };

            if (result.control=='美酒') {
                var name='meijiu';
                if(event.target.storage.xianhua<3){
                    for(var i=0;i<10;i++){
                        var time=Math.random()*180+i*180;
                        setTimeout(function(){
                            thrown(player,event.target,name,i);
                        },time);
                    }
                }
                else{           
                    for(var i=0;i<80;i++){
                        var time=Math.random()*90+i*90;
                        setTimeout(function(){
                            thrownmax(player,event.target,name,i);
                        },time);
                    }
                }  
            };
            if (result.control=='鸡蛋') {
                var name='egg';
                if(event.target.storage.xianhua<3){
                    for(var i=0;i<10;i++){
                        var time=Math.random()*180+i*180;
                        setTimeout(function(){
                            thrown(player,event.target,name,i);
                        },time);
                    }
                }
                else{           
                    for(var i=0;i<80;i++){
                        var time=Math.random()*90+i*90;
                        setTimeout(function(){
                            thrownmax(player,event.target,name,i);
                        },time);
                    }
                }  
            };
            if (result.control=='拖鞋') {
                var name='tuoxie';
                if(event.target.storage.xianhua<3){
                    for(var i=0;i<10;i++){
                        var time=Math.random()*180+i*180;
                        setTimeout(function(){
                            thrown(player,event.target,name,i);
                        },time);
                    }
                }
                else{           
                    for(var i=0;i<80;i++){
                        var time=Math.random()*90+i*90;
                        setTimeout(function(){
                            thrownmax(player,event.target,name,i);
                        },time);
                    }
                } 
            };	        
        
            },
	};
	lib.translate._互动="菜篮子";
	}
//受伤丢花
	if (config.SSDH) {
	lib.skill.shoushang={
        trigger:{player:"damageEnd"},
        forced:true,
        superCharlotte:true,
        priority:Infinity,
		content:function(){2
		 "step 0"
		             if(trigger.source){
		      event.goto(1);
		    
		   }else{
		   
		   event.finish();
		  
		    }
		"step 1"
            for(var i=0;i<10;i++){
                var time=Math.random()*100+i*100;
                setTimeout(function(){
                    var r=[1,2,3,4,5].randomGet();
                    if(r==1) {para='egg';thrown(player,trigger.source,para,i);}//砸蛋
                    if(r==2) {para='tuoxie';thrown(player,trigger.source,para,i);}//拖鞋
                },time);
            }       
		}
	};
	lib.translate._shoushang="受伤丢花";
	}

//丢花函数
    //player起始位置，target末位置
    thrown=function(player,target,name,i){
        var t_m1=player.offsetTop+arena.offsetTop;
        var l_m1=player.offsetLeft+arena.offsetLeft;
        var t_m=player.offsetTop;
        var l_m=player.offsetLeft;
        var h=player.offsetHeight;
        var w=player.offsetWidth;
        var things=[];
        var thingsshadow=[];
        t_f=t_m1+h*0.5-50;
        l_f=l_m1+w*0.5-34;
        things[i]=ui.create.div('','<div style="top:'+(t_f-0.1*h+0.2*Math.random()*h)+'px;left:'+(l_f-0.1*w+0.2*Math.random()*w)+'px;z-index:9999"><img '+/*我添加的*/(name=="egg"?'class=hundongimg ':'')+'src="'+lib.assetURL+'extension/互动/' + name + '.png"></div>',ui.window);
        var tr=things[i].style.transform;
        var t_t1=target.offsetTop+arena.offsetTop;
        var l_t1=target.offsetLeft+arena.offsetLeft;
        var t_t=target.offsetTop;
        var l_t=target.offsetLeft;
        t_f1=t_t1+h*0.5-53;
        l_f1=l_t1+w*0.5-45;
        things[i].style['z-index']=9999;
        //我修改的，更改特效总时长为1秒
        things[i].style.transition="all 1s";
        tr+='translateY('+(t_t-t_m)+'px)';
        tr+='translateX('+(l_t-l_m)+'px)';
        things[i].style.transform=tr;
        //things[i].style.transform='rotate(10deg)'
        game.playAudio('..','extension','互动','Flying0'+['1','2','3'].randomGet());
        things[i].listenTransition(function(){
            game.playAudio('..','extension','互动',name+['1','2'].randomGet());
            things[i].hide();
            things[i].remove();
            things[i]=undefined;
            thingsshadow[i]=ui.create.div('','<div style="top:'+(t_f1-0.1*h+0.2*Math.random()*h)+'px;left:'+(l_f1-0.1*w+0.2*Math.random()*w)+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/' + name + '.shadow.png"></div>',ui.window);
            setTimeout(function(){
                thingsshadow[i].hide();
                thingsshadow[i].remove();
                thingsshadow[i]=undefined;
                // if(target!=game.me){
                //     var r=[1,2,3,4,5,6,7].randomGet();
                //     var time=Math.random()*400+100;
                //     setTimeout(function(){
                //         if(r==1) {
                //             if(name=='meijiu'&&name=='flower') returnf(target,player);
                //             else returne(target,player);
                //         }
                //         if(r==2) {
                //             if(name=='meijiu'&&name=='flower') returnm(target,player);
                //             else returnt(target,player);
                //         }
                //     },time);
                // }
            },1000);
        },400);
    };



    thrownmax=function(player,target,name,i){
        var t_m1=player.offsetTop+arena.offsetTop;
        var l_m1=player.offsetLeft+arena.offsetLeft;
        var t_m=player.offsetTop;
        var l_m=player.offsetLeft;
        var h=player.offsetHeight;
        var w=player.offsetWidth;
        var things=[];
        var thingsshadow=[];
        t_f=t_m1+h*0.5-50;
        l_f=l_m1+w*0.5-34;
        things[i]=ui.create.div('','<div style="top:'+(t_f-0.3*h+0.6*Math.random()*h)+'px;left:'+(l_f-0.3*w+0.6*Math.random()*w)+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/' + name + '.png"></div>',ui.window);
        var tr=things[i].style.transform;
        var t_t1=target.offsetTop+arena.offsetTop;
        var l_t1=target.offsetLeft+arena.offsetLeft;
        var t_t=target.offsetTop;
        var l_t=target.offsetLeft;
        t_f1=t_t1+h*0.5-53;
        l_f1=l_t1+w*0.5-45;
        things[i].style['z-index']=9999;
        tr+='translateY('+(t_t-t_m)+'px)';
        tr+='translateX('+(l_t-l_m)+'px)';
        things[i].style.transform=tr;
        // things.style.transform='rotate(10deg)'
        game.playAudio('..','extension','互动','Flying0'+['1','2','3'].randomGet());
        setTimeout(function(){
            game.playAudio('..','extension','互动',name+['1','2'].randomGet());
            thingsshadow[i]=ui.create.div('','<div style="top:'+(t_f1-0.3*h+0.6*Math.random()*h)+'px;left:'+(l_f1-0.3*w+0.6*Math.random()*w)+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/' + name + '.shadow.png"></div>',ui.window);
            setTimeout(function(){
                thingsshadow[i].remove();
                things[i].remove();
            },1000);
        },600);
    };




    returnf=function(player,target){
        var t_m1=player.offsetTop+arena.offsetTop;
        var l_m1=player.offsetLeft+arena.offsetLeft;
        var t_m=player.offsetTop;
        var l_m=player.offsetLeft;
        var h=player.offsetHeight;
        var w=player.offsetWidth;
        t_f=t_m1+h*0.5-50;
        l_f=l_m1+w*0.5-34;
        staff[j]=ui.create.div('','<div style="top:'+t_f+'px;left:'+l_f+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/flower.png"></div>',ui.window);
        var tr=staff[j].style.transform;
        var t_t1=target.offsetTop+arena.offsetTop;
        var l_t1=target.offsetLeft+arena.offsetLeft;
        var t_t=target.offsetTop;
        var l_t=target.offsetLeft;
        t_f1=t_t1+h*0.5-53;
        l_f1=l_t1+w*0.5-45;
        staff[j].style['z-index']=9999;
        tr+='translateY('+(t_t-t_m)+'px)';
        tr+='translateX('+(l_t-l_m)+'px)';
        staff[j].style.transform=tr;
        // things.style.transform='rotate(10deg)'
        game.playAudio('..','extension','互动','Flying0'+['1','2','3'].randomGet());
        setTimeout(function(){
            game.playAudio('..','extension','互动','flower'+['1','2'].randomGet());
            staffshadow[j]=ui.create.div('','<div style="top:'+t_f1+'px;left:'+l_f1+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/flower.shadow.png"></div>',ui.window);
            setTimeout(function(){
                staffshadow[j].remove();
                staff[j].remove();
            },600);
        },400);
        j++;
    };

    returne=function(player,target){
        var t_m1=player.offsetTop+arena.offsetTop;
        var l_m1=player.offsetLeft+arena.offsetLeft;
        var t_m=player.offsetTop;
        var l_m=player.offsetLeft;
        var h=player.offsetHeight;
        var w=player.offsetWidth;
        t_f=t_m1+h*0.5-50;
        l_f=l_m1+w*0.5-34;
        staff[j]=ui.create.div('','<div style="top:'+t_f+'px;left:'+l_f+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/egg.png"></div>',ui.window);
        var tr=staff[j].style.transform;
        var t_t1=target.offsetTop+arena.offsetTop;
        var l_t1=target.offsetLeft+arena.offsetLeft;
        var t_t=target.offsetTop;
        var l_t=target.offsetLeft;
        t_f1=t_t1+h*0.5-53;
        l_f1=l_t1+w*0.5-45;
        staff[j].style['z-index']=9999;
        tr+='translateY('+(t_t-t_m)+'px)';
        tr+='translateX('+(l_t-l_m)+'px)';
        staff[j].style.transform=tr;
        // things.style.transform='rotate(10deg)'
        game.playAudio('..','extension','互动','Flying0'+['1','2','3'].randomGet());
        setTimeout(function(){
            game.playAudio('..','extension','互动','egg'+['1','2'].randomGet());
            staffshadow[j]=ui.create.div('','<div style="top:'+t_f1+'px;left:'+l_f1+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/egg.shadow.png"></div>',ui.window);
            setTimeout(function(){
                staffshadow[j].remove();
                staff[j].remove();
            },600);
        },400);
        j++;
    };

    returnm=function(player,target){
        var t_m1=player.offsetTop+arena.offsetTop;
        var l_m1=player.offsetLeft+arena.offsetLeft;
        var t_m=player.offsetTop;
        var l_m=player.offsetLeft;
        var h=player.offsetHeight;
        var w=player.offsetWidth;
        t_f=t_m1+h*0.5-50;
        l_f=l_m1+w*0.5-34;
        staff[j]=ui.create.div('','<div style="top:'+t_f+'px;left:'+l_f+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/meijiu.png"></div>',ui.window);
        var tr=staff[j].style.transform;
        var t_t1=target.offsetTop+arena.offsetTop;
        var l_t1=target.offsetLeft+arena.offsetLeft;
        var t_t=target.offsetTop;
        var l_t=target.offsetLeft;
        t_f1=t_t1+h*0.5-53;
        l_f1=l_t1+w*0.5-45;
        staff[j].style['z-index']=9999;
        tr+='translateY('+(t_t-t_m)+'px)';
        tr+='translateX('+(l_t-l_m)+'px)';
        staff[j].style.transform=tr;
        // things.style.transform='rotate(10deg)'
        game.playAudio('..','extension','互动','Flying0'+['1','2','3'].randomGet());
        setTimeout(function(){
            game.playAudio('..','extension','互动','meijiu'+['1','2'].randomGet());
            staffshadow[j]=ui.create.div('','<div style="top:'+t_f1+'px;left:'+l_f1+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/meijiu.shadow.png"></div>',ui.window);
            setTimeout(function(){
                staffshadow[j].remove();
                staff[j].remove();
            },600);
        },400);
        j++;
    };


    returnt=function(player,target){
        var t_m1=player.offsetTop+arena.offsetTop;
        var l_m1=player.offsetLeft+arena.offsetLeft;
        var t_m=player.offsetTop;
        var l_m=player.offsetLeft;
        var h=player.offsetHeight;
        var w=player.offsetWidth;
        t_f=t_m1+h*0.5-50;
        l_f=l_m1+w*0.5-34;
        staff[j]=ui.create.div('','<div style="top:'+t_f+'px;left:'+l_f+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/tuoxie.png"></div>',ui.window);
        var tr=staff[j].style.transform;
        var t_t1=target.offsetTop+arena.offsetTop;
        var l_t1=target.offsetLeft+arena.offsetLeft;
        var t_t=target.offsetTop;
        var l_t=target.offsetLeft;
        t_f1=t_t1+h*0.5-53;
        l_f1=l_t1+w*0.5-45;
        staff[j].style['z-index']=9999;
        tr+='translateY('+(t_t-t_m)+'px)';
        tr+='translateX('+(l_t-l_m)+'px)';
        staff[j].style.transform=tr;
        // things.style.transform='rotate(10deg)'
        game.playAudio('..','extension','互动','Flying0'+['1','2','3'].randomGet());
        setTimeout(function(){
            game.playAudio('..','extension','互动','tuoxie'+['1','2'].randomGet());
            staffshadow[j]=ui.create.div('','<div style="top:'+t_f1+'px;left:'+l_f1+'px;z-index:9999"><img src="'+lib.assetURL+'extension/互动/tuoxie.shadow.png"></div>',ui.window);
            setTimeout(function(){
                staffshadow[j].remove();
                staff[j].remove();
            },600);
        },400);
        j++;
    };
//我添加的
	var style=document.createElement("style");
	style.innerHTML=`
		img.hundongimg{
			animation:hudongxz .4s infinite ease-out;
		}
		
		@keyframes hudongxz{
			from{
				transform:rotate(0deg);
			}
			to{
				transform:rotate(1080deg);
			}
		}
	`;
	document.head.appendChild(style);
	window.hudongcss=style;
},precontent:function (){
},config:{
    
    CLZ: {
				init: false,
				intro: "自己回合内显示",
				name: "菜篮子"
			},
    SSDH: {
				init: false,
				intro: "场上角色受伤会触发自动触发菜篮子效果，可能引起卡顿",
				name: "受伤丢花"
			},
},help:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:"",
    author:"",
    diskURL:"",
    forumURL:"",
},files:{"character":[],"card":[],"skill":[]}}})