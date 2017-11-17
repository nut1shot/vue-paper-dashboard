<template>
  <div v-if="state==1" class="card">
    <div class="header">
      <h4 class="title">ข้อมูลบุคคล</h4>
    </div>
    <div class="content">
      <form>
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
        <div class="text-right">
          <div class="col-md-4">
            <button v-on:click="next" class="btn btn-info btn-fill btn-wd">ดำเนินการต่อ</button>
          </div>
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
            <label>ที่อยู่ อาศัย (ยอดการจ่าย ต่อ เดือน รวมทุกรายการ)</label>
            <input type="number" class="form-control border-input"
                      v-model="user.homeDebt">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-5">
            <label>รถยนต์, จักรยานยนต์ (ยอดการจ่าย ต่อ เดือน รวมทุกรายการ)</label>
            <input type="number" class="form-control border-input"
                      v-model="user.carDebt">
            </input>
          </div>
        </div>
        <div class="spacer" style="height:9px;"></div> 
        <div class="row">
          <div class="col-md-5">
            <label>สินเชื่อส่วนบุคคล (ยอดการจ่าย ต่อ เดือน รวมทุกรายการ)</label>
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
  export default {
    data () {
      return {
        state: 1,
        allState: 3,
        user: {
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
          alert(JSON.stringify(this.user))
          window.location.href = '#/admin/overview'
        }
      },
      back () {
        this.state -= 1
      }
    }
  }
</script>
<style>

</style>
