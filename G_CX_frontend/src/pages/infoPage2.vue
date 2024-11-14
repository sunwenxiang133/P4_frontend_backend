<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered v-for="item in serverList" :key="item.osd" style="flex-basis: calc(50% - 40px); /* 每个元素占据父容器宽度的一半减去间距 */
  margin: 20px;">
      <!-- <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      /> -->

      <q-card-section>
        <div class="text-overline text-grey-9">服务器序号{{ item.osd }}</div>
        <!-- <div class="text-h5 q-mt-sm q-mb-xs">{{ item.osd }}</div> -->
        <!-- <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div> -->
        <q-list>
        <div style="display: flex;justify-content: space-between;flex-wrap: wrap;">
        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="primary" name="local_bar" />
          </q-item-section>

          <div>
            <div> 时延</div>
            <div style="font-size: 1.5rem;">{{ item.info.delay }}</div>
          </div>
        </q-item>

        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="red" name="local_gas_station" />
          </q-item-section>

          <div>
            <div>时延抖动律</div>
            <div style="font-size: 1.5rem;">{{ item.info.delay_jitter_rate }}</div>
          </div>
        </q-item>

        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <div>
            <div>CPU使用率百分比</div>
            <div style="font-size: 1.5rem;">{{ item.info.cpu_usage }}</div>
          </div>
        </q-item>
        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <div>
            <div>内存使用率百分比</div>
            <div style="font-size: 1.5rem;">{{ item.info.memory_usage }}</div>
          </div>
        </q-item>
        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <div>
            <div>OSD读速度(KB/s)</div>
            <div style="font-size: 1.5rem;">{{ item.info.OSD_reading_speed }}</div>
          </div>
        </q-item>
        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <div>
            <div>OSD写速度(KB/s)</div>
            <div style="font-size: 1.5rem;">{{ item.info.OSD_writing_speed }}</div>
          </div>
        </q-item>
        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <div>
            <div>交换机链路发送速度(MB/s)</div>
            <div style="font-size: 1.5rem;">{{ (item.info.packets_send_speed/ 1000).toFixed(2) }}</div>
          </div>
        </q-item>
        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <div>
            <div>交换机链路接收速度(MB/s)</div>
            <div style="font-size: 1.5rem;">{{ (item.info.packets_receive_speed/ 1000).toFixed(2) }}</div>
          </div>
        </q-item>
        <q-item clickable class="insideItem">
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <div>
            <div>排队数量</div>
            <div style="font-size: 1.5rem;">{{ item.info.queued_data }}</div>
          </div>
        </q-item>
        </div>
      </q-list>
      </q-card-section>

      <q-card-actions>
        <!-- <q-btn flat color="dark" label="Share" />
        <q-btn flat color="primary" label="Book" /> -->

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <!-- <q-separator />
          <q-card-section class="text-subitle2">
            {{ lorem }}
          </q-card-section> -->
          <!-- <v-chart :options="lineChartOptions" /> -->
           <!-- <VueECharts
              v-for="(item2, index) in chartData"
              :key="index"
              :options="getChartOptions(item2)"
              class="vue-echarts"
              style="width: 100%; height: 400px;"
            /> -->
            <div v-for="(chart, index) in chartData" :key="index" class="chart-container" :id="'chart' + index" ></div>

        </div>
      </q-slide-transition>
    </q-card>
  </div>
  <!-- <VueECharts
              v-for="(item, index) in chartData"
              :key="index"
              :options="getChartOptions(item)"
              style="width: 100%; height: 400px;"
            /> -->
            <!-- <VueECharts
              v-for="(item2, index) in chartData"
              :key="index"
              :options="getChartOptions(item2)"
              style="width: 100%; height: 400px;"
            /> -->
    <!-- <q-btn @click="testApi">123123</q-btn> -->
  </q-page>
</template>

<script setup>
import { getserver1info,getserver2info,getserver3info,getlinechart1,getlinechart2,getlinechart3 } from 'src/api/api';
import {ref, onMounted, nextTick} from 'vue'
import * as echarts from 'echarts';
import VueECharts from 'vue-echarts';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';



// 注册echarts需要的组件
use([LineChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer]);

// 延迟初始化
onMounted(() => {
  testApi();
  setTimeout(() => {
    const charts = document.querySelectorAll('.vue-echarts');
    charts.forEach(chart => {
      chart?.echartsInstance?.resize();  // 延迟调用resize
    });
  }, 10000);
});

// 模拟传入的7个数据
const chartData = ref([
  {
    title: '图表 1',
    data: [20, 30, 40, 50, 60, 70, 80]
  },
  {
    title: '图表 2',
    data: [15, 25, 35, 45, 55, 65, 75]
  },
  {
    title: '图表 3',
    data: [10, 20, 30, 40, 50, 60, 70]
  }
]);

// import VChart from 'echarts-for-vue';

const expanded=ref(false)
const lorem='123123123'
let serverList=ref();
let serverLineList=ref();

// const lineChartOptions = ref({
//   tooltip: {
//     trigger: 'axis'
//   },
//   xAxis: {
//     type: 'category',
//     data: [1,2,3,3,3,3,3]
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: [1,2,3,3,3,3,3],
//       type: 'line'
//     }
//   ]
// });

// 获取每个折线图的配置
const getChartOptions = (item) => {
  return {
    title: {
      text: item.title
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '数据',
        type: 'line',
        data: item.data
      }
    ]
  };
};

const testApi=async()=>{
  let tmp=await getserver2info();
  let tmp2=await getlinechart2();
  console.log(tmp);
  serverList.value=tmp.data.data.serverInfo
  serverLineList.value=tmp.data.data.lineChartObject
  console.log(serverList.value);

   nextTick(() => {
      chartData.value.forEach((item, index) => {
        // 获取图表容器
        const chartDom = document.getElementById('chart' + index);

        // 初始化echarts实例
        const chart = echarts.init(chartDom);

        // 设置图表的配置项
        const options = {
          title: {
            text: item.title
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '数据',
            type: 'line',
            data: item.data
          }]
        };

        // 设置图表选项
        chart.setOption(options);
      });
    });
}

</script>

<style scoped lang="scss">
.insideItem {
  flex-basis: calc(50% - 10px); /* 每个元素占据父容器宽度的一半减去间距 */
  margin: 5px; /* 元素之间的间距 */
}

.chart-container {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}
</style>
