export default {
  data(){
    return {
      refreshKey: ''
    }
  },
  watch:{
    $route(){
      this.refreshKey = Date.parse(new Date) + Math.round(Math.random()*1000)
    }
  },
}


