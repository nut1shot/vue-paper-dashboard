<template>
	<div>
		<div class="card cam_btn" id='cam_btn' style='height:70px'>
            <center>
			<button @click='to(1)'>[1]</button> | 
            <button @click='to(2)'>[2]</button> |
            <button @click='to(3)'>[3]</button><BR/><BR/>
            <font v-if='step==1' color="white">STEP1 : ID CARD</font> 
            <font v-if='step==2' color="white">STEP2 : SELFIE</font> 
            <font v-if='step==3' color="white">STEP3 : FILL-IN FORM</font> 
            </center>
		</div>

        <!-- Form in step 3 -->
		<div class="cam" id='form' style='height:200px' v-if='step===3'>
		   <table border='1'>
               <tr>
                   <td>CARD NO</td>
                   <td><input v-model='card_no'></td>
			   </tr>
               <tr>
                   <td>Face Matched</td>
                   <td><input v-model='face_pct' size='6'></td>
			   </tr>
               <tr>
                   <td>FName</td>
                   <td><input type=''></td>
			   </tr>
               <tr>
                   <td>LName</td>
                   <td><input type=''></td>
			   </tr>
               <tr>
                   <td>Date Of Birth(31/12/2522)</td>
                   <td><input type=''></td>
			   </tr>
               <tr>
                   <td>LASER CODE</td>
                   <td><input type=''></td>
			   </tr>
               <tr>
                   <td align='center' colspan='2'><button>SUBMIT</button></td>
			   </tr>
           </table>	
      
           <div v-if="results!==''">RESULTS : </div>
        </div>

        <!-- end form -->

        <!-- step 1 and 2 -->
		<div class="cam" id='cam' style='height:200px' v-show='step<3'>
			<center>
            <select id="video_dev" onchange="chvdo(this[this.selectedIndex].value)"
               style="font-size:16pt">
				<option>choose camera</option>
            </select>
            <hr/>
            <video id="video" autoplay v-show='show_vdo'></video>
            <canvas id="canvas" v-show='!show_vdo'></canvas>
            <hr/>

			<div style='background-color:'>
			   <table border="0" width="100%">
				  <tr>
					<td width='33%'><button @click='savePicture' v-if='can_save_cam'>Use this photo</button></td>
					<td align='center' ><button v-if='show_vdo' @click='takePicture'>Take Picture</button></td>
					<td width='33%' align='right'><button @click='retake' v-if='can_cancel_cam'>Retake</button></td>
				 </tr> 
			   </table>
			</div>

            </center>
		</div>
        <!-- step 1 and 2 --> 

	
    </div>
</template>

<script>
  import axios from 'axios'
  import {evtBus} from 'main'
  export default {
    data () {
      return {
        id: '001',
        results: '',
        step: 1,
        show_vdo: true,
        can_save_cam: false,
        can_cancel_cam: false,
        card_no: '',
        face_pct: '%',
        faceId1: ''
      }
    },
    methods: {
      to: function (n) {
        this.step = n // alert(n)
        if (this.step < 3) {
          this.show_vdo = true
        } else {
          this.show_vdo = false
        }
        this.can_save_cam = this.can_cancel_cam = !this.show_vdo
      },
      retake: function (n) {
        this.show_vdo = true
        this.can_save_cam = this.can_cancel_cam = !this.show_vdo
      },
      savePicture: function (n) {
        var canvas = document.getElementById('canvas')
        var img = canvas.toDataURL('image/png')
        img = img.substring(img.indexOf(',') + 1)

        // alert(img)
        var that = this
        var data = {}
        var url = ''
        if (this.step === 1) {
          data = {img: img, id: this.id}
          url = window.api_host + 'demo_card'
          axios.post(
            url,
            data,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          ).then((response) => {
            if (response.data.success) {
              that.card_no = response.data.card_id
              alert(that.card_no)
              console.log(response.data.face)
              if (response.data.face.length > 0) {
                that.faceId1 = response.data.face[0].faceId
                alert(that.faceId1)
                that.savePicture2()
              } else {
                alert('Cannot detect face')
              }
            } else {
              alert('error')
            }
          })
        } else {
          data = {img: img, id: this.id, faceId1: this.faceId1}
          url = window.api_host + 'demo_selfie'
          axios.post(
            url,
            data,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          ).then((response) => {
            if (response.data.success) {
              that.face_pct = response.data.face.confidence * 100
              alert(that.face_pct)
              that.savePicture2()
            } else {
              alert('error')
            }
          })
        }
      },
      savePicture2: function () {
        var n = 0
        if (this.step === 3) {
          n = 1
        } else {
          n = this.step + 1
        }
        this.to(n)
      },
      takePicture: function () {
        var w = window.video.videoWidth
        var h = window.video.videoHeight
        w = parseInt(w / 1)
        h = parseInt(h / 1)
        context.drawImage(video, 0, 0, w, h)
        this.show_vdo = false
        this.can_save_cam = this.can_cancel_cam = !this.show_vdo
      }
    },
    beforeMount: function () {
    },
    created: function () {
      initCameraDropdown()
    }
  }

