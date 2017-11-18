<template>
  <div>

    <div class="col-12">
        <chart-card :chart-data="preferencesChart.data"  chart-type="Pie">
          <h4 class="title" slot="title">คะแนนของคุณ{{user.email}}</h4>
          <span slot="subTitle"> </span>
          <div slot="legend" style="display:none">
          </div>
        </chart-card>
      </div>
      
    <div>
      <div v-for="stats in statsCards" class="icon-a">
        <i :class="stats.icon" v-on:click="goToPage(stats.value)" ></i>
      </div>
    </div>

    <div class="row">
      <div v-for="stats in listCom">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <img style="width: 100%;" :src="stats.path">
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
        </stats-card>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { evtBus } from 'main'
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  export default {
    components: {
      StatsCard,
      ChartCard
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        total_score: 850,
        user: {
          email: '',
          score: 250
        },
        statsCards: [
          {
            type: 'warning',
            icon: 'ti-home',
            title: 'บ้าน',
            value: 'บ้าน',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'success',
            icon: 'ti-car',
            title: 'รถ',
            value: 'รถ',
            footerText: 'Last day',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-shopping-cart',
            title: 'Voucher',
            value: 'Voucher',
            footerText: 'In the last hour',
            footerIcon: 'ti-timer'
          }
        ],
        listCom: [
        ],
        preferencesChart: {
          data: this.$store.state.chartData,
          options: {}
        }

      }
    },
    mounted () {
      let score = 170
      this.$store.state.chartData.series[0] = score
      this.$store.state.chartData.series[1] = 850 - score
      this.$store.state.chartData.labels[0] = score + ' '
    },
    created () {
    },
    methods: {
      goToPage (v) {
        if (v === 'บ้าน') {
          this.listCom = [
            {
              type: 'success',
              path: 'https://brandinside.asia/wp-content/uploads/2016/11/citibank.png',
              title: 'ธนาคารYY',
              value: 'ดอกเบี้ย 20%',
              footerText: 'Last day',
              footerIcon: 'ti-calendar'
            },
            {
              type: 'warning',
              path: 'http://www.jobthaiweb.com/company/picture/iaor_logo.gif?d=0',
              title: 'ธนาคารxx',
              value: 'ดอกเบี้ย 10%',
              footerText: 'Updated now',
              footerIcon: 'ti-reload'
            },
            {
              type: 'danger',
              path: 'https://www.egov.go.th/upload/eservice-thumbnail/img_07ce457edfaa09ec5e9c040b52971370.png',
              title: 'ธนาคารZZ',
              value: 'ดอกเบี้ย 30%',
              footerText: 'In the last hour',
              footerIcon: 'ti-timer'
            }
          ]
        } else if (v === 'รถ') {
          this.listCom = [
            {
              type: 'warning',
              path: 'http://www.jobthaiweb.com/company/picture/iaor_logo.gif?d=0',
              title: 'ธนาคารxx',
              value: 'ดอกเบี้ย 10%',
              footerText: 'Updated now',
              footerIcon: 'ti-reload'
            }
          ]
        } else {
          this.listCom = [
            {
              type: 'danger',
              path: 'https://www.egov.go.th/upload/eservice-thumbnail/img_07ce457edfaa09ec5e9c040b52971370.png',
              title: 'ธนาคารZZ',
              value: 'ดอกเบี้ย 30%',
              footerText: 'In the last hour',
              footerIcon: 'ti-timer'
            },
            {
              type: 'success',
              path: 'http://www.jobthaiweb.com/company/picture/iaor_logo.gif?d=0',
              title: 'ธนาคารYY',
              value: 'ดอกเบี้ย 20%',
              footerText: 'Last day',
              footerIcon: 'ti-calendar'
            }
          ]
        }
      }
    }
  }

</script>
<style>
.icon-a {
    font-size: -webkit-xxx-large;
    display: inline-block;
    width: 33%;
    text-align: center;
}
</style>
