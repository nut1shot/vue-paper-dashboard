<template>
  <div v-if="state==2" class="card">
    <div class="header">
      <h4 class="title">Sign Up</h4>
    </div>
    <div class="content">
      <form v-on:submit.prevent="onSubmit">
        <div class="row">
          <div class="col-md-4">
            <label>ชื่อ</label>
            <input type="text" class="form-control border-input"
                      v-model="user.firstname">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-4">
            <label>นามสกุล</label>
            <input type="text" class="form-control border-input"
                      v-model="user.lastname">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-4">
            <label>วัน/เดือน/ปี เกิด</label>
            <input type="date" class="form-control border-input"
                      v-model="user.dob">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-4">
            <label>Email</label>
            <input type="text" class="form-control border-input"
                      v-model="user.email">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-4">
            <label>Password</label>
            <input type="password" class="form-control border-input"
                      label="Password"
                      v-model="user.password">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-4">
            <label>Confirm Password</label>
            <input type="password" class="form-control border-input"
                      v-model="user.cPassword">
            </input>
          </div>
        </div>
        <br>
        <div class="text-left">
            <button v-on:click="save" class="btn btn-info btn-fill btn-wd">Sign up</button>
            <button v-on:click="goToLogin" class="btn btn-info btn-fill btn-wd">Log in</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>

  <div v-else-if="state==3" class="card">
    <div class="header">
      <h4 class="title">Activate Code</h4>
    </div>
    <div class="content">
      <form v-on:submit.prevent="onSubmit">
        <div class="row">
          <div class="col-md-4">
            <label>Activate Code</label>
            <input type="text" class="form-control border-input"
                      placeholder="Code"
                      v-model="user.code">
            </input>
          </div>
        </div>
        <br>
        <div class="text-left">
            <button v-on:click="activate" class="btn btn-info btn-fill btn-wd">Submit</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>

  <div v-else-if="state==1" class="card">
    <div class="header">
      <h4 class="title">Log in</h4>
    </div>
    <div class="content">
      <form v-on:submit.prevent="onSubmit">
        <div class="row">
          <div class="col-md-4">
            <label>Email</label>
            <input type="text" class="form-control border-input"
                      v-model="user.email">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>Password</label>
            <input type="password" class="form-control border-input"
                      v-model="user.password">
            </input>
          </div>
        </div>
        <br>
        <div class="text-left">
            <button v-on:click="goToRegister" class="btn btn-info btn-fill btn-wd">Sign up</button>
            <button v-on:click="login" class="btn btn-info btn-fill btn-wd">Log in</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>

  <div v-else-if="state==4" class="card">
    <div class="content">
        <div class="text-center">
            <label>Loading...</label>
        </div>
    </div>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  import axios from 'axios'
  import {evtBus} from 'main'
  export default {
    data () {
      return {
        state: 1,
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
        console.log(this.user)
        this.state = 4
        axios.post(
          url,
          this.user,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.data.success) {
            alert(response.data.error_msg)
            console.log(response.data.data)
            this.user = response.data.data
            this.state = 3
          } else {
            alert(response.data.error_msg)
            this.state = 2
          }
        })
      },
      activate () {
        var url = window.api_host + 'activate'
        var that = this
        axios.post(
          url,
          this.user,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.data.success) {
            alert(response.data.error_msg)
            localStorage.setItem('user_login', that.user.email)
            localStorage.setItem('user', JSON.stringify(that.user))
            evtBus.setUser(that.user)
            window.location.href = '#/admin/kyc'
          } else {
            alert(response.data.error_msg)
          }
        })
      },
      goToRegister () {
        this.state = 2
      },
      goToLogin () {
        this.state = 1
      },
      login () {
        var url = window.api_host + 'login'
        console.log(this.user)
        axios.post(
          url,
          this.user,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.data.success) {
            // alert('no error' + response.data.error_msg)
            console.log(response.data.data)
            if (response.data.data.score === undefined) {
            }
            evtBus.setUser(response.data.data)
            localStorage.setItem('user', JSON.stringify(response.data.data))
            localStorage.setItem('user_login', response.data.data.email)
            if (evtBus.user.userTmp) {
              alert('Go')
              evtBus.user.userTmp = false
              window.location.href = '#/admin/overview'
            } else {
              window.location.href = '#/admin/overview'
            }
          } else {
            alert('error' + response.data.error_msg)
          }
        })
      },
      setUser (data) {
        this.user = data
      }
    },
    beforeMount: function () {
      this.setUser(evtBus.getUser())
      this.$sidebar.displaySidebar(false)
    }
  }

</script>
<style>

</style>
