"use strict";
game.import("extension", function(lib, game, ui, get, ai, _status) {
	game.removeExtension("武将卡牌搜索器", false);
	//移除武将卡牌搜索器

	let layoutPath = lib.assetURL + 'extension/全能搜索/';
	//加入js
	lib.init.js(layoutPath, 'highlight.min', () => {
		hljs.configure({
			tabReplace: '	',
			useBR: true,
			languages: ['javaScript'],
		});
	});
	
	game.全能搜索_highlight = text => hljs.highlightAuto(text).value;
	
	//加入css
	lib.init.css(layoutPath, 'css/extension');
	lib.init.css(layoutPath, 'css/vs2015.min');
	
	//双击复制
	game.全能搜索_copy = function(target) {
		if (!navigator.clipboard) return alert('不支持写入剪切板');
		if (!target) return;
		let text;
		if (typeof target == "string") {
			text = target;
		} else {
			text = (target.toString() == "[object Text]" ? target.textContent : target.innerText);
		}
		if (!text) return;
		navigator.clipboard.writeText(text).then(e => {
			if (e) {
				game.alert("复制失败！\n" + e);
			} else {
				game.alert("复制成功！\n" + text);
			}
		});
	};

	class Searcher {
		//构造方法
		constructor() {
			//原先的背景图片
			this.Image = ui.background.style.backgroundImage;
			this.manual = ui.create.div('.Searcher');
			this.menu = ui.create.div('.menu', this.manual);
			this.input = this.menu.appendChild(document.createElement('input'));
			//搜索历史
			this.searchList = game.getExtensionConfig('全能搜索', 'searchList') || [];
			this.datalist = this.menu.appendChild(document.createElement('datalist'));
			this.logindex = -1;
			this.search = ui.create.div('.search', this.menu, '搜索');
			this.clear = ui.create.div('.clear', this.menu, '清空历史', this.clearDataList.bind(this));
			this.close = ui.create.div('.close', this.menu, '关闭');
			this.oldDialog = _status.event.dialog;
			this.dialog = ui.create.dialog();
			this.content = this.manual.appendChild(this.dialog);
			
			this.input.setAttribute('list', '全能搜索_datalist');
			this.datalist.setAttribute('id', '全能搜索_datalist');
			for (let data of this.searchList) {
				let option = document.createElement('option');
				option.value = data;
				this.datalist.appendChild(option);
			}
			
			lib.cheat.i(); //主要函数放在window里
			
			//按下回车键开始搜索
			this.input.onkeydown = e => {
				if (e.keyCode == 13) {
					//回车
					this.tujianBegin(this.content, this.input.value);
					this.input.value = '';
				} else if (e.keyCode == 38) {
					//上一个搜索内容
					if (this.logindex == -1) {
						this.logindex = this.searchList.length - 1;
						this.input.value = this.searchList[this.logindex];
					} else if (this.logindex > 0) {
						this.input.value = this.searchList[--this.logindex];
					} else {
						this.logindex = -1;
						this.input.value = '';
					}
				} else if (e.keyCode == 40) {
					//下一个
					if (this.logindex == -1) {
						this.logindex = 0;
						this.input.value = this.searchList[0];
					} else if (this.logindex + 1 < this.searchList.length) {
						this.input.value = this.searchList[++this.logindex];
					} else {
						this.logindex = -1;
						this.input.value = '';
					}
				}
			};

			this.content.classList.remove('nobutton');
			this.content.classList.add('content');
			this.content.classList.add('fixed');
			this.content.style.transform = '';
			this.content.style.opacity = '';
			this.content.style.height = '';

			//搜索按钮
			this.search.addEventListener('click', () => {
				this.tujianBegin(this.content, this.input.value);
				this.input.value = "";
			});

			this.close.addEventListener('click', () => this.closeDialog());

			ui.arena.classList.remove('menupaused');
			ui.arena.hide();
			ui.system.hide();
			ui.menuContainer.hide();
			ui.window.appendChild(this.manual);
		}
		//关闭方法
		closeDialog() {
			if (!lib.config.dev) {
				//不是开发者模式
				delete window.cheat;
				delete window.game;
				delete window.ui;
				delete window.get;
				delete window.ai;
				delete window.lib;
				delete window._status;
			}
			this.manual.remove();
			ui.arena.show();
			ui.system.show();
			ui.background.style.backgroundImage = this.Image;
			_status.event.dialog = this.oldDialog;
			if (_status.event.dialog) _status.event.dialog.show();
		}
		//清除内容
		clearDialog(dialog) {
			while (dialog.content.hasChildNodes()) {
				dialog.content.removeChild(dialog.content.firstChild);
			}
		}
		//寻找角色
		findCharacter(result) {
			let name = [];
			for (let a in lib.character) {
				if ((lib.translate[a] && lib.translate[a].includes(result))) name.push(a);
				//中文名包含的武将
			}
			if (name.length == 0) return false;
			
			this.dialog.addText('<div style="text-align:center; font-size: 25px;">武将搜索结果</div>');

			for (let i = 0; i < name.length; i++) {
				let character = lib.character[name[i]];
				if (!character) continue; //没有这个武将就跳过这次循环
				this.dialog.addSmall([
					[name[i]], 'character'
				]);
				let str = ''; //展示的html代码
				let allcharacter = lib.characterPack; //所有武将包
				let Packname; //包名
				for (let b in allcharacter) {
					if ((name[i] in allcharacter[b]) && character == allcharacter[b][name[i]]) {
						Packname = lib.translate[b + '_character_config'];
						break;
					}
				}
				let skillstr = '';
				let char3 = character[3];
				let charName = name[i];

				for (let i = 0; i < char3.length; i++) {
					if (lib.translate[char3[i]]) {
						skillstr +=
							`<li>
								<font color="21ffd8" ondblclick="game.全能搜索_copy(this.nextElementSibling.nextElementSibling)">[ ${lib.translate[char3[i]]} ]</font>
								<font color=6df95b>[</font>
								<font color=6df95b>${char3[i]}</font>
								<font color=6df95b>]</font></br>
								<span class="bluetext" ondblclick="game.全能搜索_copy(this.nextSibling)">技能描述&nbsp</span>${lib.translate[char3[i] + '_info']}</br>
								<span class="bluetext">技能语音&nbsp</span>
								<img src='${layoutPath}img/qhly_pic_playaudiobutton.png' alt='点击播放技能语音' onclick='game.trySkillAudio("${char3[i]}", {name:"${charName}"})' style='position: absolute; width: 100px; margin: 0; padding: 0;' /></br>
								<span class="bluetext">技能代码&nbsp</span>
								<a onclick='
								var display = this.parentNode.nextElementSibling.style.display;
								this.parentNode.nextElementSibling.style.display = (display == "none" ? "" : "none");
								this.innerHTML = (display !== "none" ? "点击查看技能代码" : "点击关闭技能代码");
								'>点击查看技能代码</a>
							</li>
							<li style="display: none; list-style-type: none;">
								<font color="21ffd8">[ ${lib.translate[char3[i]]} ] </font>技能代码：</br>
								<pre class="hljs language-javascript" style="user-select:text;-webkit-user-select:text;">${game.全能搜索_highlight(get.stringify(lib.skill[char3[i]]))}</pre>
							</li>`;
					}
				}
				str +=
					`</br><span class="bluetext" ondblclick="game.全能搜索_copy(this.nextSibling)">武将信息&nbsp</span>${ get.characterIntro(charName) } </br>
					<span class="bluetext" ondblclick="game.全能搜索_copy(this.nextSibling)">所在武将包&nbsp</span>${ Packname } </br>
					<span class="bluetext" ondblclick="game.全能搜索_copy(this.nextElementSibling.nextElementSibling)">武将名称&nbsp</span>
					${ lib.translate[charName] }
					<font color=6df95b>[</font>
					<font color=6df95b>${ charName }</font>
					<font color=6df95b>]</font></br>
					<span class="bluetext" ondblclick="game.全能搜索_copy(this.nextSibling)">武将称号&nbsp</span>${ get.colorspan( lib.characterTitle[charName] || "暂无称号" ) } </br>
					<span class="bluetext">武将性别&nbsp</span>${ lib.translate[ character[0]] } </br>
					<span class="bluetext" ondblclick="game.全能搜索_copy(this.nextElementSibling.nextElementSibling)">武将势力&nbsp</span>
					${ lib.translate[character[1]] }
					<font color=6df95b>[</font>
					<font color=6df95b>${ character[1] }</font>
					<font color=6df95b>]</font></br>
					<span class="bluetext">体力上限&nbsp</span>${ character[2] } </br>
					<span class="bluetext">阵亡语音&nbsp</span>
					<img src='${layoutPath}img/qhly_pic_playaudiobutton.png' alt='点击播放阵亡语音' 
					onclick='
					var findInExt = false;
					Object.keys(lib.characterPack).forEach( (key, index, arr) => {
						if(!key.includes("mode_extension_")) return false;
						if("${ charName }" in lib.characterPack[key] 
						&& lib.character["${ charName }"] == lib.characterPack[key]["${ charName }"]) {
							findInExt = key.slice(15);
						}
					});
					if(findInExt){
						game.playAudio("..", "extension", findInExt, "${ charName }", function(){
							game.alert("该扩展武将没有阵亡语音");
						});
					} else if(lib.character["${ charName }"] && lib.character["${ charName }"][4].contains("die_audio")){
						game.playAudio("die", "${ charName }", function(){
							game.alert("该武将没有阵亡语音");
						});
					} else{
						game.playAudio("die", "${ charName }",function(){
							game.playAudio("die", "${ charName }".slice("${ charName }".indexOf("_") + 1), function(){
								game.alert("该武将没有阵亡语音");
							});
						});
					}'
					style='position: absolute; width: 100px; margin: 0; padding: 0;' /> </br>
					<span class="bluetext">武将技能</span>：${ skillstr }
					</br></br></br>`;
				this.dialog.addText(
					`
				<div>
					<div style="display:block; left:auto; text-align:left; font-size: 20px;"> ${str} </div>
				</div>`
				);
			}
		}
		//寻找卡牌
		findCard(result) {
			let name = [];
			for (let a in lib.card) {
				if (lib.translate[a] && lib.translate[a].includes(result)) name.push(a);
			}
			if (name.length == 0) return false;
			
			this.dialog.addText('<div style="text-align:center; font-size: 25px;">卡牌搜索结果</div>');
			
			for (let i = 0; i < name.length; i++) {
				let card = lib.card[name[i]];
				if (!card) continue; //没有这个卡牌就跳过这次循环
				this.dialog.addSmall([
					[name[i]], 'vcard'
				]);
				let str = '';
				let allcard = lib.cardPack;
				let Packname;
				for (let b in allcard) {
					if (allcard[b].contains(name[i])) {
						Packname = lib.translate[b + '_card_config'];
						break;
					}
				}
				str +=
					`</br><span class="bluetext">卡牌名称</span> ${lib.translate[name[i]]} </font>
					<font color=6df95b>[ ${name[i]} ]</font>
						</br><span class="bluetext">卡牌类别</span> ： ${lib.translate[card.type]}
						</br><span class="bluetext">卡牌效果</span>：${lib.translate[name[i] + '_info']}
						</br><span class="bluetext">所在卡牌包</span>：${Packname}
						</br>`;
				if (card.derivation) {
					str += `<span class="bluetext">卡牌来源</span> ：${lib.translate[card.derivation]}</br>`;
				}
				str +=
					`<span class="bluetext">卡牌代码</span>：
					<span style="color:6df95b" onclick='
						var display = this.nextElementSibling.style.display;
						this.nextElementSibling.style.display = display == "none" ? "" : "none";
						this.innerHTML = (display !== "none" ? "点击查看${lib.translate[name[i]]}代码" : "点击关闭${lib.translate[name[i]]}代码");
					'>点击查看${lib.translate[name[i]]}代码</span>
					<span style="display: none;">
						</br>
						<font color="21ffd8">[ ${lib.translate[name[i]]} ] </font>卡牌代码：</br>
						<pre class="hljs language-javascript" style="user-select:text;-webkit-user-select:text;">${game.全能搜索_highlight(get.stringify(card))}</pre>
					</span>
					</br></br></br>`;
				this.dialog.addText(
					`
				<div>
					<div style="display:block; left:auto; text-align:left; font-size: 20px;"> ${str} </div>
				</div>`
				);
			}
		}
		//寻找技能
		findSkill(result) {
			let skills = [];
			for (let a in lib.skill) {
				if ((lib.translate[a] && lib.translate[a].includes(result)) || a === result) skills.push(a);
				//中文名包含的，或者英文id对应的
			}
			if (skills.length == 0) return false;
			let str = '';
			for (let i = 0; i < skills.length; i++) {
				str +=
					`
				<li>
					<font color="21ffd8">[ ${lib.translate[skills[i]]} ]</font>
					<!-- 技能中文名 -->
					<font color=6df95b>[ ${skills[i]} ]</font></br>
					<!-- 技能id -->
					<span class="bluetext">技能描述</span>：${lib.translate[skills[i] + '_info']}</br>
					<span class="bluetext">技能语音</span>：
					<img src='${layoutPath}img/qhly_pic_playaudiobutton.png' alt='点击播放技能语音' onclick='game.trySkillAudio("${skills[i]}")' style='position: absolute; width: 100px; margin: 0; padding: 0;' /></br>
					<span class="bluetext">技能代码</span>：
					<a onclick='
					var display = this.parentNode.nextElementSibling.style.display;
					this.parentNode.nextElementSibling.style.display = (display == "none" ? "" : "none");
					this.innerHTML = (display !== "none" ? "点击查看技能代码" : "点击关闭技能代码");
					'>点击查看技能代码</a>
				</li>
				<li style="display: none; list-style-type: none;">
					<font color="21ffd8">[ ${lib.translate[skills[i]]} ] </font>技能代码：</br>
					<pre class="hljs language-javascript" style="user-select:text;-webkit-user-select:text;">${game.全能搜索_highlight(get.stringify(lib.skill[skills[i]]))}</pre>
				</li>
				</br></br></br>
				`; //展示的html代码
			}
			this.dialog.addText(
				`
			<div>
				<div style="text-align:center; font-size: 25px;">技能搜索结果</div>
				<div style="display:block; left:auto; text-align:left; font-size: 20px;"> ${str} </div>
			</div>`
			);
		}
		//将内容加入到下拉框
		addToDataList(data) {
			if(!this.searchList.contains(data)) {
				let option = document.createElement('option');
				option.value = data;
				this.datalist.appendChild(option);
			}
			this.searchList.add(data);
		}
		//清除历史搜索内容
		clearDataList() {
			while(this.datalist.hasChildNodes()){
				this.datalist.removeChild(this.datalist.firstChild);
			}
			game.saveExtensionConfig('全能搜索', 'searchList');
			game.alert("搜索历史已清空");
		}
		//展示
		tujianBegin(dialog, result) {
			this.clearDialog(dialog);
			if (result === "" || result === null || result === undefined) return game.alert("请输入名称");
			game.saveExtensionConfig('全能搜索', 'searchList', this.searchList);
			this.addToDataList(result);
			if (result.startsWith("character:")) {
				//只寻找武将
				let resultCharacter = this.findCharacter(result.slice(10));
				if (resultCharacter === false) {
					game.alert(`没有符合条件的武将!(搜索内容："${result.slice(10)}")`);
					this.clearDialog(dialog);
				}
			} else if (result.startsWith("card:")) {
				//只寻找卡牌
				let resultCard = this.findCard(result.slice(5));
				if (resultCard === false) {
					game.alert(`没有符合条件的卡牌!(搜索内容："${result.slice(5)}")`);
					this.clearDialog(dialog);
				}
			} else if (result.startsWith("skill:")) {
				//只寻找技能
				let resultSKill = this.findSkill(result.slice(6));
				if (resultSKill === false) {
					game.alert(`没有符合条件的技能!(搜索内容："${result.slice(6)}")`);
					this.clearDialog(dialog);
				}
			} else {
				//全部寻找
				let resultCharacter = this.findCharacter(result);
				let resultCard = this.findCard(result);
				let resultSKill = this.findSkill(result);
				if (resultCharacter === false && resultCard === false && resultSKill === false) {
					game.alert(`没有符合条件的武将，卡牌或技能!(搜索内容："${result}")`);
					this.clearDialog(dialog);
				}
			}
			
			let list = ['相爱相杀', 'picture'].randomGet();
			ui.background.setBackgroundImage("extension/全能搜索/img/" + list + ".png");
		}
	}

	return {
		name: "全能搜索",
		editable: false,
		onremove: function () {
			game.saveExtensionConfig('全能搜索', 'searchList');
		},
		content: function(config, pack) {},
		precontent: function() {},
		help: {},
		config: {
			"loadUpdateContent": {
				clear: true,
				name: '<span style="text-decoration: underline;">点击显示本扩展更新内容<span>',
				intro: '本扩展历史更新内容',
				onclick: function() {
					if(_status.qnssUpdateContent) return false;
					_status.qnssUpdateContent = true;
					
					let oReq = new XMLHttpRequest();
					
					oReq.addEventListener("load", function() {
						let layer = ui.create.div(ui.window, '.updateContent');
						let close = ui.create.div(layer, '.updateContentClose', () => {
							delete _status.qnssUpdateContent;
							layer.remove();
						});
						let content = ui.create.div(layer, {
							innerHTML: this.responseText,
						});
					});
					
					oReq.addEventListener("error", err => {
						delete _status.qnssUpdateContent;
						console.error("获取历史更新内容失败", err);
						alert("获取历史更新内容失败");
					});
					
					oReq.open("GET", lib.assetURL + 'extension/全能搜索/updateContent');
					oReq.send();
				},
			},
			"Searcher": {
				"name": "<span style='text-decoration: underline;'>点击此处进行搜索</span>",
				"clear": true,
				onclick: function() {
					new Searcher();
				},
			}
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
			intro: '',
			author: "",
			diskURL: "",
			forumURL: "",
			version: "1.7",
		},
		files: {
			"character": [],
			"card": [],
			"skill": []
		}
	}
});
