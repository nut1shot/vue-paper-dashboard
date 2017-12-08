<template>
	<div class="card">
        <div class="header">
        <h4 class="title">ยืนยันตัวตน</h4>
        </div>
        <div class="content">
        <form v-on:submit.prevent="onSubmit">
            <div class="row">
                <div class="col-md-4">
                    <label>เลขบัตรประชาชน</label>
                    <input type="number" class="form-control border-input"
                            v-model="user.citizenIdF">
                    </input>
                </div>
            </div>
            <div class="spacer" style="height:9px;"></div> 
            <div class="row">
                <div class="col-md-4">
                    <label>เลขหลังบัตรประชาชน</label>
                    <input type="text" class="form-control border-input"
                            v-model="user.citizenIdB">
                    </input>
                </div>
            </div>
            <br>
            <div class="text-left">
                <button v-on:click="submit" class="btn btn-info btn-fill btn-wd">ยืนยัน</button>
                <button v-on:click="skip" class="btn btn-info btn-fill btn-wd">ข้าม</button>
            </div>
            <div class="clearfix"></div>
        </form>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import {evtBus} from 'main'
  export default {
    data () {
      return {
        user: {
          citizenIdF: '',
          citizenIdB: ''
        }
      }
    },
    methods: {
      submit () {
        if (this.user.citizenIdF === '' ||
        this.user.citizenIdF === undefined ||
        this.user.citizenIdB === '' ||
        this.user.citizenIdB === undefined) {
          return alert('กุรณากรอกข้อมูลให้ครบ')
        }

        var url = window.api_host + 'kyc'
        console.log(this.user)
        axios.post(
          url,
          this.user,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.data.success) {
            console.log(response.data)
            if (!response.data.death.valid) {
              alert(response.data.death.stDesc)
            } else {
              alert('ยืนยันตัวตนสำเร็จ')
              window.location.href = '#/admin/profile'
            }
          } else {
            alert(response.data.error_msg)
          }
        })
      },
      skip () {
        window.location.href = '#/admin/profile'
      },
      setUser (data) {
        this.user = data
      }
    },
    beforeMount: function () {
      this.setUser(evtBus.getUser())
    }
  }
</script>
<style>

</style>
