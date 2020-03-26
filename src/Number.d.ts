

declare global {


    interface Number {

        /* 
           * distanceSort(nums)
   * 根据 nums 各个数在数轴上距 自己 远近来排序
   * @param nums : [number]    参考比较的数的数组
   * @returns [number]   返回 按距离 自己 从近到远排列的数的数组
        */
        distanceSort(nums:number[]):number[];

        /* 
   * distanceSort(num1,num2 ,...)
   * 根据各个 num 在数轴上距 自己 远近来排序
   * @param num : number    参与比较的数
   * @returns [number]   返回 按距离 自己 从近到远排列的数的数组
        */
        distanceSort(...nums:number[]):number[];


        

        /* 
        * nearest(nums)
   * 返回距 自己 最近的数
   * @param nums : [number]    参考比较的数的数组
   * @returns [number]   返回 按距离 自己 从近到远排列的数的数组
        */
       nearest(nums: number[]): number[];

       /* 
   * nearest(num1,num2 ,...)
   * 返回距 自己 最近的数
   * @param num : number    参与比较的数
   * @returns [number]   返回 按距离 自己 从近到远排列的数的数组
       */
       nearest(...nums: number[]): number[];



       /* 
   * farthest(nums)
   * 返回距 自己 最远的数
   * @param nums : [number]    参考比较的数的数组
   * @returns [number]   返回 按距离 自己 从近到远排列的数的数组
       */
       farthest(nums: number[]): number[];


       /* 
   * farthest(num1,num2 ,...)
   * 返回距 自己 最远的数
   * @param num : number    参与比较的数
   * @returns [number]   返回 按距离 自己 从近到远排列的数的数组
       */
       farthest(...nums: number[]): number[];


    }

}



export {}