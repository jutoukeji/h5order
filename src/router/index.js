import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
/**按需加载**/
const OrderList = r => require.ensure([], () => r(require('@/pages/OrderList')), 'OrderList')
const OrderDetail = r => require.ensure([], () => r(require('@/pages/OrderDetail')), 'OrderDetail')
const OrderBuy = r => require.ensure([], () => r(require('@/pages/OrderBuy')), 'OrderBuy')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/order/list',
      component: OrderList
    },
    {
      path: '/order/detail/:orderId',
      component: OrderDetail
    },
    {
      path: '/order/buy',
      component: OrderBuy
    }
  ]
})
