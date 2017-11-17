<template>
  <div v-if="state==1" class="card">
    <div class="header">
      <h4 class="title">ข้อมูลบุคคล</h4>
    </div>
    <div class="content">
      <form>
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
            <label>อายุ</label>
            <input type="number" class="form-control border-input"
                      v-model="user.age">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-4">
            <label>อาชีพ</label>
              <select v-model="user.job" class="form-control border-input">
                <option>พนักงานประจำ</option>
                <option>ธุรกิจส่วนตัว</option>
                <option>เกษียณ</option>
                <option>ข้าราชการ</option>
              </select>
          </div>
        </div>
        <br>
        <div class="text-left">
            <button v-on:click="next" class="btn btn-info btn-fill btn-wd">ดำเนินการต่อ</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>

  <div v-else-if="state==2" class="card">
    <div class="header">
      <h4 class="title">ข้อมูลรายได้</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-4">
            <label>รายได้</label>
            <input type="number" class="form-control border-input"
                      v-model="user.income">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-4">
            <label>รายได้เสริม</label>
            <input type="number" class="form-control border-input"
                      v-model="user.otherIncome">
            </input>
          </div>
        </div>
        <br>
        <div class="text-left">
            <button v-on:click="back" class="btn btn-info btn-fill btn-wd">ย้อนกลับ</button>
            <button v-on:click="next" class="btn btn-info btn-fill btn-wd">ดำเนินการต่อ</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>

  <div v-else-if="state==3" class="card">
    <div class="header">
      <h4 class="title">ภาระสินเชื่อ</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-5">
            <label>คุณมีบัตรเครดิตกี่ใบ</label>
            <input type="number" class="form-control border-input"
                      v-model="user.creditDebt">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-5">
            <label>(ยอดการจ่ายขั้นต่ำ ต่อ เดือน รวมทุกรายการ)</label>
            <input type="number" class="form-control border-input"
                      v-model="user.sumDebt">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-5">
            <label>ที่อยู่ อาศัย (ยอดการจ่าย ต่อ เดือน)</label>
            <input type="number" class="form-control border-input"
                      v-model="user.homeDebt">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-5">
            <label>รถยนต์, จักรยานยนต์ (ยอดการจ่าย ต่อ เดือน)</label>
            <input type="number" class="form-control border-input"
                      v-model="user.carDebt">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-5">
            <label>สินเชื่อส่วนบุคคล (ยอดการจ่าย ต่อ เดือน)</label>
            <input type="number" class="form-control border-input"
                      v-model="user.personDebt">
            </input>
          </div>
        </div>
        <br>
        <div class="text-left">
            <button v-on:click="back" class="btn btn-info btn-fill btn-wd">ย้อนกลับ</button>
            <button v-on:click="next" class="btn btn-info btn-fill btn-wd">ประมวลผล</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
  
</template>
<script>
  import {evtBus} from 'main'
  export default {
    data () {
      return {
        state: 1,
        allState: 3,
        user: {
          firstname: '',
          lastname: '',
          email: '',
          dob: '',
          age: '',
          job: '',
          income: '',
          otherIncome: '',
          creditDebt: '',
          sumDebt: '',
          homeDebt: '',
          carDebt: '',
          personDebt: ''
        }
      }
    },
    methods: {
      next () {
        if (this.state < this.allState) {
          this.state += 1
        } else {
          var url = window.api_host + 'update_profile'

          axios.post(
            url,
            this.user,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          ).then((response) => {
            if (response.data.success) {
              alert(response.data.error_msg)
              console.log(response.data.data)
              evtBus.setUser(JSON.stringify(response.data.data))
              window.location.href = '#/admin/overview'
            } else {
              alert(response.data.error_msg)
            }
          })
        }
      },
      back () {
        this.state -= 1
      },
      setUser (data) {
        this.user = data
      }
    },
    beforeMount: function () {
      if (localStorage.getItem('user_login') == null) {
        alert('Please Login')
        window.location.href = '#/admin/register'
      } else {
        this.setUser(evtBus.user)
      }
    }
  }
</script>
<style>

</style>
