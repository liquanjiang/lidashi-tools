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

interface AnyObject {
  [key: string]: any;
}

interface Tools {
  // 将数字或字符串表示的人民币单位元转化为分
  transformYuan2Fen: (yuan: string | number) => number | string;

  // 将整数或字符串表示的人民币单位分转化为元，支持保留指定位数的小数，默认为两位小数
  transformFen2Yuan: (fen: string | number) => number | string;

  // 生成一个指定长度、且不与指定数组中其他字符串相同的的随机字符串
  randomString: (len?: number, Array?: string[]) => string;

  // 将字符串中的全角字符全部替换为半角
  string2FullWidth: (str: string) => string;

  // 将字符串中的半角字符全部替换为全角
  string2HalfWidth: (str: string) => string;

  // 获取URL中的查询参数
  queryParams: (url: string) => object | string;

  // 获取一个数字数组中的最大值
  maxOfArray: (Array: number[]) => number | undefined;

  // 获取一个数字数组中的最小值
  minOfArray: (Array: number[]) => number | undefined;

  // 获取当前浏览器的名称和编号
  exploreInfo: () => object;

  // 获取当前浏览器的详细信息
  exploreDetailsInformation: () => object;

  // 判断一个身份证号是否合法
  isValidateIDNumber: (ID: number | string) => boolean;

  // 判断一个邮箱地址是否合法
  isValidateEmail: (email: string) => boolean;

  // 判断一个手机号码是否合法
  isValidatePhoneNumber: (phone: number | string) => boolean;

  // 去掉一个字符串或数组中的其他字符，只保留数字
  justLeftNumber: (param: string | any[]) => string | number[]

  // 去掉一个字符串或数组中的其他字符，只保留中文
  justLeftCN: (param: string | any[]) => string | string[]

  // 移除数组中的指定元素
  removeFromArray: (Array: any[], element: string | number | boolean | null | undefined) => any[]

  // 将小数点之后的数字转为汉字
  littleNumber2CN: (number: number, isBig: boolean, isMoney: boolean) => string

  // 定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
  sectionToChinese: (section: number, isBig: boolean, isMoney: boolean) => string

  // 将金额的数字转为汉字形式的数字表示方法
  transformNumber2CN: (Number: number | string, isBig: boolean, isMoney: boolean) => string;
}

