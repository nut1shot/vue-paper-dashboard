<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Sign Up</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-4">
            <label>First Name</label>
            <input type="text" class="form-control border-input"
                      placeholder="First Name"
                      v-model="user.firstname">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>Last Name</label>
            <input type="text" class="form-control border-input"
                      placeholder="Last Name"
                      v-model="user.lastname">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>Date of Birth</label>
            <input type="date" class="form-control border-input"
                      v-model="user.dob">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>Email</label>
            <input type="text" class="form-control border-input"
                      placeholder="Email"
                      v-model="user.email">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>Password</label>
            <input type="text" class="form-control border-input"
                      label="Password"
                      placeholder="Password"
                      v-model="user.password">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>Confirm Password</label>
            <input type="text" class="form-control border-input"
                      placeholder="Password"
                      v-model="user.cPassword">
            </input>
          </div>
        </div>

        <br>
        <div class="text-left">
            <button v-on:click="save" class="btn btn-info btn-fill btn-wd">Sign Up</button>
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
