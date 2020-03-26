
declare global {
    interface Math {
        /* 
* distanceSort(target, nums)
* 根据 nums 各个数在数轴上距 target 远近来排序
* @param target : number  目标，参考数
* @param nums : [number]    参考比较的数的数组
* @returns [number]   返回 按距离 target 从近到远排列的数的数组
*/
        distanceSort(target: number, nums: number[]): number[];

        /* 
 * distanceSort(target, num1,num2 ,...)
 * 根据各个 num 在数轴上距 target 远近来排序
 * @param target : number  目标，参考数
 * @param num : number    参与比较的数
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
 *
        */
        distanceSort(target: number, ...nums: number[]): number[];


        /* 
         * nearest(target, nums)
 * 返回距 target 最近的数
 * @param target : number  目标，参考数
 * @param nums : [number]    参考比较的数的数组
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
        */
        nearest(target: number, nums: number[]): number[];

        /* 
         * nearest(target, num1,num2 ,...)
 * 返回距 target 最近的数
 * @param target : number  目标，参考数
 * @param num : number    参与比较的数
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
        */

        nearest(target: number, ...nums: number[]): number[];



        /* 
         * farthest(target, nums)
  * 返回距 target 最远的数
  * @param target : number  目标，参考数
  * @param nums : [number]    参考比较的数的数组
  * @returns [number]   返回 按距离 target 从近到远排列的数的数组
        */
        farthest(target: number, nums: number[]): number[];


        /* 
         * 返回距 target 最远的数
  * @param target : number  目标，参考数
  * @param num : number    参与比较的数
  * @returns [number]   返回 按距离 target 从近到远排列的数的数组
        */
        farthest(target: number, ...nums: number[]): number[];



    }

}

export { }