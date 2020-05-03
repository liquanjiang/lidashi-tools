"use strict";
/**
 * author: liquanjiang
 * date: 2020-05-02
 * description:
 * 前端开发工作中常用的一些小工具的集合
 * 特点：
 * 1.为了方便在日后开发过程中使用
 * 2.函数式编程，对输入参数没有影响，无副作用
 * 3.包含了边界处理和错误抛出console.error
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var LIDASHITools = {
    /**
     * 将数字或字符串表示的人民币单位元转化为分，结果保留整数
     * @param {string | number} yuan
     * @return {string | number} fen
     * 1. 当传入的值为空或undefined、null或非数字型字符串时，返回错误信息，并console.error错误信息
     * 2. 当传入的值为0或等于 0时，返回 0
     * 3. 当传入的值为合法数字或数字字符串时，返回传入值乘以100的数字
     * 4. 超出精度范围的省略
     */
    transformYuan2Fen: function (yuan) {
        var error;
        if (!yuan && yuan !== 0) {
            error = '参数不能为空';
            console.error(error);
            return error;
        }
        if (yuan === 0) {
            return 0;
        }
        var Y = typeof yuan === 'string' ? Number.parseFloat(yuan) : Number(yuan);
        if (Number.isNaN(Y)) { // 如果不是合法的数字字符串
            error = '请传入合法的数字或数字字符串';
            console.error(error);
            return error;
        }
        return Math.floor(Y * 100);
    },
    /**
     * 将数字或字符串表示的人民币单位分转化为元，结果保留两位小数
     * @param {string | number} fen
     * @return {string | number} yuan
     * 1. 当传入的值为空或undefined、null或非数字型字符串时，返回错误信息，并console.error错误信息
     * 2. 当传入的值为0或等于 0时，返回 0.00
     * 3. 当传入的值为合法数字或数字字符串时，返回传入值除以100，并保留两位小数
     * 4. 超出精度范围的则忽略
     */
    transformFen2Yuan: function (fen) {
        var error;
        if (!fen && fen !== 0) {
            error = '参数不能为空';
            console.error(error);
            return error;
        }
        if (fen === 0) {
            return 0.00;
        }
        var F = typeof fen === 'string' ? Number.parseInt(fen) : Number(fen);
        if (Number.isNaN(F)) { // 如果不是合法的数字字符串
            error = '请传入合法的数字或数字字符串';
            console.error(error);
            return error;
        }
        return (F / 100).toFixed(2);
    },
    /**
     * 生成一个指定长度的，并且不与指定数组中的元素重复的随机字符串
     * @param {number} len 指定返回字符串的长度
     * @param {Array} Array string[] 传入的字符串数组，可以不传
     * @return {string} string 指定长度的字符串
     * 1. len，Array非必传,
     * 2. 如果不传len 时，默认为10，不传Array时，默认为[]
     * 3. 没有Array 或 Array为空时，不校验重复性
     * 4. 返回值，与Array中不重复的字符串
     *
     */
    randomString: function (len, Array) {
        if (len === void 0) { len = 10; }
        if (Array === void 0) { Array = []; }
        if (len === 0) {
            var error = '不能传入长度为0的参数';
            console.error(error);
            return error;
        }
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        ];
        var string = '';
        for (var i = 0; i < len; i++) {
            var random = Math.floor(53 * Math.random());
            string += array[random];
        }
        // 当数组中已经有这个字符串时，再生成一次， 直到没有重复的为止
        return Array.includes(string) ? LIDASHITools.randomString(len, Array) : string;
    },
    /**
     * 将字符串中的半角字符全部转为全角字符
     * @param {string} str
     * @returns {string} string
     * 1. 将传入字符串中的半角字符转为全角，并返回
     * 2. 如果传入的为空字符串，则返回空字符串
     */
    string2FullWidth: function (str) {
        var result = '';
        var len = str.length;
        for (var i = 0; i < len; i++) {
            var cCode = str.charCodeAt(i);
            // 全角与半角相差（除空格外）：65248(十进制)
            cCode = (cCode >= 0x0021 && cCode <= 0x007E) ? (cCode + 65248) : cCode;
            // 处理空格
            cCode = (cCode == 0x0020) ? 0x03000 : cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
    },
    /**
     * 将字符串中的全角字符全部转为半角字符
     * @param {string} str
     * @returns {string} string
     * 1. 将传入字符串中的全角字符转为半角，并返回
     * 2. 如果传入的为空字符串，则返回空字符串
     */
    string2HalfWidth: function (str) {
        var result = '';
        var len = str.length;
        for (var i = 0; i < len; i++) {
            var cCode = str.charCodeAt(i);
            // 全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode >= 0xFF01 && cCode <= 0xFF5E) ? (cCode - 65248) : cCode;
            // 处理空格
            cCode = (cCode === 0x03000) ? 0x0020 : cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
    },
    /**
     * 提取出一个url中的所有查询参数，如果有重复的key，则置为数组
     * @param {string} url
     * @return {object} obj
     * 1. 提取出所有的key和value，
     * 2. 如果key有重复的，则置为数组
     * 3. 如果为空，则置为空字符串或其指定的值
     */
    queryParams: function (url) {
        var error;
        var queryObject = {};
        // 如果没有?说明传入字符串不合法
        if (!url.includes('?')) {
            error = '请传入合法的url或查询字符串';
            console.error(error);
            return error;
        }
        // 如果有多个?说明传入字符串不合法
        var index = url.indexOf('?');
        var lastIndex = url.indexOf('?');
        if (index !== lastIndex) {
            error = '请传入合法的url或查询字符串';
            console.error(error);
            return error;
        }
        // 如果传入的值合法
        var queryString = url.substr(index + 1);
        // 将字符串根据 & 符号进行分割
        var queryArray = queryString.split('&');
        queryArray.forEach(function (item) {
            // 将获取到的参数数组，以 = 符号进行分割
            var paramArray = item.split('=');
            var key = paramArray[0];
            if (Array.isArray(queryObject[key])) {
                queryObject[key].push(paramArray[1]);
            }
            else {
                queryObject[key] = [];
                queryObject[key].push(paramArray[1]);
            }
        });
        // 遍历查询对象中的key,将数组长度只有1的变回字符串
        var keys = Object.keys(queryObject);
        keys.forEach(function (key) {
            if (Array.isArray(queryObject[key])) {
                if (queryObject[key].length === 1) {
                    queryObject[key] = queryObject[key][0];
                }
            }
        });
        // 返回查询对象
        return queryObject;
    },
    /**
     * 返回一个数字数组中的最大值，
     * @param {number[]} Array
     * @return {number | undefined} number
     */
    maxOfArray: function (Array) {
        if (Array.length === 0) {
            return undefined;
        }
        return Math.max.apply(null, Array);
    },
    /**
     * 返回一个数字数组中的最小值，
     * @param {number[]} Array
     * @return {number | undefined} number
     */
    minOfArray: function (Array) {
        if (Array.length === 0) {
            return undefined;
        }
        return Math.min.apply(null, Array);
    },
    /**
     * 返回浏览器的信息，包含名称，版本号，
     *
     *
     */
    exploreInfo: function () {
        // 获取初始化的浏览器信息
        var browserInfo = {
            is360: false,
            isIE: false,
            isChrome: false,
            isFireFox: false,
            isEdge: false,
            isOpera: false,
            isSafari: false,
            isQQ: false,
            isUC: false,
            isLB: false,
            isSE: false,
            isMaxthon: false,
            browserName: '',
            browserNameCN: '',
            version: '',
        };
        var MsIE = /(msie\s|trident\/7)([\w.]+)/; // IE浏览器的判断
        var Trident = /(trident)\/([\w.]+)/; // IE浏览器内核
        var Edge = /(edge)\/([\w.]+)/; //Edge浏览器
        var Firefox = /(firefox)\/([\w.]+)/; // 火狐浏览器
        var Opera = /(opera).+version\/([\w.]+)/; // 旧Opera
        var NewOpera = /(opr)\/(.+)/; // 新Opera 基于谷歌
        var Chrome = /(chrome)\/([\w.]+)/; // 谷歌浏览器
        var Safari = /(safari)\/([\w.]+)/; // 苹果浏览器
        var UC = /(u(c*)browser)\/([\w.]+)/; // UC浏览器
        var LB = /(lbbrowser)/; // 猎豹浏览器
        var QQ = /(qqbrowser)\/([\w.]+)/; // QQ浏览器
        var SE = /(se 2\.[0-9x] metasr 1\.[0-9x])/; // 搜狗浏览器
        var MAXTHON = /(maxthon)\/([\w\d]+)/; // 遨游浏览器
        // 获取当前浏览器的userAgent信息
        var userAgent = window.navigator.userAgent.toLowerCase();
        /**
         * 判断是否为IE浏览器
         * @type {RegExpExecArray | null}
         */
        var IEVersionArray = [
            { type: '4.0', name: '8' }, { type: '5.0', name: '9' },
            { type: '6.0', name: '10' }, { type: '7.0', name: '11' },
        ];
        // 判断是否为IE浏览器
        var isIE = MsIE.exec(userAgent);
        if (isIE !== null) {
            var isLowIE = Trident.exec(userAgent);
            if (isLowIE !== null) {
                var IEVersion_1 = '';
                var tridentVersion_1 = isLowIE[2];
                // 获取低版本IE的版本号
                IEVersionArray.forEach(function (item) {
                    var _a = item.type, type = _a === void 0 ? '' : _a, _b = item.name, name = _b === void 0 ? '' : _b;
                    if (type === tridentVersion_1) {
                        IEVersion_1 = name;
                    }
                });
                if (IEVersion_1) {
                    browserInfo.isIE = true;
                    browserInfo.browserName = "Microsoft Internet Explorer " + IEVersion_1;
                    browserInfo.browserNameCN = "\u5FAE\u8F6FIE" + IEVersion_1 + "\u6D4F\u89C8\u5668";
                }
            }
        }
        /**
         * 判断是否为Edge浏览器
         * @type {RegExpExecArray | null}
         */
        var isEdge = Edge.exec(userAgent);
        if (isEdge !== null) {
            var version = isEdge[2];
            browserInfo.isEdge = true;
            browserInfo.version = version;
            browserInfo.browserName = "Microsoft Edge";
            browserInfo.browserNameCN = "\u5FAE\u8F6FEdge\u6D4F\u89C8\u5668";
        }
        /**
         * 火狐浏览器（Firefox）
         * userAgent中包含Firefox字符串
         */
        var isFirefox = Firefox.exec(userAgent);
        if (isFirefox !== null) {
            var version = isFirefox[2];
            browserInfo.isFireFox = true;
            browserInfo.version = version;
            browserInfo.browserName = "Firefox";
            browserInfo.browserNameCN = "\u706B\u72D0\u6D4F\u89C8\u5668";
        }
        /**
         * 旧版opera浏览器
         *
         */
        var isOpera = Opera.exec(userAgent);
        if (isOpera !== null) {
            var version = isOpera[2];
            browserInfo.isOpera = true;
            browserInfo.version = version;
            browserInfo.browserName = "Opera";
            browserInfo.browserNameCN = "\u6B27\u9E4F\u6D4F\u89C8\u5668";
        }
        /**
         * 新版opera浏览器
         *
         */
        var isNewOpera = NewOpera.exec(userAgent);
        if (isNewOpera !== null) {
            var version = isNewOpera[2];
            browserInfo.isOpera = true;
            browserInfo.version = version;
            browserInfo.browserName = "Opera";
            browserInfo.browserNameCN = "\u6B27\u9E4F\u6D4F\u89C8\u5668";
        }
        /**
         * Safari浏览器
         *
         */
        var isSafari = Safari.exec(userAgent);
        var isMac = userAgent.includes('macintosh') || userAgent.includes('mac os');
        if (isMac && isSafari !== null) {
            var version = isSafari[2];
            browserInfo.isSafari = true;
            browserInfo.version = version;
            browserInfo.browserName = "Safari";
            browserInfo.browserNameCN = "\u82F9\u679C\u6D4F\u89C8\u5668";
        }
        /**
         * UC浏览器
         *
         */
        var isUC = UC.exec(userAgent);
        if (isUC !== null) {
            var version = isUC[2];
            browserInfo.isUC = true;
            browserInfo.version = version;
            browserInfo.browserName = "UCBrowser";
            browserInfo.browserNameCN = "UC\u6D4F\u89C8\u5668" + version;
        }
        /**
         * QQ浏览器
         *
         */
        var isQQ = QQ.exec(userAgent);
        if (isQQ !== null) {
            var version = isQQ[2];
            browserInfo.isQQ = true;
            browserInfo.version = version;
            browserInfo.browserName = "QQBrowser";
            browserInfo.browserNameCN = "QQ\u6D4F\u89C8\u5668";
        }
        /**
         * 猎豹浏览器
         *
         */
        var isLB = LB.exec(userAgent);
        if (isLB !== null) {
            var version = isLB[2];
            browserInfo.isLB = true;
            browserInfo.version = version;
            browserInfo.browserName = "liebaoBrowser}";
            browserInfo.browserNameCN = "\u730E\u8C79\u6D4F\u89C8\u5668";
        }
        /**
         * 搜狗浏览器
         *
         */
        var isSE = SE.exec(userAgent);
        if (isSE !== null) {
            browserInfo.isSE = true;
            browserInfo.version = '';
            browserInfo.browserName = "SogouBrowser";
            browserInfo.browserNameCN = "\u641C\u72D7\u6D4F\u89C8\u5668";
        }
        /**
         * 遨游浏览器
         *
         */
        var isMaxthon = MAXTHON.exec(userAgent);
        if (isMaxthon !== null) {
            var version = isMaxthon[2];
            browserInfo.isSE = true;
            browserInfo.version = version;
            browserInfo.browserName = "AoyouBrowser";
            browserInfo.browserNameCN = "\u9068\u6E38\u6D4F\u89C8\u5668";
        }
        /**
         * 谷歌浏览器
         *
         */
        var isChrome = Chrome.exec(userAgent);
        var _a = window.navigator, plugins = _a.plugins, mimeTypes = _a.mimeTypes;
        // 排除猎豹、QQ、UC、苹果、Edge、Opera、搜狗、遨游浏览器
        if (!isLB && !isQQ && !isUC && !isSafari && !isEdge && !isSE && !isOpera && !isNewOpera && !isMaxthon && isChrome !== null) {
            /**
             * 因为360浏览器当中插件很多，因此可以通过这个来判断
             */
            if (plugins.length > 20 && mimeTypes.length > 20) {
                var version = isChrome[2];
                browserInfo.is360 = true;
                browserInfo.version = version;
                browserInfo.browserName = "360Browser";
                browserInfo.browserNameCN = "360\u6D4F\u89C8\u5668";
            }
            else {
                var version = isChrome[2];
                browserInfo.isChrome = true;
                browserInfo.version = version;
                browserInfo.browserName = "Chrome";
                browserInfo.browserNameCN = "\u8C37\u6B4C\u6D4F\u89C8\u5668";
            }
        }
        return browserInfo;
    },
    exploreDetailsInformation: function () {
        var Info = {
            platform: '',
            appVersion: '',
            appCodeName: '',
            appName: '',
            systemOS: '' // 当前操作系统
        };
        var os = /(mac os [\w] ([0-9_]+))/;
        var ios = /(iphone os ([\w\d._]_)+)/;
        var android = /(android ([\w\d._]+))/;
        var userAgent = window.navigator.userAgent.toLowerCase();
        Info.appName = window.navigator.appName;
        Info.appCodeName = window.navigator.appCodeName;
        Info.appVersion = window.navigator.appVersion;
        Info.platform = window.navigator.platform;
        // windows操作系统返回的platform
        var windows = ['Win32', 'Win64', 'wow64'];
        var ntVersion = ['windows nt 5.0', 'windows nt 5.1', 'windows nt 5.2', 'windows nt 6.0', 'windows nt 6.1', 'windows nt 6.2', 'windows nt 10.0'];
        var windowVersion = ['windows 2000', 'windows XP', 'windows 2003', 'windows vista', 'windows 7', 'windows 8', 'windows 10'];
        // mac操作系统返回的platform
        var Mac = ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'];
        // Unix操作系统
        var unix = ['X11'];
        // Linux操作系统
        var Linux = ['Linux'];
        // iphone 操作系统
        var iphone = ['iPhone'];
        // 获取当前浏览器的操作系统信息
        var _a = window.navigator.platform, platform = _a === void 0 ? '' : _a;
        // 是否windows操作系统
        var isWin = windows.includes(platform);
        if (isWin) {
            var index1 = ntVersion.findIndex(function (item) {
                return userAgent.includes(item);
            });
            var index2 = windowVersion.findIndex(function (item) {
                return userAgent.includes(item);
            });
            var num = userAgent.includes('win64') || userAgent.includes('wow64') ? '64位' : '32位';
            if (index1 > -1 || index2 > -1) {
                var index = index1 > -1 ? index1 : index2;
                Info.systemOS = windowVersion[index] + " " + num;
            }
        }
        // 是否为Mac操作系统
        var isMac = Mac.includes(platform);
        if (isMac) {
            var Macos = os.exec(userAgent);
            if (Macos !== null) {
                var version = Macos[1];
                Info.systemOS = version.toUpperCase() + " 64\u4F4D";
            }
        }
        // 是否为Unix操作系统
        var isUnix = unix.includes(platform);
        if (!isMac && !isWin && isUnix) {
            Info.systemOS = "Unix";
        }
        // 是否为android操作系统
        var isLinux = Linux.includes(platform);
        var isAndroid = userAgent.includes('android');
        if (isLinux) {
            if (isAndroid) {
                var Androids = android.exec(userAgent);
                if (Androids !== null) {
                    Info.systemOS = "Android " + Androids[2];
                }
                else {
                    Info.systemOS = "Android";
                }
            }
            Info.systemOS = isAndroid ? 'android' : 'Linux';
        }
        // 是否为iphone操作系统
        var isIphone = iphone.includes(platform);
        if (isIphone) {
            var IOS = ios.exec(userAgent);
            if (IOS) {
                Info.systemOS = "IOS " + IOS[2].replace(/_/g, '.');
            }
        }
        return Info;
    },
    /**
     * 判断一个手机号码是否合法
     * @param {string | number} phone
     * @return boolean
     */
    isValidatePhoneNumber: function (phone) {
        var phoneString = String(phone);
        if (!phoneString || phoneString.length !== 11) {
            return false;
        }
        var phoneReg = /^1((3[0-9])|(4[5-9])|(5[0-3,5-9])|(6[2567])|(7[0-8])|(8[0-9])|(9[0-3,5-9]))([0-9]{8})$/;
        return phoneReg.test(phoneString);
    },
    /**
     * 判断一个身份证号码是否合法
     * @param ID
     * @return boolean
     * 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
     * 身份证正则表达式    /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
     * 15位校验规则 6位地址编码+6位出生日期+3位顺序号
     * 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
     * 校验位规则 公式:∑(ai×Wi)(mod 11)……………………………………(1)
     * 公式(1)中：
     * i----表示号码字符从由至左包括校验码在内的位置序号；
     * ai----表示第i位置上的号码字符值；
     * Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
     * i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
     * Wi [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
     * 最后一位取值范围: [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
     *
     */
    isValidateIDNumber: function (ID) {
        var IDString = String(ID);
        if (!IDString || (IDString.length !== 15 && IDString.length !== 18)) {
            return false;
        }
        var numberReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
        // 如果不符合身份证号基本规则，返回false
        if (!numberReg.test(IDString)) {
            return false;
        }
        var city = [
            { key: 11, name: '北京' }, { key: 12, name: '天津' }, { key: 13, name: '河北' }, { key: 14, name: '山西' }, {
                key: 15,
                name: '内蒙古'
            },
            { key: 21, name: '辽宁' }, { key: 22, name: '吉林' }, { key: 23, name: '黑龙江' },
            { key: 31, name: '上海' }, { key: 32, name: '江苏' }, { key: 33, name: '浙江' }, { key: 34, name: '安徽' }, {
                key: 35,
                name: '福建'
            }, { key: 36, name: '江西' }, { key: 37, name: '山东' },
            { key: 41, name: '河南' }, { key: 42, name: '湖北' }, { key: 43, name: '湖南' }, { key: 44, name: '广东' }, {
                key: 45,
                name: '广西'
            }, { key: 46, name: '海南' },
            { key: 50, name: '重庆' }, { key: 51, name: '四川' }, { key: 52, name: '贵州' }, { key: 53, name: '云南' }, {
                key: 54,
                name: '西藏'
            },
            { key: 61, name: '陕西' }, { key: 62, name: '甘肃' }, { key: 63, name: '青海' }, { key: 64, name: '宁夏' }, {
                key: 65,
                name: '新疆'
            },
            { key: 71, name: '台湾' }, { key: 81, name: '香港' }, { key: 82, name: '澳门' }, { key: 91, name: '国外' }
        ];
        var cityCode = IDString.substring(0, 2);
        var isCity = city.find(function (item) {
            return item.key.toString() === cityCode;
        });
        // 如果前两位表示地区的代码不符合，则范围错误
        if (isCity === undefined) {
            return false;
        }
        // 校验最后一位校验位
        if (IDString.length === 18) {
            var codes = IDString.split('');
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0, ai = 0, wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = Number(codes[i]);
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11].toString();
            if (last !== codes[17]) {
                return false;
            }
        }
        return true;
    },
    /**
     * 判断一个邮箱的地址是否合法
     * @param {string} email
     * @return {boolean} boolean
     */
    isValidateEmail: function (email) {
        if (!email || !email.includes('@') || !email.includes('.')) {
            return false;
        }
        var pattern = /^([\w1-9])+([\-\w\d._])*(\w\d)+@([\w\d\-_]{2,}\.)*([\w\d]{2,})\.([\w]{2,4})$/;
        var domains = ['qq.com', '126.com', '189.com', '163.com', 'vip.163.com', '263.net', 'yeah.net', 'sohu.com', 'sina.cn', 'sina.com', 'eyou.com', 'gmail.com', 'hotmail.com', '42du.cn'];
        if (pattern.test(email)) {
            var domain = email.substring(email.indexOf('@') + 1);
            if (domains.includes(domain)) {
                return true;
            }
        }
        return pattern.test(email);
    },
    /**
     * 去掉一个字符串或数组中的非数字字符串，只剩下数组
     * @paran {string | any[]} param
     * @return string | number[]
     */
    justLeftNumber: function (param) {
        if (typeof param === 'string') {
            var array = Array.from(param);
            var result = array.filter(function (item) {
                var num = Number.parseInt(item);
                return !Number.isNaN(num);
            });
            return result.reduce(function (total, item) {
                total += item;
                return total;
            }, '');
        }
        else if (Array.isArray(param)) {
            var arr_1 = [];
            param.forEach(function (item) {
                if (typeof item === 'number' && !Number.isNaN(item)) {
                    arr_1.push(item);
                }
            });
            return arr_1;
        }
        else {
            var error = '请输入正确的格式';
            console.error(error);
            return error;
        }
    },
    /**
     * 去除一个字符串或数组中的其他元素，只保留中文
     * @return string | string[]
     * @param param
     */
    justLeftCN: function (param) {
        var CNReg = /^[\u4e00-\u9fa5]$/;
        if (typeof param === 'string') {
            var array = Array.from(param);
            var result = array.filter(function (item) { return CNReg.test(item); });
            return result.reduce(function (total, item) {
                total += item;
                return total;
            }, '');
        }
        else if (Array.isArray(param)) {
            return param.filter(function (item) { return (typeof item === 'string') && CNReg.test(item); });
        }
        else {
            var error = '请输入正确的格式';
            console.error(error);
            return error;
        }
    },
    /**
     * 移除数组中的所有与指定元素相同的元素
     * @return
     * @param {[]} Array
     * @param {string | null | undefined | number | boolean} element
     */
    removeFromArray: function (Array, element) {
        return Array.filter(function (item) { return item !== element; });
    },
    /**
     * 将小数点之后的数字全部转化为汉字
     * @param {number} number
     * @param {boolean} isBig
     * @param {boolean} isMoney
     * @return string
     *
     */
    littleNumber2CN: function (number, isBig, isMoney) {
        if (isBig === void 0) { isBig = false; }
        if (isMoney === void 0) { isMoney = false; }
        var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var stringArr = isBig || isMoney ? chnBigChar : chnNumChar;
        // 因为在金额中，小数点通常保留两位，那么小数点后的字符就可以辨识为x角x分
        var numberString = number.toString();
        var len = numberString.length;
        var flag = numberString.includes('.');
        if (flag && (numberString.indexOf('.') === 0 || numberString.indexOf('.') === len - 1)) {
            var error = '小数点不能在第一位或最后一位';
            console.error(error);
            return error;
        }
        if (isMoney) {
            if (flag) {
                var index = numberString.indexOf('.');
                if (index <= numberString.length - 2) {
                    // 说明其小数点后超过两位
                    var num = number.toFixed(2);
                    var numString = num.toString();
                    var str = numString.slice(index + 1);
                    var arr = Array.from(str);
                    return arr.reduce(function (total, item, idx) {
                        var strRmb = idx === 0 ? '角' : '分';
                        var strs = stringArr[Number.parseInt(item)];
                        total += idx <= 1 ? "" + strs + strRmb : '';
                        return total;
                    }, '');
                }
                else {
                    // 说明小数点后只有一位
                    var num = number.toFixed(1);
                    var numString = num.toString();
                    var str = numString.slice(index + 1);
                    var strs = stringArr[Number.parseInt(str)];
                    return strs + "\u89D2";
                }
            }
            else {
                return '圆整';
            }
        }
        if (flag) {
            var index = numberString.indexOf('.');
            var str = numberString.slice(index);
            var a = '点';
            for (var i = 1; i < str.length; i++) {
                a += stringArr[parseInt(str[i])];
            }
            return a;
        }
        else {
            return '';
        }
    },
    /**
     * 定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
     * @param section
     * @param isBig
     * @param isMoney
     * @return string
     */
    sectionToChinese: function (section, isBig, isMoney) {
        if (isBig === void 0) { isBig = false; }
        if (isMoney === void 0) { isMoney = false; }
        var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var chnUnitChar = isMoney ? ['', '拾', '佰', '仟'] : ['', '十', '百', '千'];
        var stringArr = isBig || isMoney ? chnBigChar : chnNumChar;
        var str = '', chnstr = '', zero = false, count = 0; //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
        while (section > 0) {
            var v = section % 10; //对数字取余10，得到的数即为个位数
            if (v == 0) { //如果数字为零，则对字符串进行补零
                if (zero) {
                    zero = false; //如果遇到连续多次取余都是0，那么只需补一个零即可
                    chnstr = stringArr[v] + chnstr;
                }
            }
            else {
                zero = true; //第一次取余之后，如果再次取余为零，则需要补零
                str = stringArr[v];
                str += chnUnitChar[count];
                chnstr = str + chnstr;
            }
            count++;
            section = Math.floor(section / 10);
        }
        return chnstr;
    },
    /**
     * 将数字格式的金额转化为汉字
     * @param number
     * @param isBig
     * @param isMoney
     * @return string
     */
    transformNumber2CN: function (number, isBig, isMoney) {
        if (isBig === void 0) { isBig = false; }
        if (isMoney === void 0) { isMoney = false; }
        var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
        var stringArr = isBig ? chnBigChar : chnNumChar;
        var numbers;
        if (typeof number === 'string') {
            numbers = Number.parseFloat(number);
            if (Number.isNaN(numbers)) {
                var error = '请输入正确格式的数字字符串';
                console.error(error);
                return error;
            }
        }
        else {
            numbers = number;
        }
        if (numbers > 9007199254740992) {
            var error = 'JS中超过2的53次方的数字会精度丢失，故参数不要超过9007199254740992';
            console.error(error);
            return error;
        }
        var littleNum = LIDASHITools.littleNumber2CN(numbers, isBig, isMoney);
        var num = Math.floor(numbers);
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;
        if (num === 0) {
            return stringArr[0];
        }
        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = stringArr[0] + chnStr;
            }
            strIns = LIDASHITools.sectionToChinese(section, isBig, isMoney);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }
        var s = isMoney ? '圆' : '';
        return "" + chnStr + s + littleNum;
    }
};
exports.default = LIDASHITools;
