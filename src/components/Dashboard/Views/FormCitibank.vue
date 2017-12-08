<template>
	<div class="content">
		<div class="row">
	        <div class="col-md-4">
	            <label>วงเงินที่กู้</label>
	            <input type="number" class="form-control border-input" v-model="loan">
	            </input>
	        </div>
	    </div>
	    <div class="spacer" style="height:9px;"></div>
	    <div class="row">
	        <div class="col-md-4">
	            <label>จำนวนเดือนที่ผ่อน</label>
	            <input type="number" class="form-control border-input" v-model="month_pay">
	            </input>
	        </div>
	    </div>
	    <br>
	    <button v-on:click="next" class="btn btn-info btn-fill btn-wd">ถัดไป</button>
      <button v-on:click="webSocket" class="btn btn-info btn-fill btn-wd">webSocket</button>
	</div>
</template>
<script>
import VueWebsocket from 'vue-websocket'
export default {
  data () {
    return {
      loan: '',
      month_pay: ''
    }
  },
  methods: {
    webSocket () {
    },
    next () {
      var validate = 0
      if ((this.loan < 0 || this.loan === '') && validate === 0) {
        alert('กรอก วงเงินที่กู้ ไม่ถูกต้อง')
        validate = 1
      }
      if ((this.month_pay < 0 || this.month_pay === '') && validate === 0) {
        alert('กรอก จำนวนเดือนที่ผ่อน ไม่ถูกต้อง')
        validate = 1
      }
      if (validate === 1) {
        return 0
      } else {
        var url = window.api_host + 'save_application'
        var email = this.$store.state.user.email
        var code = this.$store.state.user.code
        var loan = this.loan
        var monthPay = this.month_pay
        var data = {'email': email, 'code': code, detail: {'loan': loan, 'monthPay': monthPay}}
        console.log(data)
        axios.post(
          url,
          data,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.data.success) {
            alert(response.data.error_msg)
            window.location.href = '#/admin/blank'
          } else {
            alert(response.data.error_msg)
          }
        })
      }
    }
  }
}
</script>
