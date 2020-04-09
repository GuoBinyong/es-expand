type Replace<SourType, MatchType, NewType> = SourType extends MatchType ? NewType : SourType;
type ReplaceUndefined<SourType, NewType> = Replace<SourType, undefined, NewType> ;
type ReplaceNull<SourType, NewType> = Replace<SourType, null, NewType> ;
type ReplaceVoid<SourType, NewType> = Replace<SourType, void | undefined | null, NewType> ;


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
   * depthLoopOwnProperty(callback,depth,all,thisValue,initDepth)=> stopInfo
   * 递归遍历自身属性链中的所有属性
   * @param callback : (key,value,obj,currDepth))=> stopInfo : any    必选； 循环遍历的回调函数； key : 当前被遍历的属性名；value : 当前被遍历的属性值；obj : 当前被遍历的属性所属的对象；currDepth : 当前遍历的深度值，从 initDepth 所表示的值开始计数；返回值 stopInfo : 表示是否中止循环，并且该值会被 depthLoopOwnProperty 函数返回，如果返回的值是真值，则终止循环；
   * @param depth ? : number    可选；默认值：-1 ,即无限深度； 要循环遍历的深度；
   * @param all ? : boolean    可选；默认值: false ;  是否遍历自身所有的属性，包括不可枚举的；
   * @param thisValue ? : any    可选；   callback 回调函数的this值 ；默认值：当前被遍历的属性所属的对象；
   * @param initDepth ? : number   可选；默认值：1；深度的初始值； 注意：设计该属性的主要目的是为了递归调用时记录当前传递当前的深度值的；
   * @returns stopInfo ： any   终止循环时返回的信息；
   */
  depthLoopOwnProperty<ThisValue = any>(callback: (this: ThisValue, key: string, value: any, obj: object, currDepth: number) => any, depth?: number, all?: boolean, thisValue?: ThisValue, initDepth?: number): any;


  /**
   * depthLoopPropertyWithPrototype(callback,depth,thisValue,initDepth)=> stopInfo
   * 递归遍历自身包括原型的属性链中的所有可枚举的属性
   * @param callback : (key,value,obj,currDepth))=>stopInfo : any    必选； 循环遍历的回调函数； key : 当前被遍历的属性名；value : 当前被遍历的属性值；obj : 当前被遍历的属性所属的对象；currDepth : 当前遍历的深度值，从 initDepth 所表示的值开始计数；返回值 stopInfo : 表示是否中止循环，并且该值会被 depthLoopOwnProperty 函数返回，如果返回的值是真值，则终止循环；
   * @param depth ? : number    可选；默认值：-1 ,即无限深度； 要循环遍历的深度；
   * @param thisValue ? : any    可选；   callback 回调函数的this值 ；默认值：当前被遍历的属性所属的对象；
   * @param initDepth ? : number   可选；默认值：1；深度的初始值； 注意：设计该属性的主要目的是为了递归调用时记录当前传递当前的深度值的；
   * @returns stopInfo ： any   终止循环时返回的信息；
   */
  depthLoopPropertyWithPrototype<ThisValue = any>(callback: (this: ThisValue, key: string, value: any, obj: object, currDepth: number) => any, depth?: number, thisValue?: ThisValue, initDepth?: number): any;


  /**
   * filterProperty(filter,thisValue)
   * 返回包含符合条件的所有属性的新对象
   * @param filter : (key,value,obj)=>boolean    必选；
   * @param thisValue ? : any   可选；默认值：当前对象； filter 函数的this 值；
   * @returns Object   返回包含符合条件的所有属性的新对象
   */
  filterProperty<ThisValue = any>(filter: (this: ThisValue, key: string, value: any, obj: object) => any, thisValue?: ThisValue): object;


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

  assignKeys(target: object, keys: string[] | null | undefined, ...sources: object[]): object;


  /**
   * 用于将所有指定的属性之外的所有属性和值从源对象复制到目标对象。它将返回目标对象。
   * @param target : Object     目标对象。
   * @param keys : Array<String>   需要排除的属性名数组
   * @param ...sources : Object    源对象参数序列
   * @return target    返回目标对象
   */

  assignExcludeKeys(target: object, keys: string[] | null | undefined, ...sources: object[]): object;


  /**
   * 用于将所有符合 options 配置 的属性和值从源对象复制到目标对象。它将返回目标对象。
   * @param target : Object     目标对象。
   * @param options : IncludeAndExcludeKeysOptions  必须；配置 包含 和 排除 的 key 的 数组 的 选项；
   * @param ...sources : Object    源对象参数序列
   * @return target    返回目标对象
   *
   * IncludeAndExcludeKeysOptions = {include ?: Array,exclude ?: Array}
   */

  assignIncludeAndExcludeKeys(target: object, options: { include?: string[], exclude?: string[] } | null | undefined, ...sources: object[]): object;


  /**
   * 定义代理属性； 给 对象 proxy 增加 能够代理 target 对象 的 属性 prop；
   * 当在 访问或配置 proxy 对象上的 prop 属性时，会将操作转发到 target 对象的 prop 属性；
   *
   * @param proxy : Object   必选；会在该对象上添加代理属性 prop
   * @param target : Object   必选；被代理的对象
   * @param prop : Property   必选；代理属性的名字；
   * @param options ?: ProxyOptions  代理属性的配置选项
   *
   * ProxyOptions = {get:boolean,set:boolean,configurable:boolean,enumerable:boolean,getDefault,setDefault}
   * get:boolean  可选；默认值：true； 表示是否要定义 get 的代理；
   * set:boolean  可选；默认值：true； 表示是否要定义 set 的代理；
   * configurable:boolean  可选；默认值：true； 表示该属性描述符的类型是否可以被改变并且该属性可以从对应对象中删除。
   * enumerable:boolean  可选；默认值：true； 表示当在枚举相应对象上的属性时该属性是否显现。
   * getDefault:any  可选；当 target 的属性 prop 为 undefined 时，proxy 会返回默认值 getDefault
   * setDefault:any  可选；当给代理对象 proxy 的 prop 属性 设置的 新值是 undefined 时，会将默认值 setDefault 设置 到 target 对象的 prop 属性上；
   *
   * @returns proxy : Object  传递给函数的 代理对象 proxy
   */

  defineProxyProperty(proxy: object, target: object, prop: string, options?: ProxyOptions): object;


  /**
   *
   * 接口1：defineProxyProperties(proxy,target,propArray,options)
   * @param proxy : Object   必选；会在该对象上添加代理属性 prop
   * @param target : Object   必选；被代理的对象
   * @param propArray : [string]   必选；要定义的代理属性的名字的列表。
   * @param options ?: ProxyOptions     可选；所有代理属性的配置选项
   *
   *  @returns proxy : Object  传递给函数的 代理对象 proxy
   */
  defineProxyProperties(proxy: object, target: object, props: string[], options?: ProxyOptions): object;

  /**
   * 批量定义代理属性
   *
   * 接口2：defineProxyProperties(proxy,target,propOptions)
   * @param proxy : Object   必选；会在该对象上添加代理属性 prop
   * @param target : Object   必选；被代理的对象
   * @param propOptions : {propName:ProxyOptions}   必选；要定义的代理属性的配置对象；以该配置对象的属性名为 要配置的属性的名字，以其值为 本配置的属性的 配置选项
   * @returns proxy : Object  传递给函数的 代理对象 proxy
   */

  defineProxyProperties(proxy: object, target: object, propOptions: { [prop: string]: ProxyOptions }): object;


  /**
   * isDepthEqual(a, b, nullNotEqualUndefined)
   * 深度测试  a 和 b 是否完全相等；如果 a 和 b 是 对象，会进行递归相等测试，只有所有的属性 都相等时，才会认为是相等的；
   *
   * 注意：
   * - 对于 值为 undefined 的属性 和 不存在的属性 认为是相等的属性；
   * - 对于 对于 函数 ，如果整个函数的代码字符（fun.toString()）串相等，则认为函数是相等的；
   * - 目前只判断了 基础类型、Object、Array、function、Date 类型；
   *
   * @param a : any
   * @param b : any
   * @param nullNotEqualUndefined ? : boolean    可选；默认值：false;  是否把 null 和 undefined 作为不等的值来对待
   * @return boolean
   */
  isDepthEqual(a: any, b: any, nullNotEqualUndefined?: boolean): boolean;


}


