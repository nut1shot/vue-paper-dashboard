<template>
  <div class="card">
    <div class="header">
      <h4 class="title">ข้อมูลบุคคล</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-4">
            <label>อายุ</label>
            <input type="text" class="form-control border-input"
                      placeholder="Age"
                      v-model="user.age">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>อาชีพ</label>
            <input type="text" class="form-control border-input"
                      placeholder="Job"
                      v-model="user.job">
            </input>
          </div>
        </div>

        <br>
        <div class="text-left">
            <button v-on:click="save" class="btn btn-info btn-fill btn-wd">ดำเนินการต่อ</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        user: {
          firstname: '',
          email: '',
          lastname: '',
          password: '',
          dob: ''
        }
      }
    },
    methods: {
      save () {
        var url = window.api_host + 'register'

        if (this.user.password !== this.user.cPassword) {
          return alert('Password incorrect')
        }

        axios.post(
          url,
          this.user,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          console.log(response)
          alert(response.data.error_msg)
        })
      }
    }
  }

</script>
<style>

</style>
