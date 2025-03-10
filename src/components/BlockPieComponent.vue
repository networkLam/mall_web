<template>
    <div class="wrapper">

        <div id="main" style="width: 100%;height: 400px;"></div>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed, watch } from 'vue';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

interface Props {
    onSales: number,
    notSales: number
}
const props = defineProps<Props>();
let chartsInstance: any = null;
watch([() => props.onSales, () => props.notSales], () => {
    updateChart();
})

const updateChart = () => {
    if (chartsInstance === null) return;
    let option: EChartsOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: "horizontal",
            bottom: '10%'
        },
        series: [
            {
                name: '商品数据',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: props.onSales, name: '在售' },
                    { value: props.notSales, name: '下架' },
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
    chartsInstance.setOption(option);
}
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
    var chartDom = document.getElementById('main')!;
    chartsInstance = echarts.init(chartDom);
    updateChart();
    // option && myChart.setOption(option);
})

</script>
<style scoped lang='less'></style>