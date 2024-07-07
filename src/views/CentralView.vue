<script lang="ts" setup>
import { onMounted ,ref,reactive} from 'vue';
import * as echarts from 'echarts';
import request from '@/utils/request';

const content = ref(null);
const content1 = ref(null)
const content2 = ref(null)
var myChart1:any;
var myChart2:any;
var myChart3:any;
//用户性别
var pie:any;
//包裹发往的目的地
var bar:any;
//销售额
var line_simple:any;
pie =  reactive({
  title: {
    text: '用户性别比',
   
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '数量',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 0, name: '男' },
        { value: 0, name: '女' },
        { value: 0, name: '其他' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});

request("/api/administrator/gender").then(res=>{
  const {data} = res.data;
  pie.series[0].data[0].value = data.men;
  pie.series[0].data[1].value = data.female;
  pie.series[0].data[2].value = data.amount - data.men - data.female;
  myChart1.setOption(pie);
  // console.log(data)
})

request("/api/order/admin/parcel").then(res=>{
  const {data} = res.data;
  for(const item of data){
    // console.log(item)
    bar.yAxis.data.unshift(item.destination);
    bar.series[0].data.unshift(item.total);
  }
  myChart2.setOption(bar);
  // console.log(data)
})

request("/api/order/admin/sales").then(res=>{
  const {data} = res.data;
  for(const item of data){
    // console.log(item)
    line_simple.xAxis.data.push(item.localDate);
    line_simple.series[0].data.push(item.total);
  }
  myChart3.setOption(line_simple);
  console.log(data)
})
bar = {
  title: {
    text: '最近100张订单发往的最多城市'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: [] //城市地址
  },
  series: [
    {
      // name: '2011',
      type: 'bar',
      data: [] //地址对应的数量
    }
  ]
};

line_simple = {
  title: {
    text: '最近7天销售额',
     left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: [] //日期
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [], //日期对应的数据
      type: 'line'
    }
  ]
};

// var chartDom = document.getElementById('main');

onMounted(()=>{
 // console.log(content.value)
   myChart1 = echarts.init(content.value);
   myChart2 = echarts.init(content1.value);
   myChart3 = echarts.init(content2.value);
   pie && myChart1.setOption(pie);
   bar && myChart2.setOption(bar);
   line_simple && myChart3.setOption(line_simple);
})




</script>
<template>
    <!-- 这是根标签 -->
    <div class="wrapper">   
      <div>
        <div> <div ref="content" style="width: 600px;height: 420px;"></div> </div>
        <div> <div ref="content1" style="width: 600px;height: 420px;"></div> </div>
      </div>
        
     <div>
      <div> <div ref="content2" style="width: 980px;height: 820px;"></div> </div>
     </div>
     
    </div>
  </template>
<style scoped> 
.wrapper{
display: flex;
width: 100%;
justify-content: center;
align-items: center;
}
</style>