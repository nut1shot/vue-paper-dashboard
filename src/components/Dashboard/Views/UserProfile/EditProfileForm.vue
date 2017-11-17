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
            <input type="text" class="form-control border-input"
                      v-model="user.age">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>อาชีพ</label>
            <input type="text" class="form-control border-input"
                      v-model="user.job">
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
      <h4 class="title">ข้อมูลรายได้</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-4">
            <label>รายได้</label>
            <input type="text" class="form-control border-input"
                      v-model="user.income">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>รายได้เสริม</label>
            <input type="text" class="form-control border-input"
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
          <div class="col-md-4">
            <label>หนี้บัตรเครดิต</label>
            <input type="text" class="form-control border-input"
                      v-model="user.creditDebt">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>หนี้บ้าน</label>
            <input type="text" class="form-control border-input"
                      v-model="user.homeDebt">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>หนี้รถ</label>
            <input type="text" class="form-control border-input"
                      v-model="user.carDebt">
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <label>หนี้ส่วนบุคคล</label>
            <input type="text" class="form-control border-input"
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
        user: {
          age: '',
          job: '',
          income: '',
          otherIncome: '',
          creditDebt: '',
          homeDebt: '',
          carDebt: '',
          personDebt: ''
        }
      }
    },
    methods: {
      next () {
        if (this.state < 3) {
          this.state += 1
        } else {
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
