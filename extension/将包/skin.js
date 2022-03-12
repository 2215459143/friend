/*'use strict';//注意所有的XXX改成自己定的名称，为拼音
window.XXX_import(function(lib,game,ui,get,ai,_status){//注意此处
    if(!lib.qhlypkg){
        lib.qhlypkg = [];
    }
    var taici = {
    //台词
        "XXX_caojinyu":{
            "XXX_Cxianjing":{
                order:1,
                content:"文静闲丽，举止柔美。<br>娴静淡雅，温婉穆穆。",
            },
            "die":{
                content:"平叔之情，吾岂不明。",
            },
        },
    };
    lib.qhlypkg.push({
        isExt:true,//是否是扩展，一般填true
        filterCharacter:function(name){
            return name.indexOf('XXX_') == 0;//判断此ID的武将是否属于此皮肤包
        },
        characterNameTranslate:function(name){
            //这里根据武将ID返回其中文名字。
            return get.translation(name);
        },
        characterTaici:function(name){
            //这里返回武将原皮台词。
            return taici[name];
        },
        originSkinInfo:function(name){
            
           // return info[name];
        },
        characterInfo:function(name){
            //这里可以返回角色资料。如不返回则显示get.characterIntro(name)。
        },
        prefix:'extension/扩展包名/image/character/', //原皮前缀，标识原皮肤的位置。        
        skin:{
            standard:'extension/扩展包名/skin/standard/',//可切换普通皮肤的前缀
        },
        audioOrigin:'extension/扩展包名/audio/',//原技能配音位置
        audio:'extension/扩展包名/skin/audio/',//切换皮肤后的技能配音位置
        skininfo:{
        //皮肤
            //皮肤语音"caojinyu":{
				level:"普通",
				translation:"曹金玉【露头】",
				info:"",
				order:1,  
				skill:{
             //技能语音"XXX_Cxianjing":{
                        order:1,
                        content:"文静闲丽，举止柔美。<br>娴静淡雅，温婉穆穆。",
                    },
             //死亡语音"die":{
                        content:"平叔之情，吾岂不明。",
                    },
				},              
            },
            "jinghongliying":{
				level:"限定",
				translation:"惊鸿倩影",
				info:"",
				order:1,  

            },
        }
    });
});*/