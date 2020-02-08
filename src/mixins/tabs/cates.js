import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    // 所有的分类数据
    cateList: [],
    // 默认被激活的索引项
    active: 0,
    // 当前屏幕的可用高度
    wh: 0,
    // 所有的二级分类数据
    secondCate: []
  }
  onLoad() {
    this.getWindowHeight()
    this.getCateList()
  }
  methods = {
    onChange(e) {
      // e.detail是点击项的索引
      //   console.log(e.detail)
      this.secondCate = this.cateList[e.detail].children
      console.log(this.secondCate)
    }
  }
  //   动态获取屏幕可用的高度
  async getWindowHeight() {
    const res = await wepy.getSystemInfo()
    console.log(res)
    if (res.errMsg === 'getSystemInfo:ok') {
      this.wh = res.windowHeight
      this.$apply()
    }
  }
  async getCateList() {
    const { data: res } = await wepy.get('/categories')
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.cateList = res.message
    this.secondCate = res.message[0].children
    this.$apply()
    console.log(this.cateList)
  }
}
