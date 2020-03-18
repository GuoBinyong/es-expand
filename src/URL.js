//URL扩展：开始
if (!globalThis.URL && globalThis.webkitURL) {
  globalThis.URL = globalThis.webkitURL;
}


if (globalThis.URL) {

  let propertyDescriptors = {

    /**
     * get:把 URLSearchParams 转换对象形式；
     * set: newValue : Object | string | URLSearchParams    把当前URL的查询参数重置成  params
     */
    params: {
      enumerable: false,
      get: function () {
        return this.searchParams.toParams();
      },

      set: function (newValue) {
        this.searchParams.resetParams(newValue);
      }
    },
  };


  Object.defineProperties(globalThis.URL.prototype, propertyDescriptors);
}

//URL扩展：结束
