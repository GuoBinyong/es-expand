import "./Array"
import "./String"

/*
 使用属性描述来定义属性的原因：
 - 为了不让 for...in 等类似的操作遍历这些定义在原型上的方法或属性，需要将属性设置为不可枚举的；
 - 为了解决给 Object.prototype 添加属性会在Vue中报错的问题，需要将属性设置为不可枚举的；


 注意：
 - Object.prototype 和  Object 上不能定义同名成员；
 */



let propertyDescriptors = {


  /**
   * 找出对象中符合测试函数的属性名
   * @param testFun:(propValue,propkey,index)=> boolean  ; 测试条件函数
   */
  findKey: {
    configurable:true,
    writable:true, //为了兼容 lodash 库，因为 rollup-plugin-typescript2 所依赖的 lodash 库会更改该属性 findKey
    enumerable: false,
    value: function (testFun) {
      return Object.keys(this).find((key, index) => {
        let propValue = this[key];
        return testFun(propValue, key, index);
      });

    }
  },


  /**
   * 找出对象中符合测试函数的属性信息
   * @param testFun:(propValue,propkey,index)=> boolean  ; 测试条件函数
   * @return PropertyInfo : {key:string,value:any}
   */
  findProperty: {
    configurable:true,
    writable:true,
    enumerable: false,
    value: function (testFun) {

      let prop = Object.entries(this).find((entry, index) => {
        return testFun(entry[1], entry[0], index);
      });


      let propInfo = {
        key: null,
        value: null
      };

      if (prop) {
        propInfo.key = prop[0];
        propInfo.value = prop[1];
      }

      return propInfo;
    }
  },


  /**
   * 检验该对象自身是否是扁平的，即：该对象的所有的直接属性的属性值都是非对象类型；
   */
  isFlat: {
    configurable:true,
    enumerable: false,
    get: function () {
      let noFlat = Object.values(this).some(function (propValue) {
        let propType = typeof propValue;
        return propValue && (propType === "object" || propType === "function");
      });

      return !noFlat;
    }
  },




  /**
   * 返回对象是否是空的对象，即没有自己的可枚举的属性
   */
  noKeys:{
    configurable:true,
    enumerable:false,
    get:function(){
      return Object.keys(this).length == 0;
    }
  },





  /**
   * 获取对象中拥有的 相应key的值；
   * @param keys:[string]  指定的key的数组
   * @return [any]    对象中拥有的相应key的值
   */
  getValuesOfKeys: {
    configurable:true,
    writable:true,
    enumerable: false,
    value: function (keys) {

      var _this = this ;
      return keys.reduce(function(total, currentKey){
        if (currentKey in _this){
          total.push(_this[currentKey]);
        }
        return total;
      }, []);

    }
  },



  /**
   * 获取对象中拥有的 相应key的 有效值；
   * 注意：不包含值为 undefined 或 null 的值
   * @param keys:[string]  指定的key的数组
   * @return [any]    对象中拥有的相应key的有效值
   *
   */
  getVirtualValuesOfKeys: {
    configurable:true,
    writable:true,
    enumerable: false,
    value: function (keys) {

      var _this = this ;
      return keys.reduce(function(total, currentKey){
        var currValue = _this[currentKey] ;
        if (currValue != undefined){
          total.push(currValue);
        }
        return total;
      }, []);

    }
  },





  /**
   * 查找对象中所有指定的属性中的第一个有效值
   * @param keys : [string]   被查找的属性列表
   * @returns any  对象中所有指定的属性中的第一个有效值
   */
  findValueOfKeys: {
    configurable:true,
    writable:true,
    enumerable: false,
    value: function (keys) {
      var findValue ;

      keys.find(function(currentKey){
        var currValue = this[currentKey] ;
        var valid =  currValue != undefined
        if (valid){
          findValue = currValue ;
        }
        return valid ;

      },this);


      return findValue;

    }
  },



  /**
   * 获取对象中所有指定格式的属性的值列表
   * @param key : string   基本的属性字符串
   * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
   * FormatObject := {separator : string, caseType : L | U | N}
   * @property separator  : string     分隔符
   * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
   * @returns [any]  对象中所有指定格式的属性的值列表
   */
  getValuesForKeyFormats: {
    configurable:true,
    writable:true,
    enumerable: false,
    value: function (key,formats) {
      var keyStrList = key.getAllStrForFormats(formats);
      return this.getValuesOfKeys(keyStrList);
    }
  },


  /**
   * 获取对象中所有指定格式的属性的有效值列表
   * @param key : string   基本的属性字符串
   * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
   * FormatObject := {separator : string, caseType : L | U | N}
   * @property separator  : string     分隔符
   * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
   * @returns [any]  对象中所有指定格式的属性的值列表
   */
  getVirtualValuesForKeyFormats: {
    configurable:true,
    writable:true,
    enumerable: false,
    value: function (key,formats) {
      var keyStrList = key.getAllStrForFormats(formats);
      return this.getVirtualValuesOfKeys(keyStrList);
    }
  },


  /**
   * 查找对象中所有指定格式的属性的第一个有效值
   * @param key : string   基本的属性字符串
   * @param formats : [FormatObject]  | FormatObject   格式对象 或者 数组
   * FormatObject := {separator : string, caseType : L | U | N}
   * @property separator  : string     分隔符
   * @property caseType  : L | U | N     大小写类型；   L : 小写，当没有设置 separator 时，将会把所有字符都转为小写 ； U : 大写 ，当没有设置 separator 时，将会把所有字符都转为大写； N : 正常
   * @returns any  对象中所有指定格式的属性的第一个有效值
   */
  findValueForKeyFormats: {
    configurable:true,
    writable:true,
    enumerable: false,
    value: function (key,formats) {
      var keyStrList = key.getAllStrForFormats(formats);
      return this.findValueOfKeys(keyStrList);
    }
  },





  //集合：开始

  /**
   * 判断当前对象是否是指定对象的子集；即当前对象自己的所有可枚举属性 及 值 是否都包含于 指定的对象上；
   * @param universalObj : Object   全集对象
   * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
   * @returns boolean   当前对象是否是指定对象的子集
   */
  isSubsetOf: {
    configurable:true,
    writable:true,
    enumerable: false,
    value: function (universalObj,equalTest) {

      if (!equalTest) {
        equalTest = function (a, b) {
          return a === b;
        };
      }

      let thisEntries = Object.entries(this);

      return thisEntries.every(function(entrie){
        let key = entrie[0];
        let value = entrie[1];
        return equalTest.call(this,value,universalObj[key]);
      },this);

    }
  },



  //集合：结束



  /**
   * filterProperty(filter,thisValue)
   * 返回包含符合条件的所有属性的新对象
   * @param filter : (key,value,obj)=>boolean    必选；
   * @param thisValue ? : any   可选；默认值：当前对象； filter 函数的this 值；
   * @returns Object   返回包含符合条件的所有属性的新对象
   */
  filterProperty:{
    configurable:true,
    writable:true,
    enumerable: false,
    value:function (filter,thisValue) {
      if (arguments.length < 2){
        thisValue = this;
      }

      return Object.entries(this).reduce((preValue,entr)=> {
        var key = entr[0];
        var value  = entr[1];
        if (filter.call(thisValue,key,value,this)){
          preValue[key] = value;
        }
        return preValue;
      },{});
    },
  },


  /**
   * mySelf
   * 获取自己；此属性可用于获取原始类型数据对应的包装对象，即：可将原始类型的值转为对应的包装类型的实例对象
   * @returns this   返回自身
   */
  mySelf: {
    configurable:true,
    enumerable: false,
    get: function () {
      return this;
    }
  },


};


