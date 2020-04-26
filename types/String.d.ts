interface String {
  /**
   * 是否是有效的 JSON 字符串
   */
  readonly isJSONString: boolean;


  /**
   * 是否不包任何非空字符
   */
  readonly noChars: boolean;


  /**
   * 首字母大写
   */
  readonly capFirstLetter: string;


  /**
   * 把字符串转换成分隔线的格式
   * @param separator ? : string   可选，默认值："-" ；   分隔线
   * @property caseType ? : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常，不做改变；
   * @returns string
   */
  toSeparatorLineFormat(separator?: string, caseType?: "L" | "U" | "N"): string;


  /**
   * 把字符串从分隔线格式转换成驼峰格式
   * @param separators ? : string | string[]   可选，默认值：['-', '_'] ；   分隔线，或 包含多个分隔线的数组
   * @returns string
   */
  toCamelFormat(separators?: string | string[]): string;


  /**
   * 获取所有指定格式的字符串
   * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
   * FormatObject := {separator : string, caseType : L | U | N}
   * @property separator  : string     分隔符
   * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
   * @returns [string]  所有指定格式的字符串数组
   */
  getAllStrForFormats(formats: FormatOptions[] | FormatOptions): string[];


  //URL相关：开始

  /**
   * 是否是URL
   */
  readonly isURL: boolean;

  //URL相关：结束


}


interface FormatOptions {
  // 分隔符
  separator?: string;
  // 大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
  caseType?: "L" | "U" | "N";
}

