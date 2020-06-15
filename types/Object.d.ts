import "./Array"
import "./String"

declare global {


  type Replace<SourType, MatchType, NewType> = SourType extends MatchType ? NewType : SourType;
  type ReplaceUndefined<SourType, NewType> = Replace<SourType, undefined, NewType>;
  type ReplaceNull<SourType, NewType> = Replace<SourType, null, NewType>;
  type ReplaceVoid<SourType, NewType> = Replace<SourType, void | undefined | null, NewType>;


  interface Object {

    /**
     * 找出对象中符合测试函数的属性名
     * @param testFun:(propValue,propkey,index)=> boolean  ; 测试条件函数
     */
    findKey(testFun: (propValue: any, propkey: string, index: number) => any): string;


    /**
     * 找出对象中符合测试函数的属性信息
     * @param testFun:(propValue,propkey,index)=> boolean  ; 测试条件函数
     * @return PropertyInfo : {key:string,value:any}
     */
    findProperty(testFun: (propValue: any, propkey: string, index: number) => any): { key: string, value: any };

    /**
     * 检验该对象自身是否是扁平的，即：该对象的所有的直接属性的属性值都是非对象类型；
     */

    readonly isFlat: boolean;

    /**
     * 返回对象是否是空的对象，即没有自己的可枚举的属性
     */
    readonly noKeys: boolean;


    /**
     * 获取对象中拥有的 相应key的值；
     * @param keys:[string]  指定的key的数组
     * @return [any]    对象中拥有的相应key的值
     */
    getValuesOfKeys(keys: string[]): any[];


    /**
     * 获取对象中拥有的 相应key的 有效值；
     * 注意：不包含值为 undefined 或 null 的值
     * @param keys:[string]  指定的key的数组
     * @return [any]    对象中拥有的相应key的有效值
     *
     */
    getVirtualValuesOfKeys(keys: string[]): NonNullable<any>[];


    /**
     * 查找对象中所有指定的属性中的第一个有效值
     * @param keys : [string]   被查找的属性列表
     * @returns any  对象中所有指定的属性中的第一个有效值
     */
    findValueOfKeys(keys: string[]): NonNullable<any>;


    /**
     * 获取对象中所有指定格式的属性的值列表
     * @param key : string   基本的属性字符串
     * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
     * FormatObject := {separator : string, caseType : L | U | N}
     * @property separator  : string     分隔符
     * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
     * @returns [any]  对象中所有指定格式的属性的值列表
     */
    getValuesForKeyFormats(key: string, formats: FormatOptions[] | FormatOptions): any[];


    /**
     * 获取对象中所有指定格式的属性的有效值列表
     * @param key : string   基本的属性字符串
     * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
     * FormatObject := {separator : string, caseType : L | U | N}
     * @property separator  : string     分隔符
     * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
     * @returns [any]  对象中所有指定格式的属性的值列表
     */
    getVirtualValuesForKeyFormats(key: string, formats: FormatOptions[] | FormatOptions): any[];


    /**
     * 查找对象中所有指定格式的属性的第一个有效值
     * @param key : string   基本的属性字符串
     * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
     * FormatObject := {separator : string, caseType : L | U | N}
     * @property separator  : string     分隔符
     * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
     * @returns any  对象中所有指定格式的属性的第一个有效值
     */
    findValueForKeyFormats(key: string, formats: FormatOptions[] | FormatOptions): any;


    //集合：开始

    /**
     * 判断当前对象是否是指定对象的子集；即当前对象自己的所有可枚举属性 及 值 是否都包含于 指定的对象上；
     * @param universalObj ? : Object   全集对象
     * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
     * @returns boolean   当前对象是否是指定对象的子集
     */
    isSubsetOf(universalObj: object, equalTest?: TestFun<any>): boolean;


    //集合：结束


    /**
     * filterProperty(filter,thisValue)
     * 返回包含符合条件的所有属性的新对象
     * @param filter : (key,value,obj)=>boolean    必选；
     * @param thisValue ? : any   可选；默认值：当前对象； filter 函数的this 值；
     * @returns any   返回包含符合条件的所有属性的新对象
     */
    filterProperty<ThisValue = any>(filter: (this: ThisValue, key: string, value: any, obj: any) => any, thisValue?: ThisValue): any;


    /**
     * mySelf
     * 获取自己；此属性可用于获取原始类型数据对应的包装对象，即：可将原始类型的值转为对应的包装类型的实例对象
     * @returns this   返回自身
     */
    mySelf:this;


  }


  type ProxyOptions = {
    get?: boolean,
    set?: boolean,
    configurable?: boolean,
    enumerable?: boolean,
    getDefault?: any,
    setDefault?: any
  };


  interface ObjectConstructor {


    /**
     * 用于将所有指定的属性的值从源对象复制到目标对象。它将返回目标对象。
     * @param target : Object     目标对象。
     * @param keys : Array<String>   需要复制的属性名数组
     * @param ...sources : Object    源对象参数序列
     * @return target    返回目标对象
     */

    assignKeys(target: object, keys: string[] | null | undefined, ...sources: object[]): any;


    /**
     * 用于将所有指定的属性之外的所有属性和值从源对象复制到目标对象。它将返回目标对象。
     * @param target : Object     目标对象。
     * @param keys : Array<String>   需要排除的属性名数组
     * @param ...sources : Object    源对象参数序列
     * @return target    返回目标对象
     */

    assignExcludeKeys(target: object, keys: string[] | null | undefined, ...sources: object[]): any;


    /**
     * 用于将所有符合 options 配置 的属性和值从源对象复制到目标对象。它将返回目标对象。
     * @param target : Object     目标对象。
     * @param options : IncludeAndExcludeKeysOptions  必须；配置 包含 和 排除 的 key 的 数组 的 选项；
     * @param ...sources : Object    源对象参数序列
     * @return target    返回目标对象
     *
     * IncludeAndExcludeKeysOptions = {include ?: Array,exclude ?: Array}
     */

    assignIncludeAndExcludeKeys(target: object, options: { include?: string[], exclude?: string[] } | null | undefined, ...sources: object[]): any;



  }




}
