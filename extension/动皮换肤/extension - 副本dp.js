game.import("extension", function (lib, game, ui, get, ai, _status) {
    window.eng = {
        name: "动皮换肤",
        url: lib.assetURL + "extension/动皮换肤",
        selectSkinData: {
            temp: "",
            value: "",
        },
        test: true,
        filterSkills: [
            'zhangba_skill', 'guding_skill',
            'zhuque_skill', 'hanbing_skill',
            'guanshi_skill', 'cixiong_skill',
            'fangtian_skill', 'qilin_skill',
            'qinggang_skill', 'zhuge_skill',
        ],
        playDynamic: function (skin, player, action) {
            if (!skin && !player && !action) return;
            var nAction = eng.getDynamicSkinAction(skin.skinName, player.name);
            if (nAction) {
                var a = false;
                for (var nActionKey of nAction) {
                    if (nActionKey == action) a = true;
                }
                if (a) {
                    if (player.changeSkin) {
                        player.dynamicSkin[0] = skin
                        player.changeSkin = false;
                    }
                    var dj;
                    var ac = false;
                    if (action == "GongJi" && lib.config["extension_EngEX_SSAttack"]) {
                        dj = function () {
                            this.x = this.player.x;
                            this.y = this.player.y;
                            this.setAction("DaiJi");
                            this.oncomplete = null;
                        }
                        var {...nskin} = skin
                        nskin.x = [0, 20]
                        nskin.y = [0, 20]
                        nskin.player = player.dynamicSkin[0];
                        nskin.action = action;
                        nskin.oncomplete = dj;
                        ac = true;
                    } else {
                        dj = function () {
                            this.setAction("DaiJi");
                            this.oncomplete = null;
                        }
                        skin.action = action;
                        skin.oncomplete = dj;
                    }
                    if (player.dynamic) player.stopDynamic();
                    player.playDynamic((ac ? nskin : skin), false);
                    player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + (ac ? nskin.background : skin.background) + '")';
                    return true;
                } else {
                    skin.action = "DaiJi"
                    if (player.dynamic) player.stopDynamic();
                    player.playDynamic(skin, false);
                    player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                    return true;
                }
            } else if (player.changeSkin) {
                player.changeSkin[0] = skin
                if (player.dynamic) player.stopDynamic();
                player.playDynamic(skin, false);
                player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                player.changeSkin = false;
                return true;
            }
            return false;
        },
        // checkSkinAction: function (skin,player,action) {
        //   if (!skin && !player && !action) return;
        //   var engSkins = eng.skins[player.name];
        //   var actions = false;
        //   if (engSkins) actions = engSkins[skin.skinName];
        //   if (actions) {
        //     var actionFilter = eng.actionFilter(actions,action);
        //     if (actionFilter) {
        //       eng.actionBuilder();
        //     }
        //   } else {
        //     return false;
        //   }
        //   return false;
        // },
        // 感谢咸鱼大佬
        copy: function (sdir /*源文件夹路径*/, fn /*文件名*/, ddir /*目标文件夹路径*/, callback) {
            game.ensureDirectory(ddir, function () {
            });
            game.readFile(sdir + '/' + fn, function (data) {
                game.writeFile(data, ddir, fn, (callback || function () {
                    eng.addProgress(document.getElementById("progressbar"),35)
                }));
            });
        },
        addProgress: function (e, value) {
            if (!(e.value >= e.max)) {
                e.value += value;
            } else {
                e.classList.add('uk-animation-slide-bottom-medium','uk-animation-reverse')
                game.saveConfig('extension_EngEX_SSSEffect', true);
                setTimeout(() => {
                    if (confirm("覆盖完成，点击确定进行重启游戏")) {
                        document.body.removeChild(e);
                        game.reload();
                    }
                },1000);
            }
        },
        insertAfter: function (newElement, targentElement) {
            var parent = targentElement.parentNode;
            if (parent.lastChild == targentElement) {
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targentElement.nextSibling)
            }
        },
        switchSkin: function () {
            UIkit.modal(document.getElementById("dynamicSkinDialog")).hide()
            let player = game.me
            let value = eng.selectSkinData.value
            if (value == "") return;
            if (player.dynamic.primary) {
                if (player.dynamic.primary.skinName == value) return;
            }
            var skin = eng.getDynamicSkin(value, player.name)
            player.changeSkin = true;
            eng.playDynamic(skin, player, "ChuChang")
        },
        initSwitch: function (player, keys) {
            var name = player.name
            var element = document.createElement("div");
            element.setAttribute("id", "dynamicSkinDialog")
            element.setAttributeNode(document.createAttribute("uk-modal"))
            element.innerHTML = "<div class=\"uk-modal-dialog uk-width-auto uk-modal-body\">\n" +
                "        <h3 id='h3title' class=\"uk-modal-title\">更换动态皮肤</h3>\n" +
                "        <p class=\"uk-text-right\">\n" +
                "            <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">取消</button>\n" +
                "            <button class=\"uk-button uk-button-primary\" type=\"button\" onclick='eng.switchSkin()' >确定</button>\n" +
                "        </p>\n" +
                "    </div>"
            
            document.body.appendChild(element)
            var h3title = document.getElementById("h3title")
            
            for (let i = 0; i < keys.length; i++) {
                var path = eng.url + "/images/character/" + name + "/" + keys[i] + ".png";
                var img = document.createElement("img");
                img.setAttribute("src", path);
                img.setAttribute("alt", keys[i])
                img.classList.add("uk-card-hover");
                img.style.borderRadius = "10px";
                img.style.marginLeft = "3%";
                img.style.height = "253px";
                img.style.width = "138px";
                img.onclick = function () {
                    eng.selectSkin(this)
                }
                img.onerror = function () {
                    this.src = eng.url + "/小杀.png";
                    this.onerror = null
                }
                eng.insertAfter(img, h3title)
                UIkit.modal(element).hide()
            }
        },
        selectSkin: function (e) {
            var temp = eng.selectSkinData.temp
            if (temp != "") temp.style.boxShadow = ""
            eng.selectSkinData.value = e.alt
            e.style.boxShadow = "0px 0px 20px #e71600"
            eng.selectSkinData.temp = e
        },
        getDynamicSkin: function (skinName, playerName) {
            var dskins = dui.dynamicSkin;
            var skins = dskins[playerName]
            return skins[skinName];
        },
        getDynamicSkinAction: function (skinName, playerName) {
            var engSkins = eng.skins[playerName];
            var engSkin = false;
            if (engSkins) engSkin = engSkins[skinName];
            return engSkin;
        },
        actionFilter: function (actions, action) {
            var res = false;
            for (var actionKey of actions) {
                if (actionKey == action) {
                    return res = true;
                }
            }
            return res;
        },
    };
    return {
        name: "动皮换肤",
        content: function (config, pack) {
            
            if (lib.config['extension_EngEX_SSSEffect'] && lib.config['extension_十周年UI_enable'] && lib.config['extension_十周年UI_dynamicSkin']) {
                if (engCkList.parts) for (var i = 0; i < engCkList.parts.length; i++) engCkList.parts[i](lib, game, ui, get, ai, _status);
            } 
//卡牌美化         
            if (config.cardReplace) {
                var extensionPath = lib.assetURL + "extension/动皮换肤/";
                lib.init.css(extensionPath + "theme/style/cardback", "ol");
                var cp = lib.config.extension_十周年UI_cardPrettify
                var enable = lib.config.extension_十周年UI_enable
                if (enable) {
                    if (cp == 'off') {
                        lib.init.css(extensionPath + "theme/style/card", "ol");
                    }
                } else {
                    lib.init.css(extensionPath + "theme/style/card", "ol");
                }
            }
            
            function overrides(dest, src) {
                if (!src) return;
                if (!dest._super) dest._super = {};
                for (var key in src) {
                    if (dest[key])
                        dest._super[key] = dest[key];
                    
                    dest[key] = src[key];
                }
            };
            
            var Player = {};
//动皮换肤             
            if (lib.config['extension_EngEX_SSSEffect'] && lib.config['extension_十周年UI_enable'] && lib.config['extension_十周年UI_dynamicSkin']) {
                
                lib.element.player.logSkill = function (name, targets, nature, logv) {
                    if (!(get.mode() == 'guozhan') || this.name2 === undefined) {
                        if (game.phaseNumber > 0) {
                            if (name.indexOf("_") != 0 && eng.filterSkills.indexOf(name) == -1 || this.skills.indexOf(name) != -1) {
                                var engSkin = eng.skins[this.name]
                                if (engSkin != undefined && this.dynamic) {
                                    if (this.dynamic.primary) {
                                        eng.playDynamic(eng.getDynamicSkin(this.dynamic.primary.skinName, this.name), this, "TeShu")
                                    }
                                }
                            }
                        }
                    }
                    
                    if (get.itemtype(targets) == 'player') targets = [targets];
                    var nopop = false;
                    var popname = name;
                    if (Array.isArray(name)) {
                        popname = name[1];
                        name = name[0];
                    }
                    var checkShow = this.checkShow(name);
                    if (lib.translate[name]) {
                        this.trySkillAnimate(name, popname, checkShow);
                        if (typeof targets == 'object' && targets.length) {
                            var str;
                            if (targets[0] == this) {
                                str = '#b自己';
                                if (targets.length > 1) {
                                    str += '、';
                                    str += get.translation(targets.slice(1));
                                }
                            } else str = targets;
                            game.log(this, '对', str, '发动了', '【' + get.skillTranslation(name, this) + '】');
                        } else {
                            game.log(this, '发动了', '【' + get.skillTranslation(name, this) + '】');
                        }
                    }
                    if (nature != false) {
                        if (nature === undefined) {
                            nature = 'green';
                        }
                        this.line(targets, nature);
                    }
                    var info = lib.skill[name];
                    if (info && info.ai && info.ai.expose != undefined &&
                        this.logAi && (!targets || targets.length != 1 || targets[0] != this)) {
                        this.logAi(lib.skill[name].ai.expose);
                    }
                    if (info && info.round) {
                        var roundname = name + '_roundcount';
                        this.storage[roundname] = game.roundNumber;
                        this.syncStorage(roundname);
                        this.markSkill(roundname);
                    }
                    if (lib.config['extension_EngEX_replaceAudio'] && this.dynamic) {
                        if (this.dynamic.primary) {
                            var info = get.info(name);
                            if ((!info.direct || true) && lib.config.background_speak &&
                                (!lib.skill.global.contains(name) || lib.skill[name].forceaudio)) {
                                var audioname = name;
                                if (info.audioname2 && info.audioname2[this.name]) {
                                    audioname = info.audioname2[this.name];
                                    info = lib.skill[audioname];
                                }
                                var audioinfo = info.audio;
                                if (typeof audioinfo == 'string' && lib.skill[audioinfo]) {
                                    audioname = audioinfo;
                                    audioinfo = lib.skill[audioname].audio;
                                }
                                if (Array.isArray(audioinfo)) {
                                    audioname = audioinfo[0];
                                    audioinfo = audioinfo[1];
                                }
                                if (Array.isArray(info.audioname) && player) {
                                    if (info.audioname.contains(player.name)) {
                                        audioname += '_' + player.name;
                                    } else if (info.audioname.contains(player.name1)) {
                                        audioname += '_' + player.name1;
                                    } else if (info.audioname.contains(player.name2)) {
                                        audioname += '_' + player.name2;
                                    }
                                }
                                if (typeof audioinfo == 'number') {
                                    game.playAudio("..", "extension", "动皮换肤/audio/character/skill", this.name, this.dynamic.primary.skinName, audioname + Math.ceil(audioinfo * Math.random()));
                                } else if (audioinfo) {
                                    game.playAudio("..", "extension", "动皮换肤/audio/character/skill", this.name, this.dynamic.primary.skinName, audioname);
                                }
                            }
                        } else {
                            game.trySkillAudio(name, this, true);
                        }
                    } else {
                        game.trySkillAudio(name, this, true);
                    }
                    if (game.chess) {
                        this.chessFocus();
                    }
                    if (logv === true) {
                        game.logv(this, name, targets, null, true);
                    } else if (info && info.logv !== false) {
                        game.logv(this, name, targets);
                    }
                    if (this._hookTrigger) {
                        for (var i = 0; i < this._hookTrigger.length; i++) {
                            var info = lib.skill[this._hookTrigger[i]].hookTrigger;
                            if (info && info.log) {
                                info.log(this, name, targets);
                            }
                        }
                    }
                }
                
                lib.skill._gj = {
                    // trigger: {player: 'useCardToPlayered'},
                    trigger: {player: 'useCardBefore'},
                    forced: true,
                    filter: function (event, player) {
                        if (get.mode() === 'guozhan' && !(player.name2 == undefined)) return false
                        var type = get.type(event.card);
                        return ((type == 'basic' || type == 'trick') && get.tag(event.card, 'damage') > 0) && eng.skins[player.name]
                    },
                    content: function () {
                        if (player.dynamic) {
                            var skin = player.dynamic.primary;
                            if (skin) {
                                eng.playDynamic(eng.getDynamicSkin(skin.skinName, player.name), player, "GongJi");
                            }
                        }
                        return;
                    }
                }
                
                lib.skill._ts = {
                    trigger: {
                        player: 'useSkillBefore'
                    },
                    forced: true,
                    filter: function (event, player) {
                        if (get.mode() === 'guozhan' && !(player.name2 == undefined)) return false
                        return eng.skins[player.name]
                    },
                    content: function () {
                        if (player.dynamic) {
                            var skin = player.dynamic.primary
                            if (skin) {
                                eng.playDynamic(eng.getDynamicSkin(skin.skinName, player.name), player, "TeShu");
                            }
                        }
                        return;
                    }
                }
                
                lib.skill._hf = {
                    trigger: {
                        global: 'gameStart'
                    },
                    forced: true,
                    init: function (player, skill) {
                        player.storage._hf = 0
                    },
                    filter: function (event, player) {
                        return !(get.mode() == 'guozhan' || player.name2 != undefined) && player == game.me && !player.storage._hf >= 1
                    },
                    content: function () {
                        var skins = decadeUI.dynamicSkin[player.name];
                        if (skins == undefined) return;
                        var keys = Object.keys(skins)
                        if (keys.length < 2) return;
                        var div = ui.create.div('.switchSkinButton', ui.arena);
                        div.onclick = function () {
                            UIkit.modal(document.getElementById("dynamicSkinDialog")).show()
                        }
                        eng.initSwitch(player, keys)
                        document.body.appendChild(div);
                        player.storage._hf++;
                    }
                }
                
                lib.skill._checkDynamicShenYh = {
                    trigger: {
                        global: 'gameStart'
                    },
                    forced: true,
                    filter: function (event, player) {
                        return player.dynamic && !(lib.config['extension_十周年UI_newDecadeStyle'] == "on")
                    },
                    content: function () {
                        var isYh = player.getElementsByClassName("skinYh")
                        if (isYh.length <= 0) {
                            var yh = document.createElement("img");
                            yh.src = eng.url + "/images/border/" + player.group + ".png";
                            yh.classList.add("skinYh")
                            yh.style.display = "block";
                            yh.style.position = "absolute";
                            yh.style.top = "-22px";
                            yh.style.height = "50px";
                            yh.style.width = "131.1px";
                            yh.style.zIndex = "61";
                            player.appendChild(yh)
                        }
                    }
                }
                
                lib.skill._checkDieDynamicYh = {
                    trigger: {
                        global: 'dieBegin'
                    },
                    forced: true,
                    filter: function (event, player) {
                        var s = event.player.getElementsByClassName("skinYh")
                        return s.length > 0
                    },
                    content: function () {
                        var s = trigger.player.getElementsByClassName("skinYh")
                        s[0].parentNode.removeChild(s[0])
                    }
                }
                
                Player.init = function (character, character2, skill) {
                    var isYh = this.getElementsByClassName("skinYh")
                    if (isYh.length > 0) {
                        isYh[0].parentNode.removeChild(isYh[0])
                    }
                    this.doubleAvatar = (character2 && lib.character[character2]) != undefined;
                    var CUR_DYNAMIC = decadeUI.CUR_DYNAMIC;
                    var MAX_DYNAMIC = decadeUI.MAX_DYNAMIC;
                    if (CUR_DYNAMIC == undefined) {
                        CUR_DYNAMIC = 0;
                        decadeUI.CUR_DYNAMIC = CUR_DYNAMIC;
                    }
                    
                    if (MAX_DYNAMIC == undefined) {
                        MAX_DYNAMIC = decadeUI.isMobile() ? 2 : 10;
                        if (window.OffscreenCanvas)
                            MAX_DYNAMIC += 8;
                        decadeUI.MAX_DYNAMIC = MAX_DYNAMIC;
                    }
                    
                    if (this.dynamic) this.stopDynamic();
                    var showDynamic = (this.dynamic || CUR_DYNAMIC < MAX_DYNAMIC) && duicfg.dynamicSkin;
                    var y = false;
                    if (showDynamic && _status.mode != null) {
                        var skins;
                        var dskins = decadeUI.dynamicSkin;
                        var avatars = this.doubleAvatar ? [character, character2] : [character];
                        var increased;
                        
                        for (var i = 0; i < avatars.length; i++) {
                            skins = dskins[avatars[i]];
                            if (skins == undefined)
                                continue;
                            
                            var keys = Object.keys(skins);
                            if (keys.length == 0) {
                                console.error('player.init: ' + avatars[i] + ' 没有设置动皮参数');
                                continue;
                            }
                            
                            var skin = skins[Object.keys(skins)[0]];
                            if (skin.speed == undefined) skin.speed = 1;
                            y = true;
                            skin.skinName = keys[i]
                            if (avatars.length < 2) {
                                this.dynamicSkin = [];
                                this.dynamicSkin.push(skin)
                            }
                            
                            if (get.mode() == 'guozhan' || this.name2 != undefined) {
                                this.playDynamic(skin, i == 1);
                            } else {
                                this.name = avatars[i];
                                if (this == game.me) {
                                    eng.selectSkinData.value = keys[i]
                                }
                                var b = eng.playDynamic(skin, this, "ChuChang");
                                if (!b) {
                                }
                                this.playDynamic(skin, false);
                            }
                            
                            this.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                            if (!increased) {
                                increased = true;
                                decadeUI.CUR_DYNAMIC++;
                            }
                        }
                        var forces = lib.character[character][1]
                        if (!(lib.config['extension_十周年UI_newDecadeStyle'] == "on") && this.getElementsByClassName("skinYh").length < 1 && y && forces != "shen") {
                            var yh = document.createElement("img");
                            yh.src = eng.url + "/images/border/" + forces + ".png";
                            yh.classList.add("skinYh")
                            yh.style.display = "block";
                            yh.style.position = "absolute";
                            yh.style.top = "-22px";
                            yh.style.height = "50px";
                            yh.style.width = "131.1px";
                            yh.style.zIndex = "61";
                            this.appendChild(yh);
                        }
                    }
                    
                    var jie;
                    if (character && duicfg.showJieMark) {
                        if (lib.characterPack.refresh)
                            jie = lib.characterPack.refresh[character];
                        if (jie == null) {
                            jie = character.substr(0, 3);
                            jie == 're_' || jie == 'ol_' || jie == 'xin' || jie == 'old';
                        }
                        
                        if (jie != null) {
                            jie = lib.translate[character][0];
                            if (jie == '界') {
                                if (this.$jieMark == undefined)
                                    this.$jieMark = dui.element.create('jie-mark', this);
                                else
                                    this.appendChild(this.$jieMark);
                            }
                        }
                    }
                    
                    var result = this._super.init.apply(this, arguments);
                    if (jie == '界') {
                        var text = result.node.name.innerText;
                        if (text[1] == '\n')
                            text = text.substr(2);
                        else
                            text = text.substr(1);
                        
                        result.node.name.innerText = text;
                    }
                    
                    return result;
                };
            } else if (lib.config['extension_EngEX_SSSEffect'] && lib.config['extension_十周年UI_dynamicSkin']) {
                Player.init = function (character, character2, skill) {
                    this.doubleAvatar = (character2 && lib.character[character2]) != undefined;
                    
                    var CUR_DYNAMIC = decadeUI.CUR_DYNAMIC;
                    var MAX_DYNAMIC = decadeUI.MAX_DYNAMIC;
                    if (CUR_DYNAMIC == undefined) {
                        CUR_DYNAMIC = 0;
                        decadeUI.CUR_DYNAMIC = CUR_DYNAMIC;
                    }
                    
                    if (MAX_DYNAMIC == undefined) {
                        MAX_DYNAMIC = decadeUI.isMobile() ? 2 : 10;
                        if (window.OffscreenCanvas)
                            MAX_DYNAMIC += 8;
                        decadeUI.MAX_DYNAMIC = MAX_DYNAMIC;
                    }
                    
                    if (this.dynamic) this.stopDynamic();
                    var showDynamic = (this.dynamic || CUR_DYNAMIC < MAX_DYNAMIC) && duicfg.dynamicSkin;
                    if (showDynamic && _status.mode != null) {
                        var skins;
                        var dskins = decadeUI.dynamicSkin;
                        var avatars = this.doubleAvatar ? [character, character2] : [character];
                        var increased;
                        
                        for (var i = 0; i < avatars.length; i++) {
                            skins = dskins[avatars[i]];
                            if (skins == undefined)
                                continue;
                            
                            var keys = Object.keys(skins);
                            if (keys.length == 0) {
                                console.error('player.init: ' + avatars[i] + ' 没有设置动皮参数');
                                continue;
                            }
                            
                            var skin = skins[Object.keys(skins)[0]];
                            if (skin.speed == undefined)
                                skin.speed = 1;
                            this.playDynamic({
                                name: skin.name,		//	string 骨骼文件名，一般是assets/dynamic 下的动皮文件，也可以使用.. 来寻找其他文件目录
                                action: skin.action,	// string 播放动作 不填为默认
                                loop: true,				// boolean 是否循环播放
                                loopCount: -1,			// number 循环次数，只有loop为true时生效
                                speed: skin.speed,	 	// number 播放速度
                                filpX: undefined,	 	// boolean 水平镜像
                                filpY: undefined,	 	// boolean 垂直翻转
                                opacity: undefined,	 	// 0~1		不透明度
                                x: skin.x,				// 相对于父节点坐标x，不填为居中
                                // (1) x: 10, 相当于 left: 10px；
                                // (2) x: [10, 0.5], 相当于 left: calc(50% + 10px)；
                                y: skin.y,				// 相对于父节点坐标y，不填为居中
                                // (1) y: 10，相当于 top: 10px；
                                // (2) y: [10, 0.5]，相当于 top: calc(50% + 10px)；
                                scale: skin.scale,		// 缩放
                                angle: skin.angle,		// 角度
                                hideSlots: skin.hideSlots,	// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
                                clipSlots: skin.clipSlots,	// 剪掉超出头的部件，仅针对露头动皮，其他勿用
                            }, i == 1);
                            
                            this.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                            if (!increased) {
                                increased = true;
                                decadeUI.CUR_DYNAMIC++;
                            }
                        }
                    }
                    
                    var jie;
                    if (character && duicfg.showJieMark) {
                        if (lib.characterPack.refresh)
                            jie = lib.characterPack.refresh[character];
                        if (jie == null) {
                            jie = character.substr(0, 3);
                            jie == 're_' || jie == 'ol_' || jie == 'xin' || jie == 'old';
                        }
                        
                        if (jie != null) {
                            jie = lib.translate[character][0];
                            if (jie == '界') {
                                if (this.$jieMark == undefined)
                                    this.$jieMark = dui.element.create('jie-mark', this);
                                else
                                    this.appendChild(this.$jieMark);
                            }
                        }
                    }
                    
                    var result = this._super.init.apply(this, arguments);
                    if (jie == '界') {
                        var text = result.node.name.innerText;
                        if (text[1] == '\n')
                            text = text.substr(2);
                        else
                            text = text.substr(1);
                        
                        result.node.name.innerText = text;
                    }
                    
                    return result;
                };
            }
            
            overrides(lib.element.player, Player);
            
            // document.body.appendChild(div)
            // var element = document.getElementsByClassName("dui-marks");
            //       // var div = document.createElement("div");
            //       // div.classList.add("card")
            //       // div.classList.add("mark")
            //       // var div2 = document.createElement("div");
            //       // div2.setAttribute("id","fenyin")
            //       // div2.classList.add("mark-text");
            //       // var text = document.createTextNode("红")
            //       // div2.appendChild(text)
            //       // div.appendChild(div2)
            //       // element[0].appendChild(div)
        },
        precontent: function (config) {
            lib.init.css(lib.assetURL + "extension/动皮换肤/UI/css", "uikit")
            lib.init.js(lib.assetURL + "extension/动皮换肤/UI/js", 'uikit', function () {
            }, function () {
            });
            lib.init.js(lib.assetURL + "extension/动皮换肤/UI/js", 'uikit-icons', function () {
            }, function () {
            });
            
            if (lib.config['extension_EngEX_SSSEffect'] && lib.config['extension_十周年UI_enable'] && lib.config['extension_十周年UI_dynamicSkin']) {
                window.engCkList = {
                    init: function () {
                        var filePath, ok;
                        var scripts = ['ckList'];
                        var onload = function () {
                            this.remove();
                        };
                        
                        var onerror = function () {
                            console.error(this.src + 'not found');
                            this.remove();
                        };
                        
                        for (var i = 0; i < scripts.length; i++) {
                            ok = false;
                            filePath = eng.url + "/" + scripts[i] + '.js';
                            try {
                                var script = document.createElement('script');
                                script.addEventListener('load', onload);
                                script.addEventListener('error', onerror);
                                script.src = filePath;
                                document.head.appendChild(script);
                                ok = true;
                            } finally {
                                if (!ok) console.error('script error');
                            }
                        }
                        return this;
                    },
                    import: function (part) {
                        if (!this.parts) this.parts = [];
                        if (typeof part != 'function') return console.error('import failed');
                        this.parts.push(part);
                    },
                    extend: function (target, source) {
                        if (source === null || typeof source !== 'object') return target;
                        
                        var keys = Object.keys(source);
                        var i = keys.length;
                        while (i--) {
                            target[keys[i]] = source[keys[i]];
                        }
                        
                        return target;
                    },
                }.init();
            }
            
            var style = document.createElement("style")
            style.innerHTML = "@keyframes changeable{"
            for (var i = 1; i <= 20; i++) {
                var rand1 = Math.floor(Math.random() * 255),
                    rand2 = Math.floor(Math.random() * 255),
                    rand3 = Math.floor(Math.random() * 255);
                style.innerHTML +=
                    i * 5 +
                    "%{text-shadow: black 0 0 1px,rgba(" +
                    rand1 +
                    ", " +
                    rand2 +
                    ", " +
                    rand3 +
                    ", 0.6) 0 0 2px,rgba(" +
                    rand1 +
                    ", " +
                    rand2 +
                    ", " +
                    rand3 +
                    ", 0.6) 0 0 5px,rgba(" +
                    rand1 +
                    ", " +
                    rand2 +
                    ", " +
                    rand3 +
                    ", 0.6) 0 0 10px,rgba(" +
                    rand1 +
                    ", " +
                    rand2 +
                    ", " +
                    rand3 +
                    ", 0.6) 0 0 10px,rgba(" +
                    rand1 +
                    ", " +
                    rand2 +
                    ", " +
                    rand3 +
                    ", 0.6) 0 0 20px,rgba(" +
                    rand1 +
                    ", " +
                    rand2 +
                    ", " +
                    rand3 +
                    ", 0.6) 0 0 20px}";
            }
            style.innerHTML += "}"
            document.head.appendChild(style);
        },
        help: {},
        config: {
            "cardReplace": {
                "name": "动皮换肤(带卡牌美化)",
                "intro": "(重启生效，设置-外观-卡牌和卡背样式选择手杀)",
                "init": true
            },
            "SSSEffect": {
				clear: true,
                "name": '"<span style="text-decoration: underline;">在此导入换肤文件和动皮效果<span>"',
                "intro": "十周年默认动皮动作只有待机，开启后导入相关文件可以执行其他动作",
                onclick: function (bool) {
                    if (!lib.config['extension_EngEX_SSSEffect']) {
                        if (!window.decadeUI) {
                            alert("请先安装和开启十周年UI")
                            game.saveConfig('extension_EngEX_SSSEffect', false)
                            return this.init = false
                        }
                        if (confirm("你备份好【十周年UI】扩展了吗？如果是，点击确定后会覆盖本扩展同名文件覆盖至十周年UI，等待覆盖完毕（根据机型配置低高，时间所用不同）")) {
                            var progress = document.createElement("progress");
                            progress.setAttribute("id","progressbar");
                            progress.classList.add("uk-progress");
                            progress.setAttribute("value","1");
                            progress.setAttribute("max","100");
                            progress.style.display = "block"
                            progress.style.position = "absolute";
                            progress.innerText = "123"
                            progress.style.width = "50%";
                            progress.style.zIndex = "99";
                            progress.style.top = "40%";
                            progress.style.left = "25%";
                            document.body.appendChild(progress);
                            setTimeout(() => {
                                ["extension/动皮换肤/替换十周年"].forEach(function (i) {
                                    game.getFileList(i, function (fold, file) {
                                        var arr = Array.from(file);
                                        arr.forEach(function (j) {
                                            eng.copy(i, j, 'extension/十周年UI');
                                        });
                                    });
                                });
                            },2000)
                        } 
                    } else {
                        game.saveConfig('extension_EngEX_SSSEffect', false)
                    }
                },
                update: function () {
                    if (window.Eng) ui.arena.dataset.SSSEffect = lib.config['extension_EngEX_SSSEffect'] ? 'on' : 'off';
                }
            },
            "replaceAudio": {
                "name": "动皮换肤换音",
                "intro": "添加相关动皮配音文件到audio,character,skill,没添加配音文件勿开,不然会报错",
                "init": false
            },
            "SSAttack": {
                "name": "手杀攻击效果",
                "init": true
            },
            "SSEquip": {
                "name": "手杀装备栏效果",
                "init": true
            },
        },
        package: {
            character: {
                character: {},
                translate: {},
            },
            card: {
                card: {},
                translate: {},
                list: [],
            },
            skill: {
                skill: {},
                translate: {},
            },
            intro: "",
            author: "",
            diskURL: "",
            forumURL: "",
            version: "0.1.2",
        },
        files: {
            "character": [], "card": [], "skill": []
        }
    }
})