<template>
  <div>

    <div class="col-12" v-on:click="goProfile()">
        <chart-card :chart-data="preferencesChart.data"  chart-type="Pie">
          <h4 class="title" slot="title">คะแนนของคุณ{{user.email}}</h4>
          <span slot="subTitle"> </span>
          <div slot="legend" style="display:none">
          </div>
        </chart-card>
      </div>
      
    <div>
      <div v-for="stats in statsCards" style="background:white" :class="[stats.classCss]" class="icon-a">
        <i :class="stats.icon" v-on:click="goToPage(stats.value)" v-if="$store.state.user.age === '' || $store.state.user.age == null "></i>
        <i :class="stats.icon" v-on:click="goToPage(stats.value)" style="color:green" v-else></i>
        <!--
        <i :class="stats.icon" v-on:click="goToPage(stats.value)" style="color:green"></i>
        -->
      </div>
    </div>
    <br>
    <div class="row">
      <div v-for="stats in listCom" v-on:click="goVoucher(stats.code)">
        <stats-card v-if="stats.score <= $store.state.user.score">
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
            title: 'home',
            value: 'home',
            footerText: 'Updated now',
            footerIcon: 'ti-reload',
            classCss: 'class1'
          },
          {
            type: 'success',
            icon: 'ti-car',
            title: 'car',
            value: 'car',
            footerText: 'Last day',
            footerIcon: 'ti-calendar',
            classCss: 'class2'
          },
          {
            type: 'danger',
            icon: 'ti-credit-card',
            title: 'Voucher',
            value: 'Voucher',
            footerText: 'In the last hour',
            footerIcon: 'ti-timer',
            classCss: 'class3'
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
    computed: {
    },
    mounted () {
      this.$sidebar.displaySidebar(false)
      let score = this.$store.state.user.score || 169
      this.$store.state.chartData.series[0] = score
      this.$store.state.chartData.series[1] = 850 - score
      this.$store.state.chartData.labels[0] = score + ' '
    },
    created () {
    },
    methods: {
      goVoucher (code) {
        console.log(this.$store.state.user.email)
        if (this.$store.state.user.email === '') {
          alert('please login')
          evtBus.user.userTmp = true
          window.location.href = '#/admin/register'
        } else {
          this.$store.state.user.code = code
          window.location.href = '#/admin/citibank'
        }
      },
      goProfile () {
        window.location.href = '#/admin/profile'
      },
      goToPage (v) {
        console.log(this.$store.state.user.age)
        if (this.$store.state.user.age === '' || this.$store.state.user.age == null) {
          return
        }
        if (v === 'home') {
          this.statsCards[0].classCss = 'blue'
          this.statsCards[1].classCss = 'red'
          this.statsCards[2].classCss = 'red'
          this.listCom = [
            {
              type: 'success',
              path: 'https://brandinside.asia/wp-content/uploads/2016/11/citibank.png',
              title: 'ธนาคารYY',
              value: 'ดอกเบี้ย 20%',
              footerText: 'Last day',
              footerIcon: 'ti-calendar',
              score: 500,
              code: 1
            },
            {
              type: 'warning',
              path: 'http://www.jobthaiweb.com/company/picture/iaor_logo.gif?d=0',
              title: 'ธนาคารxx',
              value: 'ดอกเบี้ย 10%',
              footerText: 'Updated now',
              footerIcon: 'ti-reload',
              code: 2
            },
            {
              type: 'danger',
              path: 'https://www.egov.go.th/upload/eservice-thumbnail/img_07ce457edfaa09ec5e9c040b52971370.png',
              title: 'ธนาคารZZ',
              value: 'ดอกเบี้ย 30%',
              footerText: 'In the last hour',
              footerIcon: 'ti-timer',
              code: 3
            }
          ]
        } else if (v === 'car') {
          this.statsCards[0].classCss = 'red'
          this.statsCards[1].classCss = 'blue'
          this.statsCards[2].classCss = 'red'
          this.listCom = [
            {
              type: 'warning',
              path: 'http://www.jobthaiweb.com/company/picture/iaor_logo.gif?d=0',
              title: 'ธนาคารxx',
              value: 'ดอกเบี้ย 10%',
              footerText: 'Updated now',
              footerIcon: 'ti-reload',
              score: 250,
              code: 4
            }
          ]
        } else {
          this.statsCards[0].classCss = 'red'
          this.statsCards[1].classCss = 'red'
          this.statsCards[2].classCss = 'blue'
          this.listCom = [
            {
              path: 'https://www.silkspan.com/images_new/crd_cc/card/card_citi_pla_re.gif',
              title: 'citibank',
              value: 'บัตรเครดิต ซิตี้รีวอร์ด',
              score: 300,
              code: 5
            },
            {
              path: 'https://www.silkspan.com/images_new/crd_cc/card/citi_cash-back.gif',
              title: 'citibank',
              value: 'บัตรเครดิต ซิตี้ แคชแบ็ก แพลตตินั่ม',
              score: 400,
              code: 6
            },
            {
              path: 'https://www.silkspan.com/images_new/crd_cc/card/citi_royal.gif',
              title: 'citibank',
              value: 'บัตรเครดิต ซิตี้รอยัลออร์คิดพลัส แพลตตินั่มซีเล็คท์',
              score: 500,
              code: 7
            },
            {
              path: 'https://www.silkspan.com/images_new/crd_cc/card/citi_m.gif',
              title: 'citibank',
              value: 'บัตรเครดิต ซิตี้ เอ็ม วีซ่า',
              score: 500,
              code: 8
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

.red {
  background : white !important;
}

.blue {
  background : #f3bb45 !important;
}
</style>
