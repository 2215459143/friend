game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "MVP",
        editable: false,
        content: function (config, pack) {
            game.playqysstx = function (fn, dir, sex) {
                if (lib.config.background_speak) {
                    if (dir && sex) game.playAudio(dir, sex, fn);
                    else if (dir) game.playAudio(dir, fn);
                    else game.playAudio('..', 'extension', 'MVP', fn);
                }
            };
            String.prototype.newFedit = function (ins) {
                var CAFst = this;
                var CAFstr = CAFst.slice(CAFst.indexOf("{") + 1).slice(0, -1);
                return ins(CAFstr);
            }
            if (config.qingyao_shoupaikeshi) {
                lib.skill._qingyao_shoupaikeshi = {
                    locked: true,
                    ai: {
                        viewHandcard: true,
                        skillTagFilter: function (player, tag, arg) {
                            if (game.me == arg) return false;
                            if (!arg.isFriendOf(game.me)) return false;
                        },
                    },
                };
            }
        },
        precontent: function (config) {
            if (config.qingyao_shoushaMVP) {
                "use strict;"
                lib.onover.push(resultbool => {
                    var 手杀MVP = function () {
                        if (_status.showShoushaMvp) return false;
                        _status.showShoushaMvp = true;
                        setTimeout(item => {
                            var dialog = Array.from(ui.arena.querySelectorAll(".dialog"));
                            dialog.forEach(value => value.hide());
                            game.playqysstx('images/asqx.mp3');
                            var players = game.players.slice(0);
                            game.players = game.players.concat(game.dead);
                            if (!_status.showShouSha局势) {
                                game.players.forEach(value => {
                                    if (game.dead.contains(value)) {
                                        value.局势分数 -= 20;
                                    }
                                    value.getEnemies().forEach(current => {
                                        if (game.dead.contains(current) || current.isDead()) {
                                            value.局势分数 += 2;
                                        }
                                    })
                                    value.getFriends().forEach(current => {
                                        if (current.isDead() || game.dead.contains(current))
                                            value.局势分数 -= 2;
                                    })
                                })
                            }
                            _status.showShouSha局势 = true;
                            game.players = players;
                            /**
                             * 冒泡排序
                             * @param arr
                             * @param len
                             */
                            var sort = function (arr) {
                                var temp, len = arr.length;
                                var i, j;
                                for (i = 0; i < len - 1; i++) /* 外循环为排序趟数，len个数进行len-1趟 */
                                    for (j = 0; j < len - 1 - i; j++) { /* 内循环为每趟比较的次数，第i趟比较len-i次 */
                                        if (arr[j].mvpCount > arr[j + 1].mvpCount) { /* 相邻元素比较，若逆序则交换（升序为左大于右，降序反之） */
                                            temp = arr[j];
                                            arr[j] = arr[j + 1];
                                            arr[j + 1] = temp;
                                        }
                                    }
                                return arr;
                            }
                            var sorts = sort(game.players.concat(game.dead)).reverse();
                            var player = sorts[0];
                            var popuperContainer = ui.create.div('.popup-container', {background: "rgb(0,0,0,.7)"}, ui.window);
                            popuperContainer.addEventListener('click', event => {
                                event.stopPropagation();
                                popuperContainer.delete(200);
                                dialog.forEach(value => value.show());
                                _status.showShoushaMvp = false;
                            });
                            var skills = player.skills.filter(value => lib.skill[value].audio);
                            skills.length && game.trySkillAudio(skills.randomGet(), player, true);
                            var qycontainer = ui.create.div('.qy-mvp-container', popuperContainer);

                            var backgroundRight = ui.create.div('.qy-mvp-piaodai-right', qycontainer);
                            var container = ui.create.div('.qy-center-container', qycontainer);
                            var backgroundLeft = ui.create.div('.qy-mvp-piaodai-left', qycontainer);

                            var avatarbox = ui.create.div('.qy-mvp-avatarbox', container);
                            if (navigator.userAgent.match(/(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i) !== null) {
                                avatarbox.css({
                                    height: '120%',
                                    top: '-4%',
                                });
                            }
                            var avatarborder = ui.create.div('.qy-mvp-avatarborder', avatarbox);
                            avatarborder.dataset.name = get.translation(player.name);
                            avatarborder.setBackgroundImage(`extension/MVP/images/border_${player.group}.png`);
                            var image = new Image();
                            image.src = `${lib.assetURL}extension/MVP/images/border_${player.group}.png`;
                            image.onerror = function () {
                                avatarborder.setBackgroundImage(`extension/MVP/images/border_qun.png`);
                            }
                            var xing = ui.create.div(avatarbox, '.qy-mvp-xing');
                            var num = 1, rarity = game.getRarity(player.name);
                            switch (rarity) {
                                case 'legend':
                                    num = 5;
                                    break;
                                case 'epic':
                                    num = 4;
                                    break;
                                case 'rare':
                                    num = 3;
                                    break;
                                case 'junk':
                                    num = 2;
                                    break;
                                default:
                                    num = 1;
                                    break;
                            }
                            for (var numKey = 0; numKey < num; numKey++)
                                ui.create.div('.item', xing);
                            var avatar = ui.create.div('.qy-mvp-avatar', avatarbox);
                            avatar.style.backgroundImage = player.node.avatar.style.backgroundImage;
                            var qyInfo = ui.create.div('.qy-mvp-qyInfo', container);
                            ui.create.div('.qy-mvp-title', qyInfo);
                            var qycenter = ui.create.div('.qy-mvp-center', qyInfo);
                            var qyIcon = ui.create.div('.qy-mvp-icon', qycenter);
                            var qyPlayerInfo = ui.create.div('.qy-player-info', qycenter);
                            ui.create.div(qyPlayerInfo, '.qy-mvp-name-title', '玩家名称');
                            ui.create.div(qyPlayerInfo, '.qy-mvp-name-info', player === game.me ? lib.config.connect_nickname : get.translation(player.name));
                            ui.create.div(qyPlayerInfo, '.qy-mvp-name-title', `技术分：${player.mvpCount || 0}`);
                            var qyScoreInfo = ui.create.div('.qy-mvp-scoreInfo', qyInfo);
                            var table = ui.create.node('table', qyScoreInfo, {width: "100%"});
                            var list = ['攻击分数', '治疗分数', '辅助分数', '局势分数', '惩罚扣分'];
                            list.forEach(value => {
                                var tr = ui.create.node('tr', table);
                                tr.style.colo = 'rgb(234, 138, 76)';
                                var td = ui.create.node('td', tr, value);
                                var num = (player[value] || 0);
                                var num2 = (sorts[1][value]);
                                td = ui.create.node('td', tr).innerHTML = num + (num - num2 >= 30 ? '(遥遥领先)' : '');
                            })
                        })
                    }
                    ui.create.control("手杀MVP", 手杀MVP);
                    手杀MVP();
                });
                ['攻击分数', '治疗分数', '辅助分数', '惩罚扣分'].forEach(value => {
                    HTMLDivElement.prototype[value] = 0;
                });
                HTMLDivElement.prototype.局势分数 = 100;
                Object.defineProperty(HTMLDivElement.prototype, 'mvpCount', {
                    get: function () {
                        return this.攻击分数 + this.治疗分数 + this.辅助分数 + this.局势分数 - this.惩罚扣分;
                    },
                    set: function () {
                    },
                });
                lib.skill['_qy-mvp-effect1'] = {
                    trigger: {
                        player: 'useCard',
                        source: 'damageSource',
                    },
                    direct: true,
                    forced: true,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    filter: function (event, player, name) {
                        if (name === 'useCard') {
                            if (!event.card) return false;
                            if (get.tag({name: event.card.name}, 'damage')) return true;
                            if (event.card.name === 'wuxie') return true;
                            if (get.info(event.card).toself || get.type(event.card) !== 'trick') return false;
                            if (get.info(event.card).selectTarget === -1 || get.info(event.card).selectTarget > 1) return true;
                            return false;
                        }
                        if (event.player == event.source) return false;
                        if (event.source.identity == 'nei') return true;
                        return get.attitude(event.source, event.player) < 0;
                    },
                    content: function () {
                        if (event.triggername === 'damageSource') {
                            if (get.attitude(trigger.source, trigger.player) < 0 || trigger.source.identity == 'nei') trigger.num > 5 ? trigger.source.攻击分数 += 15 : trigger.source.攻击分数 += 3 * trigger.num;
                        } else if (trigger.card) {
                            if (get.tag({name: trigger.card.name}, 'damage'))
                                player.攻击分数 += 2
                            if (trigger.card.name === 'wuxie')
                                player.辅助分数 += 2;
                            if ((get.info(trigger.card).selectTarget === -1 || get.info(trigger.card).selectTarget > 1) && (!get.info(trigger.card).toself && get.type(trigger.card) === 'trick'))
                                player.辅助分数 += 1;
                        }
                    }
                }
                lib.skill['_qy-mvp-effect2'] = {
                    trigger: {player: ['gainEnd', 'discardEnd']},
                    direct: true,
                    forced: true,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    filter: function (event, player, name) {
                        if (name === 'gainEnd') {
                            if (!event.source || event.source == player || !event.source.isIn()) return false;
                            //var evt=event.getl(event.source);
                            //if(!evt&&!evt.cards2&&evt.cards2.length===0) return false;
                            if (!event.cards || event.cards.length == 0) return false;
                            if (event.source.identity == 'nei') return true;
                            return event.player.getEnemies().contains(event.source);
                        }
                        if (name === 'discardEnd') {
                            if (!event.source || event.source == player || !event.source.isIn()) return false;
                            //var evt=event.getl(event.source);
                            //if(!evt&&!evt.cards2&&evt.cards2.length===0) return false;
                            if (!event.cards || event.cards.length == 0) return false;
                            if (event.source.identity == 'nei') return true;
                            return event.player.getEnemies().contains(event.source);
                        }
                    },
                    content: function () {
                        if (event.triggername == 'gainEnd') trigger.player.辅助分数 += 1 * trigger.cards.length;
                        if (event.triggername == 'discardEnd') trigger.source.辅助分数 += 1 * trigger.cards.length;
                    },
                }
                lib.skill['_qy-mvp-effect3'] = {
                    trigger: {player: 'recoverEnd'},
                    direct: true,
                    forced: true,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    filter: function (event, player) {
                        if (!event.source || !event.source.isIn()) return false;
                        if (event.source.identity == 'nei') return true;
                        return event.player.getFriends().contains(event.source) || event.player == event.source;
                    },
                    content: function () {
                        trigger.num > 5 ? trigger.source.治疗分数 += 10 : trigger.source.治疗分数 += 2 * trigger.num;
                    },
                }
                lib.skill['_qy-mvp-effect4'] = {
                    trigger: {source: 'dieBegin'},
                    direct: true,
                    forced: true,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    filter: function (event, player) {
                        return (event.source && event.source.isIn());
                    },
                    content: function () {
                        if (trigger.player.getFriends().contains(trigger.source)) {
                            trigger.source.惩罚扣分 += 5;
                            if (trigger.source.identity == 'nei' && trigger.player.identity != 'zhu') {
                                trigger.source.惩罚扣分 -= 5;
                                trigger.source.攻击分数 += 3;
                            }
                        }
                        if (trigger.player.getEnemies().contains(trigger.source)) {
                            trigger.source.攻击分数 += 3;
                        }
                    },
                }
                lib.skill['_qy-mvp-effect5'] = {
                    trigger: {
                        player: "enterGame",
                        global: ["roundStart", "gameStart"],
                    },
                    direct: true,
                    forced: true,
                    priority: Infinity,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    content: function () {
                        if (!_status._qy_mvp_effect5) {
                            try {
                                var changValue = false;
                                var input = ui.commandnode.link.querySelector("input");
                                var Opt = Object.getOwnPropertyDescriptor(input.__proto__, "value");
                                Object.defineProperty(input, 'value', {
                                    get: function () {
                                        var value = (Opt.get && Opt.get.call(this)) || '';
                                        if (value === '') changValue = false;
                                        else changValue = true
                                        return value;
                                    },
                                    set: function (v) {
                                        Opt.set.call(this, v);
                                    },
                                    configurable: true,
                                })
                                Array.from(ui.commandnode.parentElement.parentElement.querySelectorAll(".menubutton.round.highlight")).forEach(value => {
                                    value.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (event) {
                                        if ('作' === value.innerText && this.classList.contains('glowing')) {
                                            game.me.惩罚扣分 += 3;
                                        } else if ('执' === value.innerText && changValue) {
                                            game.me.惩罚扣分 += 3;
                                        }
                                    }, true);
                                })
                            } catch (e) {
                                console.error("作弊加载失败：", e)
                            }
                            _status._qy_mvp_effect5 = true;
                        }
                    },
                };
                lib.init.css(lib.assetURL + 'extension/MVP', 'extension');
            }
        },
        help: {
        },
        config: {
            "qingyao_shoushaMVP": {
                name: '手杀MVP',
                init: true,
                intro: '开启后，游戏结算后可展示手杀MVP界面。',
            },
            "qingyao_shoupaikeshi": {
                name: '手牌可视',
                init: true,
                intro: '开启后，长按队友武将牌可以观看其手牌。(身份场除外)',
            },
        },
        package: {
            intro: "",
            author: "",
            diskURL: "",
            forumURL: "",
            version: "1.1.7",
        },
        files: {
            "character": [],
            "card": [],
            "skill": []
        }
    }
})
