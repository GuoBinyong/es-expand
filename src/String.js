

Object.defineProperties(String.prototype,{




  /**
   * 是否不包任何非空字符
   */
  noChars:{
    configurable:true,
    get: function () {
      return !(/\S+/.test(this));
    }
  },


  /**
   * 首字母大写
   */
  capFirstLetter:{
    configurable:true,
    get:function () {
      return this.replace(/(^\W*)(\w)/,function (match,p1,p2) {
        return p1 + p2.toUpperCase();
      });
    }
  },



  /**
   * 把字符串转换成分隔线的格式
   * @param separator ? : string   可选，默认值："-" ；   分隔线
   * @property caseType ? : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常，不做改变；
   * @returns string
   */
  toSeparatorLineFormat:{
    configurable:true,
    writable:true,
    value:function (separator,caseType) {

      if (separator == undefined)  {
        separator = "-" ;
      }

      if (caseType == undefined) {
        caseType = "N" ;
      }

      var lowerCase = caseType == "L" ;

      var targetStr = this.replace(/[A-Z]+/g,function (match) {
        var matchStr = lowerCase ? match.toLowerCase() : match ;
        return separator + matchStr ;
      });

      var errorSeparatorRexStr = "(^\\s*)"+ separator + "+" ;
      var errorSeparatorRex = new RegExp(errorSeparatorRexStr);
      targetStr = targetStr.replace(errorSeparatorRex,"$1");  //如果首字母是大写，执行replace时会多一个_，这里需要去掉

      if (caseType == "U"){
        targetStr = targetStr.capFirstLetter
      }

      return targetStr;
    }
  },



  /**
   * 把字符串从分隔线格式转换成驼峰格式
   * @param separators ? : string | string[]   可选，默认值：['-', '_'] ；   分隔线，或 包含多个分隔线的数组
   * @returns string
   */
  toHumpFormat:{
    configurable:true,
    writable:true,
    value:function (separators) {
      if (separators == undefined) {
        separators = ['-', '_'];
      } else if (!Array.isArray(separators)) {
        separators = [separators];
      }
    
      var separatorRexStr = '(' + separators.join('|') + ')' + '+([A-Za-z]?)' ;
      var separatorRex = new RegExp(separatorRexStr, 'g');
    
      return this.replace(separatorRex, function (match, p1, p2) {
        return p2.toUpperCase();
      });

    }
  },




  /**
   * 获取所有指定格式的字符串
   * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
   * FormatObject := {separator : string, caseType : L | U | N}
   * @property separator  : string     分隔符
   * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
   * @returns [string]  所有指定格式的字符串数组
   */
  getAllStrForFormats:{
    configurable:true,
    writable:true,
    value:function (formats) {
      var _this = this;

      if (!Array.isArray(formats)) {
        formats = [formats];
      }

      var allStrs = formats.reduce(function(total,format) {
        var separator = format.separator ;
        var caseType = format.caseType || "N" ;


        var targetStr = _this;

        if (separator != undefined) {
          targetStr = _this.toSeparatorLineFormat(separator,caseType);
        }else if (caseType == "U") {
          targetStr = _this.toUpperCase();
        }else if (caseType == "L") {
          targetStr = _this.toLowerCase();
        }

        total.push(targetStr);

        return total;

      },[]);

      return allStrs;
    }
  },




  //URL相关：开始

  /**
   * 是否是URL
   */
  isURL:{
    configurable:true,
    get: function () {
      return /^\w+:\/\/\S+/.test(this);
    }
  },


  //URL相关：结束




});
