
declare global {

    interface DateConstructor {


        /**
 *
 *
 *
 * 接口1
 * getDaysOfMonth()
 * 获取当前时间实例所在月份的总天数
 * @returns number   返回当前时间所在月份的总天数
 * 
 * 
 * 
 * 
 *
 * 接口2
 * getDaysOfMonth(date)
 * 获取指定时间实例所在月份的总天数
 * @param date : Date  Date 实例。
 * @returns number   返回指定月份的天数
 * 
 * 
 * 
 * 接口3
 * getDaysOfMonth(timestamp)
 * 获取指定时间所在月份的总天数
 * @param timestamp : number  代表自1970年1月1日00:00:00 (世界标准时间) 起经过的毫秒数。
 * @returns number   返回指定月份的天数
 * 
 * 
 * 
 * 
 * 接口4
 * getDaysOfMonth(dateString)
 * 获取指定时间所在月份的总天数
 * @param dateString : string  日期的字符串值。该字符串应该能被 Date.parse() 方法识别
 * @returns number   返回指定月份的天数
 *
 *
 */

        getDayNumberOfMonth(date?: number | string | Date): number;


        /* 
         * 接口5
         * getDaysOfMonth(year, month)
         * 获取指定月份的总开数
         * @param year : number  年份
         * @param month : number  月份
         * @returns number   返回指定月份的天数
        */
        getDaysOfMonth(year: number, month: number): number;

    }



    interface Date {
        /**
 * 获取该日期所在月份的天数
 */
        getDayNumber(): number;

        /**
 * setYearOffset(offset)
 * 设置年份偏移量 正数：向未来偏移，负数，表示向过去偏移
 * @param offset : number   偏移量，正数：向未来偏移，负数，表示向过去偏移
 * @returns number   偏移后的年份
 */
        setYearOffset(offset: number): number;




        /**
 * setMonthOffset(offset)
 * 设置月份偏移量 正数：向未来偏移，负数，表示向过去偏移
 * @param offset : number   偏移量，正数：向未来偏移，负数，表示向过去偏移
 * @returns number   偏移后的月份
 */
        setMonthOffset(offset: number): number;



        /**
         * setDateOffset(offset)
         * 设置天偏移量 正数：向未来偏移，负数，表示向过去偏移
         * @param offset : number   偏移量，正数：向未来偏移，负数，表示向过去偏移
         * @returns number   偏移后的天
         */
        setDateOffset(offset: number): number;



        /**
         * setHourOffset(offset)
         * 设置小时偏移量 正数：向未来偏移，负数，表示向过去偏移
         * @param offset : number   偏移量，正数：向未来偏移，负数，表示向过去偏移
         * @returns date : number   偏移后的小时
         */
        setHourOffset(offset: number): number;




        /**
         * setMinuteOffset(offset)
         * 设置分钟偏移量 正数：向未来偏移，负数，表示向过去偏移
         * @param offset : number   偏移量，正数：向未来偏移，负数，表示向过去偏移
         * @returns number   偏移后的分钟
         */
        setMinuteOffset(offset: number): number;



        /**
         * setSecondOffset(offset)
         * 设置秒数偏移量 正数：向未来偏移，负数，表示向过去偏移
         * @param offset : number   偏移量，正数：向未来偏移，负数，表示向过去偏移
         * @returns number   偏移后的秒数
         */
        setSecondOffset(offset: number): number;





        /**
         * setMillisecondOffset(offset)
         * 设置亳秒数偏移量 正数：向未来偏移，负数，表示向过去偏移
         * @param offset : number   偏移量，正数：向未来偏移，负数，表示向过去偏移
         * @returns number   偏移后的亳秒数
         */
        setMillisecondOffset(offset: number): number;



    }

}


export {};