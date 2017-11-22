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
	</div>
</template>
<script>
export default {
  data () {
    return {
      loan: '',
      month_pay: ''
    }
  },
  methods: {
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
        alert('save')
        window.location.href = '#/admin/blank'
      }
    }
  }
}
</script>
