import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    //   搜索框的默认内容
    value: '',
    // 搜索建议列表
    sugguestList: [],
    // 搜索历史列表
    kwList: []
  }
  onLoad() {
    //   页面加载就获取到相应到搜索列表，不存在就返回空数组，存在就返回给kwList
    const kwList = wx.getStorageSync('kw') || []
    this.kwList = kwList
    console.log(kwList)
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
      const kw = e.detail.trim()
      console.log(e.detail)
      if (kw.length <= 0) {
        return
      }
      //   把用户填写到搜索关键词，保存到storage中
      if (this.kwList.indexOf(kw) === -1) {
        this.kwList.unshift(kw)
      }
      //   数组的slice方法不会修改愿数组，而是返回一个新数组
      this.kwList = this.kwList.slice(0, 10)
      wepy.setStorageSync('kw', this.kwList)
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + kw
      })
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
