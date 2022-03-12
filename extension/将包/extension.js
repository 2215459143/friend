game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"将包",content:function(config,pack){

/*game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"无名扩展",content:function(config,pack){},
函数执行时机为游戏数据加载之后、界面加载之前。参数1扩展选项（见选项代码）；参数2为扩展定义的武将、卡牌和技能等（可在此函数中修改）
precontent:function(){},
函数执行时机为游戏数据加载之前，且不受禁用扩展的限制，除添加模式外请慎用
config:{"switcher_example":{"name":"示例列表选项","init":"2","item":{"1":"一","2":"二"}},
"toggle_example":{"name":"示例开关选项","init":true}},
此例中传入的主代码函数的默认参数为{switcher_example:"2",toggle_example:true}
help:{"帮助条目":"帮助内容将显示在菜单－选项－帮助中"},*/

//注意所有的XXX改成自己定的名称，为拼音，应一致，小xxx不要改
/*//武将评级
    //传说
    lib.rank.rarity.legend.addArray(["XXX_zuoci"]);
    //史诗
    lib.rank.rarity.epic.addArray([]);
    //稀有
    lib.rank.rarity.rare.addArray([]);
    //平凡
    lib.rank.rarity.junk.addArray([]);
//阵亡语音
    lib.skill._lqq_die_audio = {
        trigger: { player: 'dieBegin' },
        priority: 2,
        forced: true,
        unique: true,
        popup: false,
        filter: function (event, player) {
          return player.name.includes('XXX');
        },
        content: function () {
          game.playAudio('..', 'extension', '扩展包名','audio', trigger.player.name);
        },
      };
*/

/*//扩展技
          lib.skill._XXX_faze={
          nobracket:true,
          delay:false,
          direct:true,
          trigger:{global:"gameStart",},
          unique:true,
          charlotte:true,
          priority:Infinity,
          filter:function (event,player){
              var ssj=new RegExp("XXX");
              return ssj.test(player.name);},
          forced:true,
          locked:true,
          content:function (event,player){if(lib.config.mode=='identity'&&player.isZhu){
                  player.maxHp++;
                  game.log('扩展技','：',player,'为','主公','额外增加一点体力上限且无法受到','延时锦囊牌','的影响');
                  player.update();}
              else{game.log('扩展技','：',player,'无法受到','延时锦囊牌','的影响');player.update();}},
          mod:{targetEnabled:function (card,player,target,now){
                  var ssj=new RegExp("XXX");//注意此处，
                  if(get.type(card)=='delay'&&ssj.test(target.name)){
                      return false;}},},
          group:"_XXX_faze_judge",//注意此处
          subSkill:{judge:{trigger:{player:"phaseBefore",},
                  filter:function (event,player){
                      var ssj=new RegExp("XXX");//注意此处
                      return ssj.test(player.name);},
                  delay:false,
                  direct:true,
                  forced:true,
                  locked:true,
                  unique:true,
                  charlotte:true,
                  priority:Infinity,
                  content:function (){player.chooseToDiscard('j',Infinity,true);player.skip('phaseJudge');}},},};*/
   
/*},
precontent:function(XXX){
//适配千幻
   window.XXX_import=function(func){//注意此处
        func(lib,game,ui,get,ai,_status);
    };
    lib.init.js(lib.assetURL +'extension/扩展包名/skin.js',null);*/

//添加卡牌包的方法一
/*所有的name改成自己定义的名字
    if(syp.enable){game.import('card',function(){
        var name={
            name:'name',
            connect:true,
        card:{
            "name":{
                type:"leixing",
                enable:true,
                filterTarget:true,
                content:function(){target.draw()},
                ai:{order:1,
                    result:{target:1,},},
                fullimage:true,
                           },
                 },
           translate:{
            "name":"牌名",
            "name_info":"介绍",          
       //卡牌种类
       "leixing":"基本牌，自己定义",
       },
       //牌堆编辑
        list:[['heart',1,'1'],['花色',花色数字,'name']],
    }
        return name;});
       //打开关闭卡牌包
    lib.translate['name_card_config'] = "卡牌包名字";
    lib.config.all.cards.push('name');
        if(lib.config.nameCardOpen === undefined){lib.config.cards.push('name');lib.config.nameCardOpen = true;}
        else if(lib.config.cards.contains('name')){lib.config.nameCardOpen = true;}
               else{lib.config.nameCardOpen = false;}
    game.saveConfig('nameCardOpen',lib.config.nameCardOpen);
    if(!lib.config.cards.contains('name')) lib.config.cards.remove('name');
*/

//添加武将包方法一
/*      if(XXX.enable){game.import("character",function(){
             var XXX={
                 name:"XXX",
                 connect:true,
                 characterSort:{//武将分栏
                     XXX:{"XXX_wei":["XXX_caocao"],}
                                        },
                 character:{//武将
                     "XXX_zuoci":["male","qun",4,["XXX_Zhuanhua"],["die_audio"]],
                               "角色":["男女","势力",血量,["技能"],["死亡语音"]],
                                 },
        characterIntro:{
            "XXX_zhaoyun":"角色简介",
                                },
                 characterTitle:{
                     "XXX_zuoci":"角色称号",
                                        },
                 skill:{//技能代码},
                 translate:{
                     //角色分栏
                     "XXX_shen":"神话再临",
                     //角色名称
                     "XXX_zuoci":"左慈",
                     //技能部分（名称，技能叙述）
                     XXX_Zhuanhua:"幻化",
                     "XXX_Zhuanhua_info":"锁定技，你可以...", 
                               },
                           }
//小xxx不要改
if(lib.config.xxx&&lib.config.xxx.contains('武将A')){XXX.character.武将A=["female","dpcq",3,["skill"],[]];}
if(lib.device||lib.node){for(var i in XXX.character){XXX.character[i][4].push('ext:扩展包名/image/character/'+i+'.jpg');}}
      else{for(var i in arknights_character.character){XXX.character[i][4].push('db:extension-扩展包名:'+i+'.jpg');}}
		return XXX;});
//打开关闭武将包
	lib.config.all.characters.push('XXX');
	if(lib.config.characters&&!lib.config.characters.contains('XXX')) lib.config.characters.remove('XXX');
                lib.translate['XXX_character_config']="角色包名";
*/

/*添加武将包方法二
     if (config.WY) {
               game.addCharacterPack({
                   character: {//配置角色
                    //-----------角色-------------//
             },
                   translate: {//翻译
           //-----------角色名-------------//
            //-----------技能名-------------//
                   },
                   skill: {
           // -----------技能-------------//
                           }
                                                         },"XX包");}
      config: {"WY": {"name": "【XX包】", "init": true}},*/

/*添加卡牌包方法二
     if (config.AB) {
               game.addCardPack({
                   card: {//配置卡牌
                    //-----------卡牌-------------//
             },
                   translate: {//翻译
           //-----------卡牌名-------------//
            //-----------技能名-------------//
                   },
                   skill: {
           // -----------技能-------------//
         }
},"XX包");}
      config: {"AB": {"name": "【XX包】", "init": true}},*/

/*方法三：无名杀内给扩展添加武将和卡牌会到这里
package:{
//扩展定义的武将、卡牌和技能
character:{//武将
        character:{
            "AA":["male","wei",1,["ark_shanbi"],["des:1"]],
        },translate:{
            "AA":"啊",
        },},  
card:{//卡牌
        card:{
            "啊啊":{
                type:"basic",
                enable:true,
                filterTarget:true,
                content:function(){target.draw()},
                ai:{order:1,result:{target:1,},},fullimage:true,
                      },
               }, 
           translate:{//卡牌名称     
            "啊啊":"啊啊",
            "啊啊_info":"啊",
                     },list:[],
        },    
skill:{//技能
        skill:{
            "啊":{
                trigger:{player:"phaseJieshuBegin",},
                frequent:true,
                content:function(){player.draw()},
              },},
        translate:{//技能名称
            "啊":"啊",
            "啊_info":"啊",
     },},
},*/

// 界面缩放
		    lib.configMenu.appearence.config.ui_zoom={
				name:'界面缩放',
				unfrequent:true,
				init:'normal',
				item:{
					normalw:'170%',
					normalv:'165%',
					normalu:'160%',
					normalt:'155%',
					normals:'150%',
					normalr:'145%',
					normalq:'140%',
					normalp:'135%',
					normala:'130%',
					normalb:'125%',
					normalc:'120%',
					normald:'115%',
					normale:'110%',
					normalf:'105%',
					normal:'100%',
					normalg:'95%',
					normalh:'90%',
					normali:'85%',
					normalj:'80%',
					normalk:'75%',
					normall:'70%',
					normalm:'65%',
					normaln:'60%',
					normalo:'55%',
				},
				onclick:function(zoom){
					game.saveConfig('ui_zoom',zoom);
					switch(zoom){
						case 'normalw':zoom=1.7;break;
						case 'normalv':zoom=1.65;break;
						case 'normalu':zoom=1.6;break;
						case 'normalt':zoom=1.55;break;
						case 'normals':zoom=1.5;break;
						case 'normalr':zoom=1.45;break;
						case 'normalq':zoom=1.4;break;
						case 'normalp':zoom=1.35;break;
						case 'normala':zoom=1.3;break;
						case 'normalb':zoom=1.25;break;
						case 'normalc':zoom=1.2;break;
						case 'normald':zoom=1.15;break;
						case 'normale':zoom=1.1;break;
						case 'normalf':zoom=1.05;break;
						case 'normalg':zoom=0.95;break;
						case 'normalh':zoom=0.9;break;
						case 'normali':zoom=0.85;break;
						case 'normalj':zoom=0.8;break;
						case 'normalk':zoom=0.75;break;
						case 'normall':zoom=0.7;break;
						case 'normalm':zoom=0.65;break;
						case 'normaln':zoom=0.6;break;
						case 'normalo':zoom=0.55;break;
						default:zoom=1;
					}
					game.documentZoom=game.deviceZoom*zoom;
					ui.updatez();
				}
			};
 
			var zoom;
			switch(lib.config.ui_zoom){
				case 'normalw':zoom=1.7;break;
				case 'normalv':zoom=1.65;break;
				case 'normalu':zoom=1.6;break;
				case 'normalt':zoom=1.55;break;
				case 'normals':zoom=1.5;break;
				case 'normalr':zoom=1.45;break;
				case 'normalq':zoom=1.4;break;
				case 'normalp':zoom=1.35;break;
				case 'normala':zoom=1.3;break;
				case 'normalb':zoom=1.25;break;
				case 'normalc':zoom=1.2;break;
				case 'normald':zoom=1.15;break;
				case 'normale':zoom=1.1;break;
				case 'normalf':zoom=1.05;break;
				case 'normalg':zoom=0.95;break;
				case 'normalh':zoom=0.9;break;
				case 'normali':zoom=0.85;break;
				case 'normalj':zoom=0.8;break;
				case 'normalk':zoom=0.75;break;
				case 'normall':zoom=0.7;break;
				case 'normalm':zoom=0.65;break;
				case 'normaln':zoom=0.6;break;
				case 'normalo':zoom=0.55;break;
				default:zoom=1;
			}
			game.documentZoom=game.deviceZoom*zoom;
			if(zoom!=1){
				ui.updatez();
			}

			// 9-17人布局
			var style1=document.createElement('style');
			style1.innerHTML+="[data-number='9']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='2']{top:18px;left:auto;right:calc(14% - 18px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='3']{top:9px;left:auto;right:calc(27% - 19px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='4']{top:0px;left:auto;right:calc(40% - 16px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='5']{top:0px;left:calc(40% - 16px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='6']{top:9px;left:calc(27% - 19px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='7']{top:18px;left:calc(14% - 18px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='8']{top:72px;left:calc(2% - 30px);}";
			
			
			style1.innerHTML+="[data-number='10']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='2']{top:36px;left:auto;right:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='3']{top:18px;left:auto;right:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='4']{top:9px;left:auto;right:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='5']{top:0px;left:calc(47% - 22.5px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='6']{top:9px;left:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='7']{top:18px;left:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='8']{top:36px;left:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='9']{top:72px;left:calc(2% - 30px);}";
			
			
			style1.innerHTML+="[data-number='11']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='2']{top:36px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='3']{top:18px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='4']{top:9px;left:auto;right:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='5']{top:0px;left:auto;right:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='6']{top:0px;left:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='7']{top:9px;left:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='8']{top:18px;left:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='9']{top:36px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='10']{top:72px;left:calc(2% - 30px);}";
			
			
			style1.innerHTML+="[data-number='12']>.player[data-position='1']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='2']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='3']{top:36px;left:auto;right:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='4']{top:18px;left:auto;right:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='5']{top:9px;left:auto;right:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='6']{top:0px;left:calc(47% - 22.5px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='7']{top:9px;left:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='8']{top:18px;left:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='9']{top:36px;left:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='10']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='11']{top:275px;left:calc(2% - 30px);}";
		
		
			style1.innerHTML+="[data-number='13']>.player[data-position='1']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='2']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='3']{top:36px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='4']{top:18px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='5']{top:9px;left:auto;right:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='6']{top:0px;left:auto;right:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='7']{top:0px;left:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='8']{top:9px;left:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='9']{top:18px;left:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='10']{top:36px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='11']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='12']{top:275px;left:calc(2% - 30px);}";
		

			style1.innerHTML+="[data-number='14']>.player[data-position='1']{top:275px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='2']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='3']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='4']{top:36px;left:auto;right:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='5']{top:18px;left:auto;right:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='6']{top:9px;left:auto;right:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='7']{top:0px;left:calc(47% - 22.5px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='8']{top:9px;left:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='9']{top:18px;left:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='10']{top:36px;left:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='11']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='12']{top:275px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='13']{top:275px;left:calc(12% - 28px);}";
		
		
			style1.innerHTML+="[data-number='15']>.player[data-position='1']{top:275px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='2']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='3']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='4']{top:36px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='5']{top:18px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='6']{top:9px;left:auto;right:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='7']{top:0px;left:auto;right:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='8']{top:0px;left:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='9']{top:9px;left:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='10']{top:18px;left:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='11']{top:36px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='12']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='13']{top:275px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='14']{top:275px;left:calc(12% - 28px);}";
		

			style1.innerHTML+="[data-number='16']>.player[data-position='1']{top:275px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='2']{top:275px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='3']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='4']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='5']{top:36px;left:auto;right:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='6']{top:18px;left:auto;right:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='7']{top:9px;left:auto;right:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='8']{top:0px;left:calc(47% - 22.5px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='9']{top:9px;left:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='10']{top:18px;left:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='11']{top:36px;left:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='12']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='13']{top:275px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='14']{top:275px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='15']{top:275px;left:calc(22% - 26px);}";

		
			style1.innerHTML+="[data-number='17']>.player[data-position='1']{top:275px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='2']{top:275px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='3']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='4']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='5']{top:36px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='6']{top:18px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='7']{top:9px;left:auto;right:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='8']{top:0px;left:auto;right:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='9']{top:0px;left:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='10']{top:9px;left:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='11']{top:18px;left:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='12']{top:36px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='13']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='14']{top:275px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='15']{top:275px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='16']{top:275px;left:calc(22% - 26px);}";
			document.head.appendChild(style1);
     
			lib.mode.identity.config.player_number.item={
				'2':'两人',
				'3':'三人',
				'4':'四人',
				'5':'五人',
				'6':'六人',
				'7':'七人',
				'8':'八人',
				'9':'九人',
				'10':'十人',
				'11':'十一人',
				'12':'十二人',
				'13':'十三人',
				'14':'十四人',
				'15':'十五人',
				'16':'十六人',
				'17':'十七人',
			}
			lib.mode.guozhan.config.player_number.item={
				'2':'两人',
				'3':'三人',
				'4':'四人',
				'5':'五人',
				'6':'六人',
				'7':'七人',
				'8':'八人',
				'9':'九人',
				'10':'十人',
				'11':'十一人',
				'12':'十二人',
				'13':'十三人',
				'14':'十四人',
				'15':'十五人',
				'16':'十六人',
				'17':'十七人',
			};
	
			if(config.nine9Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','nei','fan','fan','fan','fan']);
			}
			if(config.nine9Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','nei','nei','fan','fan','fan','fan']);
			}
			if(config.nine9Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','fan','fan','fan','fan']);
			}
			if(config.nine9Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','fan','fan','fan','fan','fan']);
			};
			if(config.ten10Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan']);
			}
			if(config.ten10Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan']);
			}
			if(config.ten10Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan']);
			};
			if(config.eleven11Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan']);
			}
			if(config.eleven11Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan']);
			}
			if(config.eleven11Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan']);
			}
			if(config.eleven11Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan']);
			};
			if(config.twelve12Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan']);
			}
			if(config.twelve12Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan']);
			}
			if(config.twelve12Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan']);
			};
			if(config.thirteen13Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan']);
			}
			if(config.thirteen13Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan']);
			}
			if(config.thirteen13Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan']);
			}
			if(config.thirteen13Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan']);
			};
			if(config.fourteen14Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fourteen14Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fourteen14Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan']); 
			};
			if(config.fifteen15Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fifteen15Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fifteen15Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fifteen15Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan','fan']);
			};
			if(config.Sixteen16Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Sixteen16Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Sixteen16Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Sixteen16Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei','nei','fan','fan','fan','fan','fan','fan','fan']);
			};
			if(config.Seventeen17Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='2'){
	   		lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','nei','nei','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			};


			    
},precontent:function(){},help:{},config:{"nine9Man":{"name":"九人场身份","init":"1","item":{"1":"三忠四反一内","2":"二忠四反二内","3":"四忠四反零内","4":"三忠五反零内"}},"ten10Man":{"name":"十人场身份","init":"1","item":{"1":"三忠四反二内","2":"三忠五反一内","3":"四忠五反零内"}},"eleven11Man":{"name":"十一人场身份","init":"1","item":{"1":"四忠五反一内","2":"三忠五反二内","3":"五忠五反零内","4":"四忠六反零内"}},"twelve12Man":{"name":"十二人场身份","init":"1","item":{"1":"四忠五反二内","2":"四忠六反一内","3":"五忠六反零内"}},"thirteen13Man":{"name":"十三人场身份","init":"1","item":{"1":"五忠六反一内","2":"四忠六反二内","3":"六忠六反零内","4":"五忠七反零内"}},"fourteen14Man":{"name":"十四人场身份","init":"1","item":{"1":"五忠六反二内","2":"五忠七反一内","3":"六忠七反零内"}},"fifteen15Man":{"name":"十五人场身份","init":"1","item":{"1":"六忠七反一内","2":"五忠七反二内","3":"七忠七反零内","4":"六忠八反零内"}},"Sixteen16Man":{"name":"十六人场身份","init":"1","item":{"1":"六忠七反二内","2":"六忠八反一内","3":"七忠八反零内","4":"五忠七反三内"}},"Seventeen17Man":{"name":"十七人场身份","init":"1","item":{"1":"五忠八反三内","2":"六忠八反二内","3":"16反","4":"四忠八反四内"}}},package:{
    character:{
        character:{
            "典韦魏延":["male","wei",4,["reqiangxi","xinkuanggu"],["zhu","des:强袭狂骨"]],
            "司马魏延":["male","jin",4,["xinkuanggu","taoyin","yimie"],["hiddenSkill","des:夷灭狂骨"]],
            "马岱马超":["male","shu",4,["oldqianxi","retieji"],["des:潜袭铁骑"]],
            "十牌":["female","shu",1,["十牌"],[]],
        },
        translate:{
            "典韦魏延":"典韦魏延",
            "司马魏延":"司马魏延",
            "马岱马超":"马岱马超",
            "十牌":"十牌",
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
            "十牌":{
                locked:true,
                audio:"ext:三国新将/audio:true",
                group:["十牌_1","十牌_2","十牌_3"],
                subSkill:{
                    "1":{
                        audio:"lyzjuejing",
                        trigger:{
                            player:"phaseDrawBefore",
                        },
                        forced:true,
                        content:function (){
                trigger.cancel();
             },
                        ai:{
                            noh:true,
                        },
                        sub:true,
                    },
                    "2":{
                        audio:false,
                        trigger:{
                            player:"loseEnd",
                        },
                        forced:true,
                        filter:function (event,player){
                return player.countCards('h')<10;
            },
                        content:function (){
            player.draw(10-player.countCards('h'));
            },
                        sub:true,
                    },
                    "3":{
                        audio:false,
                        trigger:{
                            player:"gainEnd",
                        },
                        forced:true,
                        filter:function (event,player){
                return player.countCards('h')>10;
            },
                        content:function (){
            player.chooseToDiscard(player.countCards('h')-10,true);
            },
                        sub:true,
                    },
                },
            },
        },
        translate:{
            "十牌":"十牌",
            "十牌_info":"锁定技，你始终跳过摸牌阶段，你的手牌数始终为10。",
        },
    },
    intro:"",
    author:"彭",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":["典韦魏延.jpg","马岱马超.jpg","司马魏延.jpg","十牌.jpg"],"card":[],"skill":[]}}})