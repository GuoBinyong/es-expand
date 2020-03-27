declare global {

    interface URL {

    /**
     * get:把 URLSearchParams 转换对象形式；
     * set: newValue : Object | string | URLSearchParams    把当前URL的查询参数重置成  params
     */
        params:object | string | URLSearchParams;
    }

}


export {}