const LIDASHITools: Tools = {

  /**
   * 将数字或字符串表示的人民币单位元转化为分，结果保留整数
   * @param {string | number} yuan
   * @return {string | number} fen
   * 1. 当传入的值为空或undefined、null或非数字型字符串时，返回错误信息，并console.error错误信息
   * 2. 当传入的值为0或等于 0时，返回 0
   * 3. 当传入的值为合法数字或数字字符串时，返回传入值乘以100的数字
   * 4. 超出精度范围的省略
   */

  transformYuan2Fen(yuan) {
    let error: string
    if (!yuan && yuan !== 0) {
      error = '参数不能为空'
      console.error(error)
      return error
    }
    if (yuan === 0) {
      return 0
    }
    const Y = typeof yuan === 'string' ? Number.parseFloat(yuan) : Number(yuan)
    if (Number.isNaN(Y)) { // 如果不是合法的数字字符串
      error = '请传入合法的数字或数字字符串'
      console.error(error)
      return error
    }
    return Math.floor(Y * 100)
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

  transformFen2Yuan(fen) {
    let error: string
    if (!fen && fen !== 0) {
      error = '参数不能为空'
      console.error(error)
      return error
    }
    if (fen === 0) {
      return 0.00
    }
    const F = typeof fen === 'string' ? Number.parseInt(fen) : Number(fen)
    if (Number.isNaN(F)) { // 如果不是合法的数字字符串
      error = '请传入合法的数字或数字字符串'
      console.error(error)
      return error
    }
    return (F / 100).toFixed(2)
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

  randomString(len = 10, Array = []) {
    if (len === 0) {
      const error = '不能传入长度为0的参数'
      console.error(error)
      return error
    }
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ]
    let string = ''
    for (let i = 0; i < len; i++) {
      const random = Math.floor(53 * Math.random())
      string += array[random]
    }
    // 当数组中已经有这个字符串时，再生成一次， 直到没有重复的为止
    return Array.includes(string) ? LIDASHITools.randomString(len, Array) : string
  },

  /**
   * 将字符串中的半角字符全部转为全角字符
   * @param {string} str
   * @returns {string} string
   * 1. 将传入字符串中的半角字符转为全角，并返回
   * 2. 如果传入的为空字符串，则返回空字符串
   */

  string2FullWidth(str) {
    let result = ''
    const len = str.length
    for (let i = 0; i < len; i++) {
      let cCode = str.charCodeAt(i)
      // 全角与半角相差（除空格外）：65248(十进制)
      cCode = (cCode >= 0x0021 && cCode <= 0x007E) ? (cCode + 65248) : cCode
      // 处理空格
      cCode = (cCode == 0x0020) ? 0x03000 : cCode
      result += String.fromCharCode(cCode)
    }
    return result
  },

  /**
   * 将字符串中的全角字符全部转为半角字符
   * @param {string} str
   * @returns {string} string
   * 1. 将传入字符串中的全角字符转为半角，并返回
   * 2. 如果传入的为空字符串，则返回空字符串
   */

  string2HalfWidth(str) {
    let result = ''
    const len = str.length
    for (let i = 0; i < len; i++) {
      let cCode = str.charCodeAt(i)
      // 全角与半角相差（除空格外）：65248（十进制）
      cCode = (cCode >= 0xFF01 && cCode <= 0xFF5E) ? (cCode - 65248) : cCode
      // 处理空格
      cCode = (cCode === 0x03000) ? 0x0020 : cCode
      result += String.fromCharCode(cCode)
    }
    return result
  },

  /**
   * 提取出一个url中的所有查询参数，如果有重复的key，则置为数组
   * @param {string} url
   * @return {object} obj
   * 1. 提取出所有的key和value，
   * 2. 如果key有重复的，则置为数组
   * 3. 如果为空，则置为空字符串或其指定的值
   */

  queryParams(url) {
    let error: string
    let queryObject: AnyObject = {}

    // 如果没有?说明传入字符串不合法
    if (!url.includes('?')) {
      error = '请传入合法的url或查询字符串'
      console.error(error)
      return error
    }

    // 如果有多个?说明传入字符串不合法
    const index = url.indexOf('?')
    const lastIndex = url.indexOf('?')
    if (index !== lastIndex) {
      error = '请传入合法的url或查询字符串'
      console.error(error)
      return error
    }

    // 如果传入的值合法
    const queryString = url.substr(index + 1)

    // 将字符串根据 & 符号进行分割
    const queryArray = queryString.split('&')
    queryArray.forEach((item: string) => {
      // 将获取到的参数数组，以 = 符号进行分割
      const paramArray = item.split('=')
      const key = paramArray[0]
      if (Array.isArray(queryObject[key])) {
        queryObject[key].push(paramArray[1])
      } else {
        queryObject[key] = []
        queryObject[key].push(paramArray[1])
      }
    })

    // 遍历查询对象中的key,将数组长度只有1的变回字符串
    const keys = Object.keys(queryObject)
    keys.forEach((key) => {
      if (Array.isArray(queryObject[key])) {
        if (queryObject[key].length === 1) {
          queryObject[key] = queryObject[key][0]
        }
      }
    })
    // 返回查询对象
    return queryObject
  },

  /**
   * 返回一个数字数组中的最大值，
   * @param {number[]} Array
   * @return {number | undefined} number
   */

  maxOfArray(Array) {
    if (Array.length === 0) {
      return undefined
    }
    return Math.max.apply(null, Array)
  },

  /**
   * 返回一个数字数组中的最小值，
   * @param {number[]} Array
   * @return {number | undefined} number
   */

  minOfArray(Array) {
    if (Array.length === 0) {
      return undefined
    }
    return Math.min.apply(null, Array)
  },

  /**
   * 返回浏览器的信息，包含名称，版本号，
   *
   *
   */

  exploreInfo() {
    // 获取初始化的浏览器信息
    const browserInfo = {
      is360: false, // 是否360浏览器
      isIE: false, // 是否微软IE浏览器
      isChrome: false, // 是否谷歌浏览器
      isFireFox: false, // 是否火狐浏览器
      isEdge: false, // 是否微软Edge浏览器
      isOpera: false, // 是否为欧鹏浏览器
      isSafari: false, // 是否为苹果safari浏览器
      isQQ: false, // 是否为QQ浏览器
      isUC: false, // 是否为UC浏览器
      isLB: false, // 是否为猎豹浏览器
      isSE: false, // 是否搜狗浏览器
      isMaxthon: false, // 是否遨游浏览器
      browserName: '', // 当前浏览器名称
      browserNameCN: '', // 当前浏览器中文名称
      version: '', // 当前浏览器的版本号
    }

    const MsIE = /(msie\s|trident\/7)([\w.]+)/ // IE浏览器的判断
    const Trident = /(trident)\/([\w.]+)/ // IE浏览器内核
    const Edge = /(edge)\/([\w.]+)/  //Edge浏览器

    const Firefox = /(firefox)\/([\w.]+)/  // 火狐浏览器
    const Opera = /(opera).+version\/([\w.]+)/  // 旧Opera
    const NewOpera = /(opr)\/(.+)/  // 新Opera 基于谷歌
    const Chrome = /(chrome)\/([\w.]+)/ // 谷歌浏览器
    const Safari = /(safari)\/([\w.]+)/ // 苹果浏览器
    const UC = /(u(c*)browser)\/([\w.]+)/ // UC浏览器
    const LB = /(lbbrowser)/ // 猎豹浏览器
    const QQ = /(qqbrowser)\/([\w.]+)/ // QQ浏览器
    const SE = /(se 2\.[0-9x] metasr 1\.[0-9x])/ // 搜狗浏览器
    const MAXTHON = /(maxthon)\/([\w\d]+)/ // 遨游浏览器

    // 获取当前浏览器的userAgent信息
    const userAgent = window.navigator.userAgent.toLowerCase()

    /**
     * 判断是否为IE浏览器
     * @type {RegExpExecArray | null}
     */

    const IEVersionArray = [
      { type: '4.0', name: '8' }, { type: '5.0', name: '9' },
      { type: '6.0', name: '10' }, { type: '7.0', name: '11' },
    ]

    // 判断是否为IE浏览器
    const isIE = MsIE.exec(userAgent)
    if (isIE !== null) {
      const isLowIE = Trident.exec(userAgent)
      if (isLowIE !== null) {
        let IEVersion = ''
        const tridentVersion = isLowIE[2]
        // 获取低版本IE的版本号
        IEVersionArray.forEach((item) => {
          const { type = '', name = '' } = item
          if (type === tridentVersion) {
            IEVersion = name
          }
        })
        if (IEVersion) {
          browserInfo.isIE = true
          browserInfo.browserName = `Microsoft Internet Explorer ${IEVersion}`
          browserInfo.browserNameCN = `微软IE${IEVersion}浏览器`
        }
      }
    }

    /**
     * 判断是否为Edge浏览器
     * @type {RegExpExecArray | null}
     */

    const isEdge = Edge.exec(userAgent)
    if (isEdge !== null) {
      const version = isEdge[2]
      browserInfo.isEdge = true
      browserInfo.version = version
      browserInfo.browserName = `Microsoft Edge`
      browserInfo.browserNameCN = `微软Edge浏览器`
    }


    /**
     * 火狐浏览器（Firefox）
     * userAgent中包含Firefox字符串
     */

    const isFirefox = Firefox.exec(userAgent)
    if (isFirefox !== null) {
      const version = isFirefox[2]
      browserInfo.isFireFox = true
      browserInfo.version = version
      browserInfo.browserName = `Firefox`
      browserInfo.browserNameCN = `火狐浏览器`
    }

    /**
     * 旧版opera浏览器
     *
     */

    const isOpera = Opera.exec(userAgent)
    if (isOpera !== null) {
      const version = isOpera[2]
      browserInfo.isOpera = true
      browserInfo.version = version
      browserInfo.browserName = `Opera`
      browserInfo.browserNameCN = `欧鹏浏览器`
    }

    /**
     * 新版opera浏览器
     *
     */

    const isNewOpera = NewOpera.exec(userAgent)
    if (isNewOpera !== null) {
      const version = isNewOpera[2]
      browserInfo.isOpera = true
      browserInfo.version = version
      browserInfo.browserName = `Opera`
      browserInfo.browserNameCN = `欧鹏浏览器`
    }

    /**
     * Safari浏览器
     *
     */

    const isSafari = Safari.exec(userAgent)
    const isMac = userAgent.includes('macintosh') || userAgent.includes('mac os')
    if (isMac && isSafari !== null) {
      const version = isSafari[2]
      browserInfo.isSafari = true
      browserInfo.version = version
      browserInfo.browserName = `Safari`
      browserInfo.browserNameCN = `苹果浏览器`
    }

    /**
     * UC浏览器
     *
     */
    const isUC = UC.exec(userAgent)
    if (isUC !== null) {
      const version = isUC[2]
      browserInfo.isUC = true
      browserInfo.version = version
      browserInfo.browserName = `UCBrowser`
      browserInfo.browserNameCN = `UC浏览器${version}`
    }

    /**
     * QQ浏览器
     *
     */

    const isQQ = QQ.exec(userAgent)
    if (isQQ !== null) {
      const version = isQQ[2]
      browserInfo.isQQ = true
      browserInfo.version = version
      browserInfo.browserName = `QQBrowser`
      browserInfo.browserNameCN = `QQ浏览器`
    }

    /**
     * 猎豹浏览器
     *
     */

    const isLB = LB.exec(userAgent)
    if (isLB !== null) {
      const version = isLB[2]
      browserInfo.isLB = true
      browserInfo.version = version
      browserInfo.browserName = `liebaoBrowser}`
      browserInfo.browserNameCN = `猎豹浏览器`
    }

    /**
     * 搜狗浏览器
     *
     */

    const isSE = SE.exec(userAgent)
    if (isSE !== null) {
      browserInfo.isSE = true
      browserInfo.version = ''
      browserInfo.browserName = `SogouBrowser`
      browserInfo.browserNameCN = `搜狗浏览器`
    }

    /**
     * 遨游浏览器
     *
     */

    const isMaxthon = MAXTHON.exec(userAgent)
    if (isMaxthon !== null) {
      const version = isMaxthon[2]
      browserInfo.isSE = true
      browserInfo.version = version
      browserInfo.browserName = `AoyouBrowser`
      browserInfo.browserNameCN = `遨游浏览器`
    }

    /**
     * 谷歌浏览器
     *
     */

    const isChrome = Chrome.exec(userAgent)
    const { plugins, mimeTypes } = window.navigator
    // 排除猎豹、QQ、UC、苹果、Edge、Opera、搜狗、遨游浏览器
    if (!isLB && !isQQ && !isUC && !isSafari && !isEdge && !isSE && !isOpera && !isNewOpera && !isMaxthon && isChrome !== null) {
      /**
       * 因为360浏览器当中插件很多，因此可以通过这个来判断
       */

      if (plugins.length > 20 && mimeTypes.length > 20) {
        const version = isChrome[2]
        browserInfo.is360 = true
        browserInfo.version = version
        browserInfo.browserName = `360Browser`
        browserInfo.browserNameCN = `360浏览器`
      } else {
        const version = isChrome[2]
        browserInfo.isChrome = true
        browserInfo.version = version
        browserInfo.browserName = `Chrome`
        browserInfo.browserNameCN = `谷歌浏览器`
      }
    }

    return browserInfo
  },


  exploreDetailsInformation() {
    const Info = {
      platform: '', // 当前运行浏览器的操作系统和（或）硬件平台
      appVersion: '', // 当前浏览器的平台和版本信息
      appCodeName: '', // 返回浏览器的代码名
      appName: '', // 返回浏览器的名称
      systemOS: '' // 当前操作系统
    }

    const os = /(mac os [\w] ([0-9_]+))/
    const ios = /(iphone os ([\w\d._]_)+)/
    const android = /(android ([\w\d._]+))/

    const userAgent = window.navigator.userAgent.toLowerCase()
    Info.appName = window.navigator.appName
    Info.appCodeName = window.navigator.appCodeName
    Info.appVersion = window.navigator.appVersion
    Info.platform = window.navigator.platform

    // windows操作系统返回的platform
    const windows = ['Win32', 'Win64', 'wow64']
    const ntVersion = ['windows nt 5.0', 'windows nt 5.1', 'windows nt 5.2', 'windows nt 6.0', 'windows nt 6.1', 'windows nt 6.2', 'windows nt 10.0']
    const windowVersion = ['windows 2000', 'windows XP', 'windows 2003', 'windows vista', 'windows 7', 'windows 8', 'windows 10']

    // mac操作系统返回的platform
    const Mac = ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel']
    // Unix操作系统
    const unix = ['X11']
    // Linux操作系统
    const Linux = ['Linux']
    // iphone 操作系统
    const iphone = ['iPhone']

    // 获取当前浏览器的操作系统信息
    const { platform = '' } = window.navigator

    // 是否windows操作系统
    const isWin = windows.includes(platform)
    if (isWin) {
      const index1 = ntVersion.findIndex((item) => {
        return userAgent.includes(item)
      })

      const index2 = windowVersion.findIndex((item) => {
        return userAgent.includes(item)
      })

      const num = userAgent.includes('win64') || userAgent.includes('wow64') ? '64位' : '32位'

      if (index1 > -1 || index2 > -1) {
        const index = index1 > -1 ? index1 : index2
        Info.systemOS = `${windowVersion[index]} ${num}`
      }
    }

    // 是否为Mac操作系统
    const isMac = Mac.includes(platform)
    if (isMac) {
      const Macos = os.exec(userAgent)
      if (Macos !== null) {
        const version = Macos[1]
        Info.systemOS = `${version.toUpperCase()} 64位`
      }
    }

    // 是否为Unix操作系统
    const isUnix = unix.includes(platform)
    if (!isMac && !isWin && isUnix) {
      Info.systemOS = `Unix`
    }

    // 是否为android操作系统
    const isLinux = Linux.includes(platform)
    const isAndroid = userAgent.includes('android')
    if (isLinux) {
      if (isAndroid) {
        const Androids = android.exec(userAgent)
        if (Androids !== null) {
          Info.systemOS = `Android ${Androids[2]}`
        } else {
          Info.systemOS = `Android`
        }
      }
      Info.systemOS = isAndroid ? 'android' : 'Linux'
    }

    // 是否为iphone操作系统
    const isIphone = iphone.includes(platform)
    if (isIphone) {
      const IOS = ios.exec(userAgent)
      if (IOS) {
        Info.systemOS = `IOS ${IOS[2].replace(/_/g, '.')}`
      }
    }

    return Info
  },

  /**
   * 判断一个手机号码是否合法
   * @param {string | number} phone
   * @return boolean
   */

  isValidatePhoneNumber(phone) {
    const phoneString = String(phone)
    if (!phoneString || phoneString.length !== 11) {
      return false
    }
    const phoneReg = /^1((3[0-9])|(4[5-9])|(5[0-3,5-9])|(6[2567])|(7[0-8])|(8[0-9])|(9[0-3,5-9]))([0-9]{8})$/
    return phoneReg.test(phoneString)
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

  isValidateIDNumber(ID) {
    const IDString = String(ID)
    if (!IDString || (IDString.length !== 15 && IDString.length !== 18)) {
      return false
    }
    const numberReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
    // 如果不符合身份证号基本规则，返回false
    if (!numberReg.test(IDString)) {
      return false
    }
    const city = [
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
    ]
    const cityCode = IDString.substring(0, 2)
    const isCity = city.find((item) => {
      return item.key.toString() === cityCode
    })
    // 如果前两位表示地区的代码不符合，则范围错误
    if (isCity === undefined) {
      return false
    }
    // 校验最后一位校验位
    if (IDString.length === 18) {
      const codes = IDString.split('')
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0, ai = 0, wi = 0
      for (let i = 0; i < 17; i++) {
        ai = Number(codes[i])
        wi = factor[i]
        sum += ai * wi
      }
      const last = parity[sum % 11].toString()
      if (last !== codes[17]) {
        return false
      }
    }

    return true
  },

  /**
   * 判断一个邮箱的地址是否合法
   * @param {string} email
   * @return {boolean} boolean
   */

  isValidateEmail(email) {
    if (!email || !email.includes('@') || !email.includes('.')) {
      return false
    }

    const pattern = /^([\w1-9])+([\-\w\d._])*(\w\d)+@([\w\d\-_]{2,}\.)*([\w\d]{2,})\.([\w]{2,4})$/
    const domains = ['qq.com', '126.com', '189.com', '163.com', 'vip.163.com', '263.net', 'yeah.net', 'sohu.com', 'sina.cn', 'sina.com', 'eyou.com', 'gmail.com', 'hotmail.com', '42du.cn']
    if (pattern.test(email)) {
      const domain = email.substring(email.indexOf('@') + 1)
      if (domains.includes(domain)) {
        return true
      }
    }
    return pattern.test(email)
  },

  /**
   * 去掉一个字符串或数组中的非数字字符串，只剩下数组
   * @paran {string | any[]} param
   * @return string | number[]
   */

  justLeftNumber(param) {
    if (typeof param === 'string') {
      const array = Array.from(param)
      const result = array.filter((item) => {
        const num = Number.parseInt(item)
        return !Number.isNaN(num)
      })
      return result.reduce((total, item) => {
        total += item
        return total
      }, '')
    } else if (Array.isArray(param)) {
      const arr: number[] = []
      param.forEach((item) => {
        if (typeof item === 'number' && !Number.isNaN(item)) {
          arr.push(item)
        }
      })
      return arr
    } else {
      const error = '请输入正确的格式'
      console.error(error)
      return error
    }
  },

  /**
   * 去除一个字符串或数组中的其他元素，只保留中文
   * @return string | string[]
   * @param param
   */

  justLeftCN(param) {
    const CNReg = /^[\u4e00-\u9fa5]$/
    if (typeof param === 'string') {
      const array = Array.from(param)
      const result = array.filter((item) => CNReg.test(item))
      return result.reduce((total, item) => {
        total += item
        return total
      }, '')
    } else if (Array.isArray(param)) {
      return param.filter(item => (typeof item === 'string') && CNReg.test(item))
    } else {
      const error = '请输入正确的格式'
      console.error(error)
      return error
    }
  },

  /**
   * 移除数组中的所有与指定元素相同的元素
   * @return
   * @param {[]} Array
   * @param {string | null | undefined | number | boolean} element
   */
  removeFromArray(Array, element) {
    return Array.filter((item) => item !== element)
  },

  /**
   * 将小数点之后的数字全部转化为汉字
   * @param {number} number
   * @param {boolean} isBig
   * @param {boolean} isMoney
   * @return string
   *
   */

  littleNumber2CN(number, isBig = false, isMoney = false) {
    const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const stringArr = isBig || isMoney ? chnBigChar : chnNumChar
    // 因为在金额中，小数点通常保留两位，那么小数点后的字符就可以辨识为x角x分
    const numberString = number.toString()
    const len = numberString.length
    const flag = numberString.includes('.')
    if (flag && (numberString.indexOf('.') === 0 || numberString.indexOf('.') === len - 1)) {
      const error = '小数点不能在第一位或最后一位'
      console.error(error)
      return error
    }
    if (isMoney) {
      if (flag) {
        const index = numberString.indexOf('.')
        if (index <= numberString.length - 2) {
          // 说明其小数点后超过两位
          const num = number.toFixed(2)
          const numString = num.toString()
          const str = numString.slice(index + 1)
          const arr = Array.from(str)
          return arr.reduce((total, item, idx) => {
            const strRmb = idx === 0 ? '角' : '分'
            const strs = stringArr[Number.parseInt(item)]
            total += idx <= 1 ? `${strs}${strRmb}` : ''
            return total
          }, '')
        } else {
          // 说明小数点后只有一位
          const num = number.toFixed(1)
          const numString = num.toString()
          const str = numString.slice(index + 1)
          const strs = stringArr[Number.parseInt(str)]
          return `${strs}角`
        }
      } else {
        return '圆整'
      }
    }
    if (flag) {
      const index = numberString.indexOf('.')
      const str = numberString.slice(index)
      let a = '点'
      for (let i = 1; i < str.length; i++) {
        a += stringArr[parseInt(str[i])]
      }
      return a
    } else {
      return ''
    }
  },

  /**
   * 定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
   * @param section
   * @param isBig
   * @param isMoney
   * @return string
   */

  sectionToChinese(section, isBig = false, isMoney = false) {
    const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const chnUnitChar = isMoney ? ['', '拾', '佰', '仟'] : ['', '十', '百', '千']
    const stringArr = isBig || isMoney ? chnBigChar : chnNumChar
    let str = '', chnstr = '', zero = false, count = 0   //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
    while (section > 0) {
      const v = section % 10  //对数字取余10，得到的数即为个位数
      if (v == 0) {                    //如果数字为零，则对字符串进行补零
        if (zero) {
          zero = false        //如果遇到连续多次取余都是0，那么只需补一个零即可
          chnstr = stringArr[v] + chnstr
        }
      } else {
        zero = true           //第一次取余之后，如果再次取余为零，则需要补零
        str = stringArr[v]
        str += chnUnitChar[count]
        chnstr = str + chnstr
      }
      count++
      section = Math.floor(section / 10)
    }
    return chnstr
  },

  /**
   * 将数字格式的金额转化为汉字
   * @param number
   * @param isBig
   * @param isMoney
   * @return string
   */

  transformNumber2CN(number, isBig = false, isMoney = false) {
    const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const chnBigChar = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
    const stringArr = isBig ? chnBigChar : chnNumChar

    let numbers
    if (typeof number === 'string') {
      numbers = Number.parseFloat(number)
      if (Number.isNaN(numbers)) {
        const error = '请输入正确格式的数字字符串'
        console.error(error)
        return error
      }
    } else {
      numbers = number
    }
    if (numbers > 9007199254740992) {
      const error = 'JS中超过2的53次方的数字会精度丢失，故参数不要超过9007199254740992'
      console.error(error)
      return error
    }
    const littleNum = LIDASHITools.littleNumber2CN(numbers, isBig, isMoney)
    let num = Math.floor(numbers)
    let unitPos = 0
    let strIns = '', chnStr = ''
    let needZero = false

    if (num === 0) {
      return stringArr[0]
    }
    while (num > 0) {
      const section = num % 10000
      if (needZero) {
        chnStr = stringArr[0] + chnStr
      }
      strIns = LIDASHITools.sectionToChinese(section, isBig, isMoney)
      strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0]
      chnStr = strIns + chnStr
      needZero = (section < 1000) && (section > 0)
      num = Math.floor(num / 10000)
      unitPos++
    }
    const s = isMoney ? '圆' : ''
    return `${chnStr}${s}${littleNum}`
  }
}

export default LIDASHITools
