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
interface Tools {
    transformYuan2Fen: (yuan: string | number) => number | string;
    transformFen2Yuan: (fen: string | number) => number | string;
    randomString: (len?: number, Array?: string[]) => string;
    string2FullWidth: (str: string) => string;
    string2HalfWidth: (str: string) => string;
    queryParams: (url: string) => object | string;
    maxOfArray: (Array: number[]) => number | undefined;
    minOfArray: (Array: number[]) => number | undefined;
    exploreInfo: () => object;
    exploreDetailsInformation: () => object;
    isValidateIDNumber: (ID: number | string) => boolean;
    isValidateEmail: (email: string) => boolean;
    isValidatePhoneNumber: (phone: number | string) => boolean;
    justLeftNumber: (param: string | any[]) => string | number[];
    justLeftCN: (param: string | any[]) => string | string[];
    removeFromArray: (Array: any[], element: string | number | boolean | null | undefined) => any[];
    littleNumber2CN: (number: number, isBig: boolean, isMoney: boolean) => string;
    sectionToChinese: (section: number, isBig: boolean, isMoney: boolean) => string;
    transformNumber2CN: (Number: number | string, isBig: boolean, isMoney: boolean) => string;
    uuid: (Number: number | undefined) => string;
}
declare const LIDASHITools: Tools;
export default LIDASHITools;
