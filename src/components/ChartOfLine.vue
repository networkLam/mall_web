<template>
    <div class="wrapper">
        <div id="chart" style="width: 100%;height: 400px;"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;
interface Props {
    date: string[],
    data: number[]
}


const props = defineProps<Props>()

/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();

/**
 * echart data
 */
let chartInstance: any = null;

const updateChart = () => {
    if (chartInstance === null) return;
    const option: EChartsOption = reactive(
        {
            title: {
                // text: 'Stacked Area Chart'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    data: props.date
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '销售额',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    // data: [120, 132, 101, 134, 90, 230, 210]
                    data: props.data
                }
            ]
        });
    chartInstance.setOption(option);
}

onMounted(() => {
    var chartDom = document.getElementById('chart')!;
    chartInstance = echarts.init(chartDom);
    updateChart();
    // option && myChart.setOption(option);
})
watch([() => props.date, () => props.data], () => {
    updateChart();
});

</script>
<style scoped lang='less'></style>