window.chvdo = function (deviceId) {
    if (window.stream) {
      window.stream.getTracks().forEach(function (track) {
        track.stop()
      })
    }

    video.pause()
    window.vdo_dev = deviceId
    var mediaConfig = {video: {deviceId: window.vdo_dev ? {exact: window.vdo_dev} : undefined}}

    navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
      video.src = window.URL.createObjectURL(stream)
      window.stream = stream
      video.play()
      initVideo()
    })
}
function initCameraDropdown () {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      alert('Only Android device is supported on this demo!!!\n\nDetails : \nenumerateDevices() not supported.')
      return false
    }

    var h = ''
    // List cameras and microphones.
    navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
      var ct = 0
      devices.forEach(function (device) {
        // alert(device.kind + ': ' + device.label + ' id = ' + device.deviceId)
        if (device.kind.indexOf('video') !== -1) {
          console.log('found video ID : ' + device.deviceId)
          window.vdo_dev = device.deviceId
          // h += '<option selected value="' + device.deviceId + '">' + device.label + '</option>'
          h += '<option selected value="' + device.deviceId + '">Camera' + (++ct) + '</option>'
        }
      })

      var vdoDev = document.getElementById('video_dev')
      vdoDev.innerHTML = h
      // alert(vdoDev + '\n' + h)
      initVideo()
      // window.chvdo(vdoDev[vdoDev.selectedIndex].value)
    })
}

function initVideo () {
    var canvas = document.getElementById('canvas')
    if (!window.stream) {
      // Grab elements, create settings, etc.
      window.context = canvas.getContext('2d')
      window.video = document.getElementById('video')
      // alert('exit initVdo')
      var vdoDev = document.getElementById('video_dev')
      window.chvdo(vdoDev[vdoDev.selectedIndex].value)
    } else {
      // alert('screen w/h' + screen.width + ' x +' + screen.height)
      var w = 5 // vdoW()
      var h = 5 // vdoH()

      video.width = w
      video.height = h

      canvas.width = h
      canvas.height = w

      setTimeout(function () {
        var w = video.videoWidth
        var h = video.videoHeight

        w = parseInt(w / 1)
        h = parseInt(h / 1)

        // alert('video w/h' + w + ' x ' + h)
        canvas.width = video.width = w
        canvas.height = video.height = h
      }, 5000)
    }
}

function vdoH () {
    // var h = parseInt(screen.height / 1)
    return 300
}

function vdoW () {
    var ret = parseInt((4 * vdoH()) / 3)
    return ret
}

function myfunc () {
}
</script>
<style>
#cam_btn {
  background-color:grey;
}
#cam {
  /* background-color:pink; */
}
body {
 color:blue;
}
</style>
