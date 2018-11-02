<template>
  <div class="flex-box item-box">
    <div class="img-box">
      <img src="../assets/img/logo.png">
    </div>
    <div class="content">
      <p class="name">{{foodItem.name}}</p>
      <p class="small">
        <small>
          <em>月售{{foodItem.monthSale}}</em>
          <em>赞{{foodItem.dznum}}</em>
        </small>
      </p>
      <div class="bottom">
        <span class="red">￥{{foodItem.price}}</span>
        <div class="opt">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    foodItem:{
      default: null,
      type: Object
    }
  },
  data () {
    return {

    }
  },
  methods:{
    
  },
  computed:{
    imgSrc(){
      return '../assets/img/logo.png';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-box{
  padding: 0.1rem 0;
}
.img-box{
  height: 0.7rem;
  width: 0.7rem;
}
.img-box img{
  height: 100%;
}
.content{
  position: relative;
  margin-left: 0.1rem;
}
.content .name{
  font-size: 14px;
  font-weight: bold;
  color: #000;
}
.small{
  font-size: 0.12rem;
}
.small em:first-child{
  display: inline-block;
  width: 0.5rem;
}
.bottom{
  position: absolute;
  left: 0;
  bottom: 0;
}
.red{
  color: red;
  font-weight: bold;
}
</style>
