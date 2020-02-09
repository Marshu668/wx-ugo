import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    //   搜索框的默认内容
    value: '',
    // 搜索建议列表
    sugguestList: []
  }
  methods = {
    //   当搜索关键词发送变化，就好触发这个事件处理函数
    onChange(e) {
      console.log(e.detail)
      //   判断如果输入内容为空时  就清空，否则就显示输入的内容
      if (e.detail.trim().length <= 0) {
        this.sugguestList = []
        return
      }
      this.getSuggestList(e.detail)
    },
    //   触发了搜索
    onSearch(e) {
      // e.detail 就是最新 的搜索关键词
      console.log(e.detail)
    },
    // 触发了取消
    onCancel() {
      this.sugguestList = []
    },
    // 点击搜索项，导航到商品详情页面
    goGoodsList(goods_id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + goods_id
      })
    }
  }
  async getSuggestList(searchStr) {
    const { data: res } = await wepy.get('/goods/qsearch', { query: searchStr })
    console.log(res)
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    // 当获取到数据的时候给他 重新赋值
    this.sugguestList = res.message
    this.$apply()
  }
}
