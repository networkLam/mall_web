<template>
    <div class="wrapper">

        <div id="main" style="width: 100%;height: 400px;"></div>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;
let option:EChartsOption;

option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: "horizontal",
        bottom: '10%'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: '在售' },
                { value: 735, name: '下架' },
            
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
};


/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);

    option && myChart.setOption(option);
})
watchEffect(() => {
})

</script>
<style scoped lang='less'></style>