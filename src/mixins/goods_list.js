import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    // 查询关键词
    query: '',
    // 商品分类的ID
    cid: '',
    // 页码值
    pagenum: 1,
    // 每页显示多少数据
    pagesize: 10,
    // 商品列表数据
    goodslist: [],
    // 总数据条数
    total: 0
  }
  onLoad(options) {
    console.log(options)
    // 如果没有传入这些数据，那么就默认赋值为空字符串
    this.query = options.query || ''
    this.cid = options.cid || ''
    this.getGoodsList()
  }
  //   获取商品列表数据
  async getGoodsList() {
    const { data: res } = await wepy.get('/goods/search', {
      query: this.query,
      cid: this.cid,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
    console.log(res)
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.goodslist = res.message.goods
    this.total = res.message.total
    this.$apply()
  }
}
