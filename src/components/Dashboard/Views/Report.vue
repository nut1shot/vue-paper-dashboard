<template>
	<div v-if="state==1" class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th v-for="column in columns">
			       {{column_name[column]}}
          </th>
        </thead>          
        <tbody>
          <tr v-for="(item, index) in tb">
            <td v-for="column,c in columns">
              <span v-if="column=='No'">
                  {{index + 1}}
              </span>
              <span v-else-if="column=='detail'">
                  <button v-on:click="detail(item)" class="btn btn-info btn-fill btn-wd">View</button>
              </span>
              <span v-else-if="column=='tax1'">
                  {{columnTax1(item)}}
              </span>
              <span v-else-if="column=='tax2'">
                  {{columnTax2(item)}}
              </span> 
              <span v-else>
                  {{item[column]}}
              </span>       	
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="state==2">
       <p v-if="key!='No' && key!='detail'" v-for="value,key in column_name" style="font-size: x-large;">
        {{ value }} : {{formDetail[key]}}
       </p>
      <button v-on:click="goState(1)" class="btn btn-info btn-fill btn-wd">Back</button>
    </div>
</template>
<script type="text/javascript">
  import axios from 'axios'
  import { evtBus } from 'main'
  export default {
    data () {
      return {
        state: 1,
        columns: ['No', 'firstname', 'lastname', 'email', 'score', 'job', 'basicSalary', 'dob', 'creditCardType', 'tel', 'tax1', 'tax2', 'detail'],
        tb: [],
        column_name: { 'No': 'No.', 'firstname': 'ชื่อ', 'lastname': 'นามสกุล', 'email': 'อีเมล', 'score': 'คะแนน', 'job': 'อาชีพ', 'basicSalary': 'เงินเดือน', 'otherIncomeE': 'รายได้อื่นๆ ที่ได้เท่ากันทุกเดือน', 'otherIncomeN': 'รายได้อื่นๆ ที่ไม่เท่ากันทุกเดือน', 'otIncome': 'โอที', 'comIncome': 'ค่าครองชีพ', 'dob': 'วันเกิด', 'creditCardType': 'บัตร', 'workMonth': 'workMonth', 'workProvince': 'จังหวัดที่ทำงาน', 'tel': 'tel', 'getSalaryBy': 'รับเงินเดือนทาง', 'tax1': 'ภาษี1', 'tax2': 'ภาษี2', 'detail': 'ดูรายละเอียด' },
        formDetail: {}
      }
    },
    mounted () {
      var url = window.api_host + 'user_report'
      axios.post(
        url
      ).then((response) => {
        if (response.data.success) {
          console.log(JSON.stringify(response.data.data))
          this.tb = response.data.data
        } else {
          alert(response.data.error_msg)
        }
      })
    },
    methods: {
      detail (item) {
        console.log(JSON.stringify(item))
        this.formDetail = item
        this.goState(2)
      },
      goState (state) {
        this.state = state
      },
      columnTax1 (item) {
        if (item.kyc) {
          var a = item.kyc.tax1.formDetailList.length
          console.log(a)
          if (a != null) {
            return item.kyc.tax1.formDetailList[0].effDate
          } else {
            return 'ไม่จ่ายภาษี'
          }
        } else {
          return 'ยังไม่มีข้อมูล'
        }
      },
      columnTax2 (item) {
        if (item.kyc) {
          var a = item.kyc.tax2.formDetailList.length
          console.log(a)
          if (a != null) {
            return item.kyc.tax2.formDetailList[0].effDate
          } else {
            return 'ไม่จ่ายภาษี'
          }
        } else {
          return 'ยังไม่มีข้อมูล'
        }
      }
    }
  }
</script>
