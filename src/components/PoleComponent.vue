<template>
    <!-- 这个是sale左边的图表 -->
    <div ref="saleLeft">
        <div ref="one" class="one">
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent ,ref,onMounted} from 'vue'
  import * as echarts from 'echarts';
  type EChartsOption = echarts.EChartsOption;
  export default defineComponent({
    setup() {
        const one = ref(null);
        onMounted(()=>{
            var myChart = echarts.init(one.value!);
            var option: EChartsOption;
        option = {
            title: {
                text: '各地区季度出货总量'
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
                boundaryGap: [0, 0.01],
                name:"元",
                nameLocation:"end",
                nameTextStyle:{
                    fontWeight:'bolder',
                    fontSize:14
                },
               
            },
            yAxis: {
                type: 'category',
                data: ['山东', '上海', '江苏', '浙江', '福建', '广东'],
                inverse:true
            },
            series: [
                {
                realtimeSort: true,
                seriesLayoutBy: 'column',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 213020],
                backgroundStyle:{
                    color:"red"
                },
                },
            ]
            };
  
        option && myChart.setOption(option);
         window.addEventListener("resize", function() {
          myChart.resize()
         
        })
        })
        return{
            one
        }
    },
  })
  </script>
  
  <style scoped>
  .one{
    width:40%;
    height: 400px;
  }
  </style>