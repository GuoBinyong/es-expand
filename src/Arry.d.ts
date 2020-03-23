
declare global {

  type TestFun<T> = (a: T, b: T) => any;
  type ArrayCallbackFun<T, ReturnType> = (value: T, index: number, array: T[]) => ReturnType;

  //去重：开始

  interface Array<T> {

    /*
    getNoRepeats()
    获取去除重复项目后的数组
  
    ## 注意
    - 该方法不改原数组，会返回一个新的数组；
    - 该方法是通过 严格相等 `===` 运算符来判断 数组的元素是否重复的；
    */
    getNoRepeats(): T[];

    /**
getNoRepeatsUseRepeatTest(isRepeated)
根据重复测试函数 `isRepeated` 来获取去除重复项目后的新数组

- @param isRepeated  : (item1,item2)=> boolean      重复油测试函数，传入被测试的2个项目，返回布尔值，表示这2个项目是否是重复的；
- @returns : Array  返回去除重复项目后的新数组

## 注意
- 该方法不改原数组，会返回一个新的数组；
- 该方法是通过 isRepeated 函数来判断 数组的元素是否重复的；
*/
    getNoRepeatsUseRepeatTest(isRepeated: TestFun<T>): T[];

    //去重：结束











    //安全操作：开始

    /*
    JavaScript 数组中与遍历相关的方法都是非安全 和 非严谨的，当在遍历时增删原始数组的元素时，会引出问题；
    详情请参考文章：https://www.jianshu.com/p/6dd641d0c13d
  
    以下 安全操作 的方法便是用来解决这些问题的；
     */




    /**
     * safelyOperateIndexs(indexList, operation, thisValue)
     * 安全操作指定的索引
     * @param indexList : [Index]   需要被操作的索引数组
     * @param operation : (currentValue,currentIndex,currentArray)=>Void     执行的操作
     * @param thisValue ? : any   可选，默认值是被操作的数组，即调用者；操作 operation 的 this 值
     * @returns [Item]   被操作的元素列表
     *
     *
     * operation(currentValue,currentIndex,currentArray)=>Void
     * @param currentValue : any   调用 operation 时的元素的值；
     * @param currentIndex : number     调用 operation 时 currentValue 对应的最新状态的索引值；
     * @param currentArray : Array   调用 operation 时 被操作时最新状态的数组；
     *
     */
    safelyOperateIndexs(indexList: number[], operation: ArrayCallbackFun<T, void>, thisValue?: any): T[];



    /**
     * safelyOperateItems(itemList, operation, thisValue)
     * 安全操作指定的元素
     * @param itemList : [Item]   需要被操作的元素的数组
     * @param operation : (currentValue,currentIndex,currentArray)=>Void     执行的操作
     * @param thisValue ? : any   可选，默认值是被操作的数组，即调用者；操作 operation 的 this 值
     * @returns [Index]   被操作的元素的索引的列表；
     *
     *
     * operation(currentValue,currentIndex,currentArray)=>Void
     * @param currentValue : any   调用 operation 时的元素的值；
     * @param currentIndex : number     调用 operation 时 currentValue 对应的最新状态的索引值；
     * @param currentArray : Array   调用 operation 时 被操作时最新状态的数组；
     *
     */
    safelyOperateItems(itemList: T[], operation: ArrayCallbackFun<T, void>, thisValue?: any): number[];





    /**
     * safelyFilter(operation, thisValue)
     * 安全地操作并过滤所有元素；与 forEach 和 filter 的区别是： safelyFilter 能保证会遍历数组中所有已存在的元素，不会受 operation 中的行为的影响；
     * @param operation : (currentValue,currentIndex,currentArray)=>boolean | undefined     执行的操作， 该函数的返回值表示是否要过滤出该元素
     * @param thisValue ? : any   可选，默认值是被操作的数组，即调用者；操作 operation 的 this 值
     * @returns [Item]  返回被 operation 过滤出的元素
     *
     *
     * operation(currentValue,currentIndex,currentArray)=>boolean | undefined
     * @param currentValue : any   调用 operation 时的元素的值；
     * @param currentIndex : number     调用 operation 时 currentValue 对应的最新状态的索引值；
     * @param currentArray : Array   调用 operation 时 被操作时最新状态的数组；
     * @returns boolean | undefined  表示是否要过滤出 currentValue ；
     *
     */
    safelyFilter(operation: ArrayCallbackFun<T, any>, thisValue?: any): T[];


    //安全操作：结束





    //移动元素：开始


    /**
     * move(fromIndex, toIndex, length = 1)
     * 根据索引移动数组的元素
     * @param fromIndex : number   被移动的元素的开始索引
     * @param toIndex : number    元素被移动到的新位置的索引
     * @param length ? : number   可选，默认值：1 ； 被移动的元素的长度；
     * @returns Array   被移动的元素的数组
     */
    move(fromIndex: number, toIndex: number, length: number): T[];




    /**
     * moveTo(toIndex, ...fromIndexs)
     * 根据索引批量移动数组的元素
     * @param toIndex : number    元素被移动到的新位置的索引
     * @param fromIndex : number   被移动的元素的索引
     * @returns Array<Item>   被移动的元素的数组
     */
    moveTo(toIndex: number, ...fromIndexs: number[]): T[];






    /**
     * moveItemsTo(toIndex, ...items)
     * 批量移动数组的指定元素
     * @param toIndex : number    元素被移动到的新位置的索引
     * @param item : any   被移动的元素
     * @returns Array<number>   被移动的元素的索引的数组
     */
    moveItemsTo(toIndex: number, ...items: T[]): number[];





    /**
     * moveToUseTest(toIndex, needMoveTest)
     * 根据测试函数批量移动数组的元素
     * @param toIndex : number    元素被移动到的新位置的索引
     * @param needMoveTest : (currentValue,index,arr)=>boolean    测试数组元素是否需要被移动的函数，返回 boolean 值，表示当前元素 currentValue 是否需要被移动；
     * @returns Array<Item>   被移动的元素的数组
     */
    moveToUseTest(toIndex: number, needMoveTest: ArrayCallbackFun<T, any>): T[];



    //移动元素：结束





    //插入元素：开始


    /**
     * insertItem(item, toIndex = 0, equalTest)
     * 将指定元素插入到调用者数组中指定索引处，并且会删除调用者数组中与 item 相同的元素
     * @param item : any    被插入的元素
     * @param toIndex : number    元素被插入到的位置的索引
     * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
     * @returns Array<Item>   被删除的元素
     */
    insertItem(item: T, toIndex?: number, equalTest?: TestFun<T>): T[];




    /**
     * insertItemList(itemList, toIndex = 0, equalTest)
     * 将指定数组itemList中的元素插入到调用者数组的指定索引处，并且会删除调用者数组中 与 itemList中元素 相同的元素
     * @param itemList : [any]    被插入的元素数组
     * @param toIndex ? : number    可靠；默认值：0 ； 元素被插入到的位置的索引；
     * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
     * @returns Array<Item>   被删除的元素
     */
    insertItemList(itemList: T[], toIndex?: number, equalTest?: TestFun<T>): T[];


    //插入元素：结束







    //删除元素：开始

    /**
     * delete(start, end)
     * 根据索引删除数组的元素
     * @param start : number   被删除的元素的开始索引
     * @param end ? : number   可选，默认值：start ； 被删除的元素的结束索引；
     * @returns Array   被删除的元素的数组
     */
    delete(start: number, end?: number): T[];





    /**
     * deleteIndexs(...indexs)
     * 删除数组中指定的元素
     * @param index : number   被删除的元素的索引
     * @returns Array<Item>   被删除的元素的数组
     */
    deleteIndexs(...indexs: number[]): T[];




    /**
     * deleteItems(...items)
     * 删除数组中指定的元素
     * @param item : any   被删除的元素
     * @returns Array<number>   被删除的元素的索引数组
     */
    deleteItems(...items: T[]): number[];






    /**
     * deleteUseTest(needDeleteTest)
     * 根据测试函数批量删除数组的元素
     * @param needDeleteTest : (currentValue,index,arr)=>boolean    测试数组元素是否需要被删除的函数，返回 boolean 值，表示当前元素 currentValue 是否需要被删除；
     * @returns Array<Item>   被删除的元素的数组
     */
    deleteUseTest(needDeleteTest: ArrayCallbackFun<T, any>): T[];


    //删除元素：结束












    //查找元素：开始

    /**
     * filterIndexs(filterTest,thisArg)
     * 该方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素的索引。
     * @param filterTest : (currentValue,index,arr)=>boolean    用来测试数组的每个元素的函数。调用时使用参数 (currentValue,index,arr)。返回true表示保留该元素（通过测试），false则不保留
     * @param thisArg ? : any 可选。执行 callback 时的用于 this 的值。
     * @returns Array<Index>   通过测试的元素的索引
     */
    filterIndexs(filterTest: ArrayCallbackFun<T, any>, thisArg?: any): number[];





    /**
     * 属性; 返回最后一个元素
     */
    lastItem: T;

    //查找元素：结束







    //集合运算：开始

    /**
     * isContains(arr,equalTest)
     * 判断当前数组 是否包含 数组arr 的所有元素；
     * @param arr : Array   被测试的数组
     * @param equalTest ? : (thisEle,arrEle)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素thisEle 和 元素arrEle  相同；
     * @returns boolean
     */
    isContains<U>(arr: U[], equalTest?: (thisEle: T, arrEle: U) => any): boolean;





    /**
     * getIntersection(arr,equalTest)
     * 获取指定数组的交集
     * @param arr  : Array   数组
     * @param equalTest ? : (thisEle,arrEle)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素thisEle 和 元素arrEle  相同；
     * @returns Array   所有指定数组的交集
     */
    getIntersection<U>(arr: U[], equalTest?: (thisEle: T, arrEle: U) => any): Array<T | U>;







    /**
     * isIntersect(arr,equalTest)
     * 判断当前数组与指定数组是否相交
     * @param arr ? : Array   数组
     * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
     * @returns boolean   当前数组与指定数组是否相交
     */
    isIntersect<U>(arr: U[], equalTest?: (thisEle: T, arrEle: U) => any): boolean;





    /**
     * 获取当前数组在指定数组上的补集
     * @param universalArr ? : Array   全集数组
     * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
     * @returns Array   当前数组在指定数组上的补集
     */
    getComplementOn<U>(universalArr: U[], equalTest?: (thisEle: T, arrEle: U) => any): U[];




    /**
     * 获取符合 包含 和 排除 项 的所有元素
     * getIncludeAndExclude(options,equalTest)
     * @param options : {include ?: Array,exclude ?: Array}    必须；配置 包含 和 排除 数组 的 选项；
     * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
     * @returns Array   返回符合 options 中设置的 包含 和 排除 项 的所有元素
     */
    getIncludeAndExclude<I, E>(options: { include?: I[], exclude?: E[] }, equalTest?: (thisItem: Array<T>, otherItem: Array<I | E>) => boolean): T[];


    //集合运算：结束






    //处理索引：开始

    /**
     * 获取指定索引的反相索引，即从后往前的索引，从0开始
     * @param index : number   正向的索引
     */
    reverseIndexForIndex(index: number): number;

    //处理索引：结束







    //队列：开始

    /**
     * queuePush(item1, item2, ..., itemX)
     * 从队列尾部推入所有的item；此操作会从数组开始删除相应的数目的元素
     * @param item : any    推入队列的元素
     * @returns Array    返回包含所有删除元素的数组
     */
    queuePush(...items: T[]): T[];




    /**
     * queuePop()
     * 从队列尾部推出（删除）一个item；此操作会将数组剩下的元素往数组尾部移动一位；
     * @returns any    返回被删除的元素
     */
    queuePop(): T;




    /**
     * queueUnshift(item1, item2, ..., itemX)
     * 从队列头部推入所有的item；此操作会从数组尾部删除相应的数目的元素
     * @param item : any    推入队列的元素
     * @returns Array    返回包含所有删除元素的数组
     */
    queueUnshift(...items: T[]): T[];




    /**
     * queueShift()
     * 从队列头部推出（删除）一个item；此操作会将数组剩下的元素往数组头部移动一位；
     * @returns any    返回被删除的元素
     */
    queueShift(): T[];

    //队列：结果

  }


  interface ArrayConstructor {


    //集合运算：开始

    /**
     * 获取所有指定数组的交集
     * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
     * @param array ? : Array   数组
     * @returns Array   所有指定数组的交集
     */
    intersectionOf<T>(equalTest: TestFun<T>, ...arrays: Array<Array<T>>): T[];




    /**
     * 判断所有指定数组是否有交集
     * @param equalTest ? : (a,b)=>boolean    可选， 默认是通过全等 === 来判断元素是否相等的；测试数组元素是否相同的函数，返回 boolean 值，表示 元素a 和 元素b  相同；
     * @param array ? : Array   数组
     * @returns boolean   所有指定数组是否有交集
     */
    isIntersect<T>(equalTest: TestFun<T>, ...arrays: Array<Array<T>>): T[];


    //集合运算：结束








    /**
     * isArrayLike(target)
     * 判断 target 是否为 类数组对象
     * @param target : any    目标
     * @returns boolean
     */
    isArrayLike(target: any): boolean;


  }






}



export { };
