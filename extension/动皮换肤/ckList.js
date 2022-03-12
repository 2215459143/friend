engCkList.import(function (lib, game, ui, get, ai, _status) {

  eng.skins = {
  //魏
    caoying: {
    锋芒毕露:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    xin_zhonghui: {
    谋谟之勋:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    xizhicai: {
    举棋若定: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    caochun: {
    长坂败备: ["ChuChang","GongJi","DaiJi","TeShu"],
    虎年新春: ["ChuChang","DaiJi","TeShu"]
    },
    wangyuanji: {
    鼠年冬至: ["ChuChang","DaiJi","TeShu"]
    },
    re_xuzhu: {
    虎啸生风: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    caoang: {
    竭战鳞伤: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    caochong: {
    五陵英少: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    caopi: {
    牛年清明: ["ChuChang","DaiJi","TeShu"],
    猪年端午: ["ChuChang","DaiJi","TeShu"]
    },
    re_zhenji: {
    牛年清明: ["ChuChang","DaiJi","TeShu"],
    闺中博士: ["ChuChang","DaiJi","TeShu"]
    },
    yangxiu: {
    鼠年端午: ["ChuChang","DaiJi","TeShu"]
    },
    chengyu: {
    泰山捧日: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_dengai: {
    神兵天降: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_guojia: {
    十胜十败: ["ChuChang","GongJi","DaiJi","TeShu"],
    暗香疏影: ["ChuChang","DaiJi","TeShu"]    
    },
    wangji: {
    独秉固志: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_wangyi: {
    轻燕掠影: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_simayi: {
    鹰视狼顾: ["ChuChang","GongJi","DaiJi","TeShu"],
    牛年立冬: ["ChuChang","DaiJi","TeShu"]
    },
    ol_yujin: {
    威严毅重: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_zhangliao: {
    登锋陷阵: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    zhanghe: {
    背水一战: ["ChuChang","DaiJi","TeShu"]
    },
    re_zhangchunhua: {
    宣穆夜袭: ["ChuChang","GongJi","DaiJi","TeShu"],
    牛年立冬: ["ChuChang","DaiJi","TeShu"]
    },
    zhongyao: {
    稳定关右: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    haozhao: {
    手杀: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    sp_wangcan: {
    手杀: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_caozhi: {
    鼠年端午: ["ChuChang","DaiJi","TeShu"]
    },
    simazhao: {
    鼠年冬至: ["ChuChang","DaiJi","TeShu"]
    },
    wanglang: {
    龙袭星落: ["ChuChang","DaiJi","TeShu"]
    },
    simashi: {
    牛年中秋: ["ChuChang","DaiJi","TeShu"]
    },
    yanghuiyu: {
    牛年中秋: ["ChuChang","DaiJi","TeShu"]
    },
    caozhen: {
    虎年新春: ["ChuChang","DaiJi","TeShu"]
    },
    //吴
    daqiao: {
    猪年七夕: ["DaiJi","TeShu"],
    鼠年春分: ["ChuChang","DaiJi"],
    绝世之姿: ["ChuChang","GongJi","DaiJi","TeShu"],
    衣垂绿川: ["ChuChang","DaiJi","TeShu"]
    },
    re_xiaoqiao:{
    如花似朵: ["ChuChang","GongJi","DaiJi","TeShu"],
    采莲江南: ["ChuChang","DaiJi","TeShu"],
    猪年大雪: ["DaiJi","TeShu"]
    
    },
    liuzan: {
    抗音而歌: ["ChuChang","GongJi","DaiJi","TeShu"],
    灵魂歌王: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_sunquan: {
    吴王六剑: ["ChuChang","GongJi","DaiJi","TeShu"],
    猪年端午: ["ChuChang","DaiJi","TeShu"],
    牛年七夕: ["ChuChang","DaiJi","TeShu"],
    },
    re_huanggai: {
    鏖战赤壁: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    ol_lusu: {
    连刘抗曹: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    lingcao: {
    破贼校尉: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    zhoufei: {
    笼中箜响: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    sunru: {
    鱼游濠水: ["ChuChang","GongJi","DaiJi","TeShu"],
    烟水悠悠: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    sunshangxiang: {
    星流霆击: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_sunben: {
    长沙桓王: ["ChuChang","GongJi","DaiJi","TeShu"],
    猪年七夕: ["DaiJi","TeShu"]
    },
    bulianshi: {
    牛年七夕: ["ChuChang","DaiJi","TeShu"]
    },
    xushi: {
    琪花瑶草: ["ChuChang","DaiJi","TeShu"]
    },
    re_luxun: {
    猪年圣诞: ["ChuChang","DaiJi","TeShu"]
    },
    re_sunluban: {
    牛年端午: ["ChuChang","DaiJi","TeShu"]
    },
    re_zhouyu: {
    鼠年春节: ["ChuChang","DaiJi","TeShu"]
    },
    re_sunluyu: {
    牛年端午: ["ChuChang","DaiJi","TeShu"],
    猪年春节: ["ChuChang","DaiJi","TeShu"]
    },
    //群
    liuyan: {
    雄踞益州: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    xurong: {
    烬灭神骇: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    ol_yuanshao: {
    一往无前: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    miheng: {
    击鼓骂曹: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_lvbu: {
    虓虎之勇: ["ChuChang","DaiJi","TeShu"],
    鼠年七夕: ["DaiJi","TeShu"]
    },
    re_caiwenji: {
    泪捻琵琶: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    hetaihou: {
    蛇蝎为心:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_liru: {
    鸩杀少帝:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    sp_zhaoyun: {
    单骑救主:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    liuxie: {
    龙困于渊:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_zhangjiao: {
    迅雷风烈:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    pangdegong: {
    超脱于世:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_zuoci: {
    役使鬼神:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    sp_diaochan: {
    驭魂千机:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_diaochan: {
    绝世倾城:["ChuChang","GongJi","DaiJi","TeShu"],
    鼠年七夕: ["DaiJi","TeShu"]
    },
    xuyou: {
    盛气凌人:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    wutugu: {
    鼠年春节:["ChuChang","DaiJi","TeShu"]
    },
    yj_ganning: {
    肝胆相照:["ChuChang","DaiJi","TeShu"]
    },
    beimihu: {
    鬼渊蝶引:["ChuChang","DaiJi","TeShu"]
    },
    re_dongbai: {
    猪年春节:["ChuChang","DaiJi","TeShu"]
    },
    //蜀
    guanyu: {
    啸风从龙: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_machao: {
    西凉雄狮: ["ChuChang","GongJi","DaiJi","TeShu"],
    雷霆飞骑: ["ChuChang","GongJi","DaiJi","TeShu"],
    牛年春节: ["ChuChang","DaiJi","TeShu"]
    },
    zhugeguo: {
    仙池起舞: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    re_zhaoyun: {
    截江救主: ["ChuChang","GongJi","DaiJi","TeShu"],
    牛年春节: ["ChuChang","DaiJi","TeShu"]
    },
    zhaoxiang: {
    猪年春节: ["ChuChang","DaiJi","TeShu"]
    },
    xiahoushi: {
    猪年中秋:["ChuChang","DaiJi","TeShu"]
    },
    zhangyì: {
    锐不可当: ["ChuChang","GongJi","DaiJi","TeShu"],
    },
    guansuo: {
    鼠年中秋: ["ChuChang","DaiJi","TeShu"]
    },
    guanyinping: {
    鼠年中秋: ["ChuChang","DaiJi","TeShu"]
    },
    zhangfei: {
    据水断桥: ["ChuChang","GongJi","DaiJi","TeShu"],
    猪年中秋: ["ChuChang","DaiJi","TeShu"]
    },
    ol_weiyan: {
    麒麟生角: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    qinmi: {
    冠绝天下: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    mayunlu: {
    猪年大雪: ["DaiJi","TeShu"],
    花海舞枪: ["ChuChang","DaiJi","TeShu"],
    牛年春节: ["ChuChang","DaiJi","TeShu"]
    },
    baosanniang: {
    嫣然一笑: ["ChuChang","DaiJi","TeShu"]
    },
    re_liushan: {
    猪年端午: ["ChuChang","DaiJi","TeShu"]
    },
    liubei: {
    龙骧麟振: ["ChuChang","GongJi","DaiJi","TeShu"],
    明良千古: ["ChuChang","GongJi","DaiJi","TeShu"],
    猪年圣诞: ["ChuChang","DaiJi","TeShu"]
    },
    sp_sunshangxiang: {
    明良千古: ["ChuChang","GongJi","DaiJi","TeShu"],
    猪年圣诞: ["ChuChang","DaiJi","TeShu"]
    },
    huangyueying: {
    木牛流马: ["ChuChang","GongJi","DaiJi","TeShu"],
    明良千古: ["ChuChang","GongJi","DaiJi","TeShu"],
    鼠年春节: ["DaiJi","TeShu"]
    },
    zhugeliang:{
    明良千古: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    //神
    shen_ganning: {
    万人辟易: ["ChuChang","GongJi","DaiJi","TeShu"],
    新春大鬼: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    shen_luxun: {
    绽焰摧枯: ["ChuChang","GongJi","DaiJi","TeShu"]
    },
    shen_zhaoyun: {
    战龙在野:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    shen_simayi: {
    鉴往知来:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    shen_lvmeng: {
    兼资文武:["ChuChang","GongJi","DaiJi","TeShu"]
    },
    shen_zhugeliang: {
    孟章诛邪:["ChuChang","DaiJi","TeShu"]
    },
    shen_zhouyu: {
    陵光引灵:["ChuChang","DaiJi","TeShu"]
    },
    shen_caocao: {
    玄天通冥:["ChuChang","DaiJi","TeShu"]
    },
    shen_lvbu: {
    冠绝天下:["ChuChang","GongJi","DaiJi","TeShu"],
    监兵噬魅:["ChuChang","DaiJi","TeShu"]
    },

  }
  var extend = {
    sunquan:eng.skins.re_sunquan,
    jsp_guanyu: eng.skins.guanyu,
    re_guanyu: eng.skins.guanyu,
    re_zhonghui: eng.skins.xin_zhonghui,
    xin_yuanshao: eng.skins.ol_yuanshao,
    re_yuanshao: eng.skins.ol_yuanshao,
    ol_xiaoqiao: eng.skins.re_xiaoqiao,
    re_daqiao: eng.skins.daqiao,
    re_sunshangxiang: eng.skins.sunshangxiang,
    re_baosanniang: eng.skins.baosanniang,
    xin_baosanniang: eng.skins.baosanniang,
    re_liubei: eng.skins.liubei,
    re_huangyueying: eng.skins.huangyueying,
    re_caozhen: eng.skins.caozhen,
    re_liuzan: eng.skins.liuzan,
    re_caopi: eng.skins.caopi,
    re_bulianshi: eng.skins.bulianshi,
    old_bulianshi: eng.skins.bulianshi,
    re_zhugeliang: eng.skins.zhugeliang,
    re_weiyan: eng.skins.ol_weiyan,
  };
  engCkList.extend(eng.skins, extend);

})
