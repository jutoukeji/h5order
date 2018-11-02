<template>
  <section class="container">
    <header class="flex-box header">
      <div class="shop-logo">
        <img src="../assets/img/logo.png">
      </div>
      <div class="flex1 shop-msg flex-box jtfc-space-between direction-column">
        <p>聚头科技</p>
        <p>公告：欢迎光您，很高兴为您服务</p>
        <p>活动：满100减10</p>
      </div>
    </header>
    <section>
      <div class="flex-box body">
        <div class="menu flex1">
          <ul>
            <li v-for="(menu,idx) in menuList" :class="idx==activeMenuIdx?'active':''" @click="switchType(idx,menu)" :key="idx">
              {{menu.name}}
            </li>
          </ul>
        </div>
        <div class="content">
          <div class="nav-title">{{categoryType}}</div>
          <div class="food-list">
            <food-item v-for="(food, idx) in dataList" :food-item="food" :key="idx"></food-item>
          </div>
        </div>
      </div>
    </section>
    <footer></footer>
  </section>
</template>

<script>
import FoodItem from '@/components/FoodItem'
export default {
  name: 'HelloWorld',
  components:{
    FoodItem
  },
  data () {
    return {
      menuList: [{name:'热销'},{name:'经典快餐(含米饭)'},{name:'下菜单品'},{name:'烫类'},
                 {name:'单品1'},{name:'单品2'},{name:'单品3'},{name:'单品4'},
                 {name:'单品1'},{name:'单品2'},{name:'单品3'},{name:'单品4'},
                 {name:'单品1'},{name:'单品2'},{name:'单品3'},{name:'单品4'},
                 {name:'单品1'},{name:'单品2'},{name:'单品3'},{name:'单品4'}],
      activeMenuIdx: 0,
      dataList: [{typeName: '热销',name: '农家小炒肉(含米饭)',price: '23',monthSale:99,dznum: 8},
                 {typeName: '热销',name: '农家一碗香(含米饭)',price: '28',monthSale:56,dznum: 2},
                 {typeName: '热销',name: '农家土豆烧鸡(含米饭)',price: '25',monthSale:48,dznum: 6},
                 {typeName: '经典快餐',name: '啤酒鸭',price: '23',monthSale:99,dznum: 52},
                 {typeName: '经典快餐',name: '麻婆豆腐(含米饭)',price: '23',monthSale:99,dznum: 36},
                 {typeName: '热销',name: '农家一碗香(含米饭)',price: '28',monthSale:56,dznum: 2},
                 {typeName: '热销',name: '农家土豆烧鸡(含米饭)',price: '25',monthSale:48,dznum: 6},
                 {typeName: '经典快餐',name: '啤酒鸭',price: '23',monthSale:99,dznum: 52},
                 {typeName: '经典快餐',name: '麻婆豆腐(含米饭)',price: '23',monthSale:99,dznum: 36},
                 {typeName: '热销',name: '农家一碗香(含米饭)',price: '28',monthSale:56,dznum: 2},
                 {typeName: '热销',name: '农家土豆烧鸡(含米饭)',price: '25',monthSale:48,dznum: 6},
                 {typeName: '经典快餐',name: '啤酒鸭',price: '23',monthSale:99,dznum: 52},
                 {typeName: '经典快餐',name: '麻婆豆腐(含米饭)',price: '23',monthSale:99,dznum: 36}],
      categoryType: "热销"
    }
  },
  methods:{
    switchType(idx,menu){
      this.activeMenuIdx = idx;
      this.categoryType = menu.name;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  background: #333;
}
.header{
  color: #FFF;
  padding: 0.1rem;
  font-size: 0.12rem;
  height: 1rem;
}
.shop-logo{
  height: 0.7rem;
  width: 0.7rem;
  margin-right: 0.1rem;
}
.shop-logo > img{
  height: 100%;
  border-radius: 0.05rem;
}
.shop-msg{
  /*height: 100%;*/
}
.body{
  background: #FFF;
  height: 100%;
}
.menu{
  background: #efefef;
  font-size: 0.12rem;
  color: #666;
  overflow-y: auto; 
}
.menu ul li{
  padding: 0.12rem 0.08rem;
}
.menu ul li.active{
  color: #000;
  background: #FFF;
  font-weight: bold;
}
.flex-box .content{
  flex: 4;
  position: relative;
}
.food-list{
  padding: 0 0.1rem;
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0.4rem;  
}
.nav-title{
  line-height: 0.36rem;
  margin-left: 0.1rem;
}
</style>
