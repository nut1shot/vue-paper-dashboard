<template>
    <div v-if="state==1" class="card">
        <div class="header">
        <h4 class="title">ข้อมูลบุคคล</h4>
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
                        v-model="user.dob" max="1999-12-31">
                </input>
            </div>
            </div>
            <div class="spacer" style="height:9px;"></div> 
            <div class="row">
            <div class="col-md-4">
                <label>เบอร์มือถือ</label>
                <input type="number" class="form-control border-input"
                        v-model="user.tel">
                </input>
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
        <h4 class="title">ข้อมูลการทำงาน</h4>
        </div>
        <div class="content">
        <form v-on:submit.prevent="onSubmit">
            <div class="row">
                <div class="col-md-4">
                    <label>อาชีพ</label>
                    <select v-model="user.job" class="form-control border-input">
                        <option>พนักงานบริษัท</option>
                        <option>ข้าราชการ</option>
                        <option>รัฐวิสาหกิจ</option>
                        <option>ธุรกิจส่วนตัว</option>
                    </select>
                </div>
            </div>
            <div class="spacer" style="height:9px;"></div> 
            <div class="row">
                <div class="col-md-4">
                    <label>ที่ปัจจุบันทำงานเกิน 4 เดือนหรือไม่</label>
                    <select v-model="user.workMonth" class="form-control border-input">
                        <option>เกิน</option>
                        <option>ไม่เกิน</option>
                    </select>
                </div>
            </div>
            <div class="spacer" style="height:9px;"></div> 
            <div class="row">
                <div class="col-md-4">
                    <label>จังหวัดที่ทำงาน</label>
                    <select v-model="user.workProvince" class="form-control border-input">
                        <option>กรุงเทพ</option>
                        <option>ต่างจังหวัด</option>
                    </select>
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
        <h4 class="title">ข้อมูลรายได้</h4>
        </div>
        <div class="spacer" style="height:9px;"></div>  
        <div class="content">
        <form v-on:submit.prevent="onSubmit">
            <div class="row">
                <div class="col-md-4">
                    <label>ฐานเงินเดือน</label>
                    <input type="number" class="form-control border-input"
                            v-model="user.basicSalary">
                    </input>
                </div>
            </div>
            <div class="spacer" style="height:9px;"></div> 
            <div class="row">
                <div class="col-md-4">
                    <label>1. ค่าตำแหน่ง, ค่าครองชีพ, ค่าวิชาชีพ</label>
                    <input type="number" class="form-control border-input"
                            v-model="user.comIncome">
                    </input>
                </div>
            </div> 
            <div class="spacer" style="height:9px;"></div> 
            <div class="row">
                <div class="col-md-4">
                    <label>2. รายได้อื่นๆ ที่ได้เท่ากันทุกเดือน</label>
                    <input type="number" class="form-control border-input"
                            v-model="user.otherIncomeE">
                    </input>
                </div>
            </div>
            <div class="spacer" style="height:9px;"></div> 
            <div class="row">
                <div class="col-md-4">
                    <label>3. ค่าคอททิชชั่น, เซอร์วิสชาร์ท, ค่าโอที</label>
                    <input type="number" class="form-control border-input"
                            v-model="user.otIncome">
                    </input>
                </div>
            </div>
            <div class="spacer" style="height:9px;"></div> 
            <div class="row">
                <div class="col-md-4">
                    <label>4. รายได้อื่นๆ ที่ไม่เท่ากันทุกเดือน</label>
                    <input type="number" class="form-control border-input"
                            v-model="user.otherIncomeN">
                    </input>
                </div>
            </div>     
            <div class="spacer" style="height:40px;"></div>   
            <div class="row">
                <div class="col-md-4">
                    <label>วิธีรับรายได้</label>
                    <select v-model="user.getSalaryBy" class="form-control border-input">
                        <option>โอนเข้าบัญชี</option>
                        <option>รับเป็นเงินสด/เช็ค</option>
                    </select>
                </div>
            </div>
            <div class="spacer" style="height:20px;"></div>   
            <div class="row">
                <div class="col-md-4">
                    <label>ปัจจบันท่านมีบัตรเครดิตอยู่แล้วหรือไม่</label>
                    <select v-model="user.creditCardType" class="form-control border-input">
                        <option>VISA</option>
                        <option>Master card</option>
                        <option>AMEX</option>
                        <option>ยังไม่มี</option>
                    </select>
                </div>
            </div>
            <div class="spacer" style="height:40px;"></div>   
            <div class="row">
                <div class="col-md-4">
                    <button v-show="$store.state.bank.scb" class="btn btn-secondary btn-block loading">
                        <i class="fa fa-circle-o-notch fa-spin"></i>
                        CONNECTING SCB
                    </button>
                    <button v-show="!$store.state.bank.scb" v-on:click="goScb" class="btn btn-info btn-block">CONNECT SCB</button>
                </div>
            </div>
            <div class="spacer" style="height:9px;"></div>                                     
            <div class="row">
                <div class="col-md-4">
                    <button v-show="$store.state.bank.kbank" class="btn btn-secondary btn-block loading">
                        <i class="fa fa-circle-o-notch fa-spin"></i>
                        CONNECTING KBANK
                    </button>
                    <button v-show="!$store.state.bank.kbank" v-on:click="goKBank" class="btn btn-info btn-block">CONNECT KBANK</button>
                </div>
            </div>
            <div class="spacer" style="height:9px;"></div>  
            <div class="row">
                <div class="col-md-4">
                    <button v-show="!$store.state.bank.kbank || !$store.state.bank.scb" v-on:click="goBankDetail" class="btn btn-info btn-block">ดูรายละเอียด</button>
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

    <div v-else-if="state=='scb'" class="card">
        <div class="header">
        <h4 class="title">Connect SCB</h4>
        </div>
        <div class="content">
        <form v-on:submit.prevent="onSubmit">
            <div class="row">
            <div class="col-md-4">
                <label>Username</label>
                <input type="text" class="form-control border-input"
                        v-model="user.scbUsername">
                </input>
            </div>
            </div>

            <div class="row">
            <div class="col-md-4">
                <label>Password</label>
                <input type="password" class="form-control border-input"
                        v-model="user.scbPassword">
                </input>
            </div>
            </div>
            <br>
            <div class="text-left">
                <button v-on:click="connectSCB" class="btn btn-info btn-fill btn-wd">Connect</button>
                <button v-on:click="close" class="btn btn-info btn-fill btn-wd">Cancel</button>
            </div>
            <div class="clearfix"></div>
        </form>
        </div>
    </div>

    <div v-else-if="state=='kbank'" class="card">
        <div class="header">
        <h4 class="title">Connect KBANK</h4>
        </div>
        <div class="content">
        <form v-on:submit.prevent="onSubmit">
            <div class="row">
            <div class="col-md-4">
                <label>Username</label>
                <input type="text" class="form-control border-input"
                        v-model="user.kbankUsername">
                </input>
            </div>
            </div>

            <div class="row">
            <div class="col-md-4">
                <label>Password</label>
                <input type="password" class="form-control border-input"
                        v-model="user.kbankPassword">
                </input>
            </div>
            </div>
            <br>
            <div class="text-left">
                <button v-on:click="connectKBANK" class="btn btn-info btn-fill btn-wd">Connect</button>
                <button v-on:click="close" class="btn btn-info btn-fill btn-wd">Cancel</button>
            </div>
            <div class="clearfix"></div>
        </form>
        </div>
    </div>

    <div v-else-if="state=='statement'" class="card">
        <div class="header">
        <h4 class="title">Statement</h4>
        </div>
        <div class="content">
        <form v-on:submit.prevent="onSubmit">
            <div class="row" v-show="scb.flg">
                <div class="col-md-12">
                    <label>Siam Commercial Bank:</label>
                    <table class="table table-full-width table-responsive" style="width:100%">
                    <thead>
                        <th class="text-center">Monthly</th>
                        <th class="text-center">Total Income</th> 
                        <th class="text-center">Total Expense</th>
                    </thead>
                    <tfoot>
                        <tr class="text-center">
                            <td><strong>Total</strong></td>
                            <td><strong>{{scb.totalIn.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}}</strong></td>
                            <td><strong>{{scb.totalOut.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}}</strong></td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr class="text-center" v-for="item in scb.data">
                            <td>{{item.monthly}}</td>
                            <td>{{item.deposit}}</td> 
                            <td>{{item.withdraw}}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            <div class="spacer" style="height:15px;"></div>
            <div class="row" v-show="kbank.flg">
                <div class="col-md-12">
                    <label>Kasikornbank:</label>
                    <table class="table table-full-width table-responsive" style="width:100%">
                    <thead>
                        <th class="text-center">Monthly</th>
                        <th class="text-center">Total Income</th> 
                        <th class="text-center">Total Expense</th>
                    </thead>
                    <tfoot>
                        <tr class="text-center">
                            <td><strong>Total</strong></td>
                            <td><strong>{{kbank.totalIn.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}}</strong></td>
                            <td><strong>{{kbank.totalOut.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}}</strong></td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr class="text-center" v-for="item in kbank.data">
                            <td>{{item.monthly}}</td>
                            <td>{{item.deposit}}</td> 
                            <td>{{item.withdraw}}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            <div class="text-center" v-show="!kbank.flg && !scb.flg">
                <label>ไม่มีรายการ</label>
            </div>
            <br>
            <div class="text-left">
                <button v-on:click="backBankDetail" class="btn btn-info btn-fill btn-wd btn-block">ย้อนกลับ</button>
            </div>
            <div class="clearfix"></div>
        </form>
        </div>
    </div>







  <!-- creditme form
  <div v-if="state==1" class="card">
    <div class="header">
      <h4 class="title">ข้อมูลบุคคล</h4>
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
      <form v-on:submit.prevent="onSubmit">
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
      <form v-on:submit.prevent="onSubmit">
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
  -->
  
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
          tel: '',
          job: '',
          workMonth: '',
          workProvince: '',
          basicSalary: '',
          comIncome: '',
          otIncome: '',
          otherIncomeE: '',
          otherIncomeN: '',
          creditCardType: '',
          getSalaryBy: ''
        },
        scb: {
          flg: false,
          data: [],
          totalIn: 0,
          totalOut: 0
        },
        kbank: {
          flg: false,
          data: [],
          totalIn: 0,
          totalOut: 0
        }
      }
    },
    methods: {
      next () {
        if (this.state < this.allState) {
          if (this.user.firstname === '' || this.user.lastname === '' || this.user.dob === '') {
            return alert('กรุณากรอกข้อมูลให้ครบ')
          } else {
            this.state += 1
          }
        } else {
          this.user.age = this.getAge(this.user.dob)
          var url = window.api_host + 'update_profile'
          console.log(this.user)
          axios.post(
            url,
            this.user,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          ).then((response) => {
            if (response.data.success) {
              console.log(response.data.data)
              evtBus.setUser(response.data.data)
              localStorage.setItem('user', JSON.stringify(response.data.data))
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
      },
      close () {
        this.state = 3
      },
      goScb () {
        this.state = 'scb'
      },
      goKBank () {
        this.state = 'kbank'
      },
      init_websocket (key) {
        console.log('init_websocket is called')
        var that = this
        var ws = new WebSocket('ws://creden.co:8089/creden', 'creden')
        // ws = new WebSocket("wss://creden.co:4443/");
        ws.onopen = function () {
          ws.send(key)
        }
        ws.onmessage = function (evt) {
          var receivedMsg = evt.data
          console.log(receivedMsg)
          var data = JSON.parse(receivedMsg)
          console.log(data)
          that.statement(data)
        }
        ws.onclose = function () {
          alert('connection is close')
        }
      },
      connectKBANK () {
        var key = 'tmp' + Math.random().toString(36).substr(2, 5)
        this.init_websocket(key.toString())
        var url = window.api_host + 'bank'
        var data = {'bank': 'kbank', 'username': this.user.kbankUsername, 'password': this.user.kbankPassword, 'key': key}
        axios.post(
          url,
          data,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.data.success) {
            console.log(response.data.data)
            console.log(response.data.key)
            this.state = 3
            this.$store.state.bank.kbank = true
          } else {
            alert(response.data.error_msg)
          }
        })
      },
      connectSCB () {
        // var key = 'tmp' + Math.random().toString(36).substr(2, 5)
        var key = this.user.email + ':scb'
        this.init_websocket(key.toString())
        var url = window.api_host + 'bank'
        var data = {'bank': 'scb', 'username': this.user.scbUsername, 'password': this.user.scbPassword, 'key': key}
        axios.post(
          url,
          data,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.data.success) {
            console.log(response.data.data)
            console.log(response.data.key)
            this.state = 3
            this.$store.state.bank.scb = true
          } else {
            alert(response.data.error_msg)
          }
        })
      },
      getAge (date) {
        var now = new Date()
        var age = now.getFullYear() - new Date(date).getFullYear()
        return age
      },
      toNum (value) {
        if (!value.trim().length) {
          value = 0.00
          return value
        } else {
          value = Number(value.replace(/[^\d.]/g, ''))
          return value
        }
      },
      statement (data) {
        if (data.job_type === 'kbank') {
          this.$store.state.bank.kbank = false
        } else if (data.job_type === 'scb') {
          this.$store.state.bank.scb = false
        }
        if (data.success) {
          this.summary(data.data, data.job_type)
        } else {
          alert(data.error_msg)
        }
      },
      summary (data, jobType) {
        var that = this
        if (jobType === 'kbank') {
          this.kbank.data = []
        } else if (jobType === 'scb') {
          this.scb.data = []
        }
        data.map(function (current, index, array) {
          current.m = current.date.substring(3, 5)
          current.y = current.date.substring(6, 10)
        })
        var monthly = {'12': '', '01': '', '02': '', '03': '', '04': '', '05': '', '06': '', '07': '', '08': '', '09': '', '10': '', '11': ''}
        var withdraw = {'12': 0.00, '01': 0.00, '02': 0.00, '03': 0.00, '04': 0.00, '05': 0.00, '06': 0.00, '07': 0.00, '08': 0.00, '09': 0.00, '10': 0.00, '11': 0.00}
        var deposit = {'12': 0.00, '01': 0.00, '02': 0.00, '03': 0.00, '04': 0.00, '05': 0.00, '06': 0.00, '07': 0.00, '08': 0.00, '09': 0.00, '10': 0.00, '11': 0.00}
        data.forEach(function (obj) {
          withdraw[obj.m] = withdraw[obj.m] + that.toNum(obj.withdraw)
          deposit[obj.m] = deposit[obj.m] + that.toNum(obj.deposit)
          monthly[obj.m] = obj.m + '/' + obj.y
        })
        for (var p in monthly) {
          if (monthly[p] !== '') {
            if (jobType === 'kbank') {
              this.kbank.totalIn += deposit[p]
              this.kbank.totalOut += withdraw[p]
              this.kbank.data.push({monthly: monthly[p], withdraw: withdraw[p].toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'), deposit: deposit[p].toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')})
              this.kbank.flg = true
            } else if (jobType === 'scb') {
              this.scb.totalIn += deposit[p]
              this.scb.totalOut += withdraw[p]
              this.scb.data.push({monthly: monthly[p], withdraw: withdraw[p].toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'), deposit: deposit[p].toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')})
              this.scb.flg = true
            }
          }
        }
      },
      goBankDetail () {
        this.state = 'statement'
      },
      backBankDetail () {
        this.state = 3
      },
      searchJob () {
        var url = window.api_host + 'jobs'
        var data = {'key': this.user.email + ':scb'}
        axios.post(
          url,
          data,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.success) {
            alert('Statement SCB Complete')
          }
        })
      }
    },
    mounted: function () {
      this.setUser(evtBus.getUser())
      this.$sidebar.displaySidebar(false)
      this.searchJob()
    }
  }
</script>
<style>
</style>
