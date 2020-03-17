/**
 * 接口1:
 * distanceSort(target, num1,num2 ,...)
 * 根据各个 num 在数轴上距 target 远近来排序
 * @param target : number  目标，参考数
 * @param num : number    参与比较的数
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
 *
 *
 * 接口2:
 * distanceSort(target, nums)
 * 根据 nums 各个数在数轴上距 target 远近来排序
 * @param target : number  目标，参考数
 * @param nums : [number]    参考比较的数的数组
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
 */
Math.distanceSort = function distanceSort(target, ...nums) {
  let numList = nums;

  let firstNum = nums[0];
  if ( (nums.length == 1) && Array.isArray(firstNum)) {
    numList = firstNum.slice();
  }

  let disSort = numList.sort(function (a,b) {
    return Math.abs(a - target) - Math.abs(b - target) ;
  });

  return disSort;
}






/**
 * 接口1:
 * nearest(target, num1,num2 ,...)
 * 返回距 target 最近的数
 * @param target : number  目标，参考数
 * @param num : number    参与比较的数
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
 *
 *
 * 接口2:
 * nearest(target, nums)
 * 返回距 target 最近的数
 * @param target : number  目标，参考数
 * @param nums : [number]    参考比较的数的数组
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
 */
Math.nearest = function nearest(target, ...nums) {
  let disSort = Math.distanceSort(target,...nums);
  return disSort[0];
}




/**
 * 接口1:
 * farthest(target, num1,num2 ,...)
 * 返回距 target 最远的数
 * @param target : number  目标，参考数
 * @param num : number    参与比较的数
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
 *
 *
 * 接口2:
 * farthest(target, nums)
 * 返回距 target 最远的数
 * @param target : number  目标，参考数
 * @param nums : [number]    参考比较的数的数组
 * @returns [number]   返回 按距离 target 从近到远排列的数的数组
 */
Math.farthest = function farthest(target, ...nums) {
  let disSort = Math.distanceSort(target,...nums);
  let lastIndex = disSort.length - 1;
  return disSort[lastIndex];
}
