<template>
	<div class="flexfullscreen">
        <!-- Loading div -->
        <div v-if='isLoading'>
          <div style='height:100px'></div><br/>
          <center>
            <button type="button" class="btn btn-wd btn-success"> 
              <span class="btn-label">    
                <i class="fa fa-circle-o-notch fa-spin"></i>  
              </span> Plase Wait ...
            </button>
          </center>
        </div>

        <div id='header'>
          <center>
            <div id="brand">000</div>


            <div id="skip_btn">
              <button @click='to(1)'>[1]</button> | 
              <button @click='to(2)'>[2]</button> |
              <button @click='to(3)'>[3]</button> |
              <button @click='to(4)'>[4]</button>
            </div>
            <font v-if='step==1' color="white">STEP1 : ID CARD</font> 
            <font v-if='step==2' color="white">STEP2 : SELFIE</font> 
            <font v-if='step==3' color="white">STEP3 : Record VDO</font> 
            <font v-if='step==4' color="white">STEP4 : FILL-IN FORM</font> 

            
          </center>
        </div>


        <div class="overlay" v-if="step<4">
          
          <!-- step 1,2 and 3 -->
          <div class="cam" v-if='isConfirming'>
            Did you read every word, clearly ? <br/>
            <button @click='confirmVdo(true)'>YES</button>
            <button @click='confirmVdo(false)'>NO</button>
          </div>

          <div class="cam" v-show='step<4 && !isLoading && !isConfirming'>

            <div>
              <div class="btn-group" role="group" v-show="step<3">
                <button type="button" class="btn btn-default">Camera 1</button>
                <button type="button" class="btn btn-default">Camera 2</button>
              </div>
            </div>
              
              <img class="idcardoverlay" src="static/img/idcard.svg" v-if='showCardOverlay'>
            
            <!-- reader -->
            <span class="overlay-top readtext" v-if="step===3">Read Texts Below clearly:<br/>
              <span>
                Read <i class="fa fa-chevron-right"></i>
                <span>{{randomText}}&nbsp;</span>
              </span>
            </span>
            <!-- end -->
            <div id='canvasOverlay'>
              <!-- <img src='static/img/sample_card.png' v-if='showCardOverlay'> -->
              <span v-if='showRecOverlay' style='color:red;font-size:150%'>Recording ...</span>
            </div>

            <div class="flexbottom">
              <table border="0" width="100%">
                <tr v-if="step<3">
                 <td width='33%'>
                  <button class="btn" @click='savePicture' v-if='can_save_cam'>Use this photo</button>
                </td>
                 <td align='center' >
                  <button class="btn shutter" v-if='show_vdo' @click='takePicture'>Take Picture</button>
                </td>
                 <td width='33%' align='right'>
                  <button class="btn" @click='retake' v-if='can_cancel_cam'>Retake</button>
                </td>
               </tr> 
               <tr v-if="step===3">
                 <td align='center'>
                  <button class="btn shutter" v-if='can_rec' @click='recordVdo'>REC</button>
                </td>
               </tr> 
             </table>
           </div>

          </div>
          <!-- step 1,2 and 3 --> 

        </div>

        <!-- Form in step 4 -->
        <div class="cam fullheight" id='form' v-if="step===4 && !isLoading">

         <table v-if="kyc===''" id="kyctable" class="table form-group">
          <tbody>
           <tr>
             <td>CARD NO</td>
             <td><input class="form-control" v-model='card_no'></td>
           </tr>
           <tr>
             <td>Face Matched</td>
             <td><input  class="form-control" v-model='face_pct' size='6'></td>
           </tr>
           <tr>
             <td>FName</td>
             <td><input  class="form-control" type='' v-model='firstname'></td>
           </tr>
           <tr>
             <td>LName</td>
             <td><input  class="form-control" type='' v-model='lastname'></td>
           </tr>
           <tr>
             <td>Date Of Birth(31/12/2522)</td>
             <td class="form-inline">
              <!-- <div class="form-group"> -->
              <input  class="form-control" v-model='day' size='4'>
              <select  class="form-control" v-model='mon'>
                <option value="">เดือน</option>    
                <option value="Jan">ม.ค.</option>
                <option value="Feb">ก.พ.</option>
                <option value="Mar">มี.ค.</option>
                <option value="Apr">เม.ษ.</option>
                <option value="May">พ.ค.</option>
                <option value="Jun">มิ.ย.</option>
                <option value="Jul">ก.ค.</option>
                <option value="Aug">ส.ค.</option>
                <option value="Sep">ก.ย.</option>
                <option value="Oct">ต.ค.</option>
                <option value="Nov">พ.ย.</option>
                <option value="Dec">ธ.ค.</option>
              </select>
              <input class="form-control" v-model='year' size='6'>
              <!-- </div> -->
            </td>
          </tr>
          <tr>
           <td>LASER CODE</td>
           <td><input class="form-control" type='' v-model='laser_code'></td>
         </tr>
         <tr>
           <td align='center' colspan='2'><button type="button" @click='submit' class="btn">SUBMIT</button></td>
         </tr>
        </tbody>
       </table>	

       <div v-if="kyc!=='' ">RESULTS : 
         <p>
           ชื่อ: {{firstname}}
         </p>
         <p>
           นามสกุล: {{lastname}}
         </p>
         <p>
           สถานะ: {{kyc.death.stDesc}}
         </p>
         <p v-if="kyc.tax.tax1.formDetailList.length > 0">
           tax1: {{kyc.tax.tax1.formDetailList[0].effDate}}
         </p>
         <p v-else>
           tax1: ไม่จ่ายภาษี
         </p>
         <p v-if="kyc.tax.tax2.formDetailList.length > 0">
           tax2: {{kyc.tax.tax2.formDetailList[0].effDate}}
         </p>
         <p v-else>
           tax2: ไม่จ่ายภาษี
         </p>
         <button type="button" class="btn btn-wd btn-success" @click='setKyc()'>BACK</button>
       </div>
     </div>

     <!-- end form -->

     <!-- step 1,2 and 3 -->
     <!-- <div class="cam fullheight" style='xheight:200px' v-if='isConfirming'>
      Did you read every word, clearly ? <br/>
      <button @click='confirmVdo(true)'>YES</button>
      <button @click='confirmVdo(false)'>NO</button>
    </div> -->

    <div class="cam cameracanvas" id='cam' v-show='step<4 && !isLoading && !isConfirming'>
        <!-- <select id="video_dev" v-show="step<3" onchange="chvdo2(this[this.selectedIndex].value)" style="font-size:16pt">
          <option>choose camera</option>
        </select> -->
        <!-- <div>
          <div class="btn-group" role="group" v-show="step<3">
            <button type="button" class="btn btn-default">Camera 1</button>
            <button type="button" class="btn btn-default">Camera 2</button>
          </div>
        </div> -->
        <!-- reader -->
        <!-- <span class="overlay-top" v-if="step===3">Read Texts Below clearly:<br/>
          <span>
           Read &gt;&gt;  <span style='background-color:red;color:white;font-size:150%'>{{randomText}}</span>
         </span>
       </span> -->
       <!-- end -->

       <!-- <hr/> -->
       <div id="videoDiv">
         <center>
          <video id="video" autoplay v-show='show_vdo'></video>
          <!-- <div id='canvasBg'>
            <div id='canvasOverlay'>
              <img src='static/img/sample_card.png' height='200' v-if='showCardOverlay'>
              <span v-if='showRecOverlay' style='color:red;font-size:150%'>Recording ...</span>
            </div>
          </div>  -->
          <canvas id="canvas" v-show='!show_vdo'></canvas>
          <canvas id="canvas2" v-show='false'></canvas>
        </center>
      </div>
      
      <!-- <hr/> -->

      <!-- <div>
        <table border="0" width="100%">
          <tr v-if="step<3">
           <td width='33%'><button @click='savePicture' v-if='can_save_cam'>Use this photo</button></td>
           <td align='center' ><button v-if='show_vdo' @click='takePicture'>Take Picture</button></td>
           <td width='33%' align='right'><button @click='retake' v-if='can_cancel_cam'>Retake</button></td>
         </tr> 
         <tr v-if="step===3">
           <td align='center'><button v-if='can_rec' @click='recordVdo'>REC</button></td>
         </tr> 
       </table>
     </div> -->

 </div>
 <!-- step 1,2 and 3 --> 

	
    </div>
