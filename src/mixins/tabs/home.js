import wepy from 'wepy'

// 先导入wepy的包 再创建一个基于wepy.minxin的类
export default class extends wepy.mixin {
  data = {
    //   轮播图数据获取存放数据的空数组
    swiperList: [],
    // 分类的数据的获取
    cateItems: [],
    // 楼层相关的数据
    floorData: []
  }
  onLoad() {
    this.getSwiperData()
    this.getCateItems()
    this.getFloorData()
  }
  methods = {
    //   点击楼层中的每一张图片，都要跳转到商品列表页面
    goGoodsList(url) {
      wepy.navigateTo({
        url
      })
    }
  }
  // 获取轮播图数据的函数
  async getSwiperData() {
    const { data: res } = await wepy.get('/home/swiperdata')
    console.log(res)
    if (res.meta.status !== 200) {
      //   return console.log('获取数据失败')
      //   封装的baseToast错误消息提示框 在需要的地方都可以调用
      return wepy.baseToast()
    }
    // 获取成功了，就把数据挂载到数组里面
    this.swiperList = res.message
    this.$apply()
  }
  // 获取首页分类相关的数据项
  async getCateItems() {
    const { data: res } = await wepy.get('/home/catitems')
    console.log(res)

    if (res.meta.status !== 200) {
      //   return console.log('获取数据失败')
      // 获取数据的信息提示弹框
      //   return wepy.showToast({
      //     title: '获取数据失败!',
      //     // 弹框携带的图标
      //     icon: 'none',
      //     duration: 1500
      //   })
      return wepy.baseToast()
    }
    this.cateItems = res.message
    this.$apply()
  }
  //   获取楼层的数据
  async getFloorData() {
    const { data: res } = await wepy.get('/home/floordata')
    if (res.meta.status !== 200) {
      //   return console.log('获取数据失败')
      //   封装的baseToast错误消息提示框 在需要的地方都可以调用
      return wepy.baseToast()
    }
    // 获取成功了，就把数据挂载到数组里面
    this.floorData = res.message
    this.$apply()
    console.log(this.floorData)
  }
}