Object.defineProperties(Object.prototype, propertyDescriptors);


/**
 * 用于将所有指定的属性的值从源对象复制到目标对象。它将返回目标对象。
 * @param target : Object     目标对象。
 * @param keys : Array<String>   需要复制的属性名数组
 * @param ...sources : Object    源对象参数序列
 * @return target    返回目标对象
 */

Object.assignKeys = function (target,keys,...sources){

  if (keys) {

    let keysSourceList = sources.map(function (source) {

      return keys.reduce(function (newSource, aKey) {
        let aValue = source[aKey];

        if (aValue !== undefined) {
          newSource[aKey] = aValue;
        }

        return newSource;

      }, {});

    });


    Object.assign(target,...keysSourceList);

  }


  return target ;
};


/**
 * 用于将所有指定的属性之外的所有属性和值从源对象复制到目标对象。它将返回目标对象。
 * @param target : Object     目标对象。
 * @param keys : Array<String>   需要排除的属性名数组
 * @param ...sources : Object    源对象参数序列
 * @return target    返回目标对象
 */

Object.assignExcludeKeys = function (target,keys,...sources){

  if (keys) {

    let keysSourceList = sources.map(function (source) {
      let allKeys = Object.keys(source);
      let validKeys = keys.getComplementOn(allKeys);

      return validKeys.reduce(function (newSource, aKey) {
        let aValue = source[aKey];

        if (aValue !== undefined) {
          newSource[aKey] = aValue;
        }

        return newSource;

      }, {});

    });


    Object.assign(target,...keysSourceList);

  }


  return target ;
};



/**
 * 用于将所有符合 options 配置 的属性和值从源对象复制到目标对象。它将返回目标对象。
 * @param target : Object     目标对象。
 * @param options : IncludeAndExcludeKeysOptions  必须；配置 包含 和 排除 的 key 的 数组 的 选项；
 * @param ...sources : Object    源对象参数序列
 * @return target    返回目标对象
 *
 * IncludeAndExcludeKeysOptions = {include ?: Array,exclude ?: Array}
 */

Object.assignIncludeAndExcludeKeys = function (target,options,...sources){

  if (options && !options.noKeys) {

    let keysSourceList = sources.map(function (source) {
      let allKeys = Object.keys(source);
      let validKeys = allKeys.getIncludeAndExclude(options);

      return validKeys.reduce(function (newSource, aKey) {
        let aValue = source[aKey];

        if (aValue !== undefined) {
          newSource[aKey] = aValue;
        }

        return newSource;

      }, {});

    });


    Object.assign(target,...keysSourceList);

  }


  return target ;
};







//兼容：开始

//Object.entries(obj)
if (!Object.entries) {
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
      i = ownProps.length,
      resArray = new Array(i);
    while (i--){
      var key = ownProps[i];
      resArray[i] = [key, obj[key]];
    }

    return resArray;
  };
}




//Object.fromEntries(entries)
if (!Object.fromEntries) {
  Object.fromEntries = function( entries ){
    return entries.reduce(function(obj, entry){
      obj[entry[0]] = entry[1];
      return obj;
    }, {});
  };
}



//兼容：结束