</template>

<script>
  import axios from 'axios'
  import {evtBus} from 'main'
  export default {
    data () {
      return {
        isLoading: false,
        showCardOverlay: false,
        id: '001',
        results: '',
        step: 1,
        show_vdo: true,
        can_save_cam: false,
        can_cancel_cam: false,
        frontCam: null, // store front camera deviceId
        backCam: null, // back camera
        card_no: '',
        laser_code: '',
        firstname: '',
        lastname: '',
        face_pct: '%',
        faceId1: '',
        day: '',
        mon: '',
        year: '',
        randomText: '',
        arr_txt: ['1234', 'ABCK', 'GF13'],
        can_rec: false,
        showRecOverlay: false,
        recordRTC: null,
        isConfirming: false,
        kyc: ''
      }
    },
    methods: {
      to: function (n) {
        this.step = n
        if (this.step < 4) {
          this.show_vdo = true
          var activeCam = null
          if (this.step === 1 && this.backCam) {
            activeCam = this.backCam
          }
          if (this.step === 2 && this.frontCam) {
            activeCam = this.frontCam
          }
          if (this.step === 3) {
            if (this.frontCam) {
              activeCam = this.frontCam
            }
            this.can_rec = true
            this.randomText = ''
          }
          this.setActiveCam(activeCam)
        } else {
          this.show_vdo = false
        }
        this.can_save_cam = this.can_cancel_cam = !this.show_vdo
        if (this.step < 3) {
          this.showOverlay()
        }
      },
      recordVdo: function () {
        this.can_rec = false
        var options = {
          mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 128000,
          bitsPerSecond: 128000 // if this line is provided, skip above two
        }
        this.recordRTC = RecordRTC(window.stream, options)
        this.recordRTC.startRecording()

        this.randomText = this.arr_txt[0]
        setTimeout(() => { this.randomText = '' }, 1000)
        setTimeout(() => { this.randomText = this.arr_txt[1] }, 1300)
        setTimeout(() => { this.randomText = '' }, 2900)
        setTimeout(() => { this.randomText = this.arr_txt[2] }, 3200)
        setTimeout(() => { this.randomText = '' }, 5000)
        setTimeout(() => {
          this.recordRTC.stopRecording((audioVideoWebMURL) => {
            var blob = this.recordRTC.getBlob()
            // alert(blob.size + ' ' + blob.type)
            this.recordRTC.save('eark.webm')
            this.isConfirming = true
          })
        }, 5100)
      },
      confirmVdo: function (boo) {
        this.isConfirming = false
        this.can_rec = true
        if (boo) {
          window.video.pause()
          this.to(4)
        }
      },
      showOverlay: function () {
        this.showCardOverlay = this.showRecOverlay = false
        if (this.step === 1) {
          this.showCardOverlay = true
          setTimeout(() => { this.showCardOverlay = false }, 6000)
        }
        if (this.step === 3) {
          this.showRecOverlay = true
        }
      },
      setActiveCam: function (camId) {
        if (camId) {
          window.chvdo2(camId, this.step === 3)
          var vdoDev = document.getElementById('video_dev')
          // sync up dropdown
          for (var i = 0; i < vdoDev.length; i++) {
            var e = vdoDev[i]
            if (e.value === camId) {
              vdoDev.selectedIndex = i
            }
          }
        }
      },
      retake: function (n) {
        this.show_vdo = true
        this.can_save_cam = this.can_cancel_cam = !this.show_vdo
        this.showOverlay()
      },
      savePicture: function (n) {
        var canvas = document.getElementById('canvas2')
        var img = canvas.toDataURL('image/png')
        img = img.substring(img.indexOf(',') + 1)

        // alert('img\n' + img)
        var data = {img: img, id: this.id}
        var that = this
        var url = window.api_host
        if (this.step === 1) {
          url = url + 'demo_card'
        } else if (this.step === 2) {
          url = url + 'demo_selfie'
          data.faceId1 = this.faceId1
        }
        that.isLoading = true
        axios.post(
          url,
          data,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          that.isLoading = false
          if (response.data.success) {
            if (this.step === 1) {
              if (response.data.card_id && response.data.card_id.length === 13 && response.data.dob) {
                that.card_no = response.data.card_id
                that.day = response.data.dob.day
                that.mon = response.data.dob.mon
                that.year = Number(response.data.dob.year) + 543
              } else {
                alert('unnable to detect id card information, please retake photo.')
                that.retake()
              }
              if (response.data.face.length > 0) {
                that.faceId1 = response.data.face[0].faceId
                that.savePicture2()
              } else {
                alert('unnable to detect face, please retake photo.')
                that.retake()
              }
            } else if (this.step === 2) {
              that.face_pct = response.data.face.confidence * 100
              that.savePicture2()
            }
          } else {
            alert('error')
          }
        })
      },
      savePicture2: function () {
        var n = 0
        if (this.step === 4) {
          n = 1
        } else {
          n = this.step + 1
        }
        this.to(n)
      },
      takePicture: function () {
        var w = window.video.videoWidth
        var h = window.video.videoHeight
        // hidden webcam
        var ctx2 = document.getElementById('canvas2').getContext('2d')
        ctx2.drawImage(video, 0, 0, w, h)
        w = parseInt(w / 5.0)
        h = parseInt(h / 5.0)
        context.drawImage(video, 0, 0, w, h)
        this.show_vdo = false
        this.can_save_cam = this.can_cancel_cam = !this.show_vdo
      },
      setKyc: function () {
        this.kyc = ''
      },
      submit: function () {
        var objMon = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}
        var dob = (Number(this.year) - 543) + '-' + objMon[this.mon] + '-' + this.day
        var data = {firstname: this.firstname, lastname: this.lastname, dob: dob, citizenIdF: this.card_no, citizenIdB: this.laser_code}
        var url = window.api_host + 'kyc'
        console.log(this.user)
        this.kyc = ''
        var that = this
        axios.post(
          url,
          data,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          if (response.data.success) {
            console.log(response.data)
            if (!response.data.death.valid) {
              alert(response.data.death.stDesc)
            } else {
              alert('success')
              that.kyc = response.data
              console.log(that.kyc.tax)
            }
          } else {
            alert(response.data.error_msg)
          }
        })
      }
    },
    beforeMount: function () {
    },
    mounted: function () {
      var that = this
      document.getElementById('video').addEventListener('play', function () {
        var w = video.videoWidth
        var h = video.videoHeight

        /* handle w,h = 0 when play event is fired AFTER the 1ST time
        todo : find out why */
        // alert('video w/h' + w + ' x ' + h)
        if (w < 1) return

        // hidden canvas
        var c2 = document.getElementById('canvas2')
        c2.width = w
        c2.height = h

        // canvas overlay
        var ov = document.getElementById('canvasOverlay')

        w = parseInt(w / 5.0)
        h = parseInt(h / 5.0)

        canvas.width = video.width = w
        canvas.height = video.height = h
        ov.style.width = (w - 0) + 'px'
        ov.style.height = (h - 0) + 'px'
        that.showOverlay()
      })
      initCameraDropdown(this)
    }
  }

