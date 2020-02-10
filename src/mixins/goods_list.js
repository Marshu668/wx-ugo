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
    total: 0,
    // 数据是否加载完毕的值， 默认数据没有加载完
    isover: false,
    // 表示当前数据是否正在请求中
    isloading: false
  }
  onLoad(options) {
    console.log(options)
    // 如果没有传入这些数据，那么就默认赋值为空字符串
    this.query = options.query || ''
    this.cid = options.cid || ''
    this.getGoodsList()
  }

  methods = {
    goGoodsDetail(goods_id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + goods_id
      })
    }
  }
  //   获取商品列表数据
  async getGoodsList(callback) {
    this.isloading = true
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
    // 实现上拉加载更多的效果， 旧数据拼接上新数据之后，再重新赋值，使用展开运算符
    this.goodslist = [...this.goodslist, ...res.message.goods]
    this.total = res.message.total
    this.isloading = false
    this.$apply()
    // 外界传入回调函数就调用   没有传入就不调用
    callback && callback()
  }
  //   触底操作
  onReachBottom() {
    //   判断当前是否正在请求数据
    if (this.isloading) {
      return
    }
    //   先判断是否有下一页数据  有就获取更新  没有就直接return，不会发出下一页的请求
    if (this.pagenum * this.pagesize >= this.total) {
      this.isover = true
      return
    }
    console.log('fffff')
    // 每加一页就重新获取页面数据
    this.pagenum++
    this.getGoodsList()
  }
  //   下拉刷新的操作
  onPullDownRefresh() {
    //   初始化的必要字段值
    this.pagenum = 1
    this.total = 0
    this.goodslist = []
    this.isover = this.isloading = false
    // 重新发起的数据请求
    this.getGoodsList(() => {
      // 停止下拉刷新行为
      wepy.stopPullDownRefresh()
    })
  }
}