window.chvdo2 = function (deviceId, audio) {
    if (window.stream) {
      window.stream.getTracks().forEach(function (track) {
        track.stop()
      })
    }

    video.pause()
    window.vdo_dev = deviceId
    var hdConstraints = {
      video: {
        mandatory: {
          // minWidth: 1280,
          // minHeight: 720
          minWidth: 1920,
          minHeight: 1080,
          sourceId: deviceId
        }
      },
      audio: audio
    }
    // var mediaConfig = {video: {deviceId: window.vdo_dev ? {exact: window.vdo_dev} : undefined}}
    var mediaConfig = hdConstraints

    navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
      video.src = window.URL.createObjectURL(stream)
      window.stream = stream
      video.play()
    })
}
function initCameraDropdown (app) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      alert('Only Android device is supported on this demo!!!\n\nDetails : \nenumerateDevices() not supported.')
      return false
    }

    var h = ''
    // List cameras and microphones.
    navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      var ct = 0
      devices.forEach((device) => {
        // alert(device.kind + ': ' + device.label + ' id = ' + device.deviceId)
        if (device.kind.indexOf('video') !== -1) {
          console.log('found video ID : ' + device.deviceId)
          window.vdo_dev = device.deviceId
          // h += '<option selected value="' + device.deviceId + '">' + device.label + '</option>'
          // alert(JSON.stringify(device))
          var name = 'Camera' + (++ct)
          if (device.facingMode === 'environment' || device.label.indexOf('back') !== -1) {
            name += ' Back'
            app.backCam = device.deviceId
          }
          if (device.facingMode === 'user' || device.label.indexOf('front') !== -1) {
            name += ' Front'
            app.frontCam = device.deviceId
          }
          h += '<option selected value="' + device.deviceId + '">' + name + '</option>'
        }
      })

      var vdoDev = document.getElementById('video_dev')
      vdoDev.innerHTML = h
      initVideo()
    })
}

function initVideo () {
    var canvas = document.getElementById('canvas')
    if (!window.stream) {
      // Grab elements, create settings, etc.
      window.context = canvas.getContext('2d')
      window.video = document.getElementById('video')
      var vdoDev = document.getElementById('video_dev')
      window.chvdo2(vdoDev[vdoDev.selectedIndex].value)
    } else {
      canvas.width = video.width = 1
      canvas.height = video.height = 1
    }
}

function vdoH () {
    // var h = parseInt(screen.height / 1)
    var initialH = 1
    return initialH
}

function vdoW () {
    var ret = parseInt((4 * vdoH()) / 3)
    return ret
}
</script>
<style>

html, body, body>div{
  height: 100%;
/*  padding: 0;
  margin: 0;*/
}

#videoDiv {
/*position: relative;*/
}

#canvasOverlay {
/* background: green; */
}

/*#canvasBg {
position: absolute;
top: 0;
left: 0;
height: 100%;
width: 100%;
opacity: 0.5;
}*/

</style>
