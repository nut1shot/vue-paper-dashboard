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


        <!-- Form in step 3 -->
		<div class="cam" id='form' style='height:200px' v-if='step===3 && !isLoading'>
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
		<div class="cam" id='cam' style='height:200px' v-show='step<3 && !isLoading'>
			<center>
            <select id="video_dev" onchange="chvdo1(this[this.selectedIndex].value)"
               style="font-size:16pt">
				<option>choose camera</option>
            </select>
            <hr/>
            <video id="video" autoplay v-show='show_vdo'></video>
            <canvas id="canvas" v-show='!show_vdo'></canvas>
            <canvas id="canvas2" v-show='false'></canvas>
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
        isLoading: false,
        id: '001',
        results: '',
        step: 1,
        show_vdo: true,
        can_save_cam: false,
        can_cancel_cam: false,
        card_no: '',
        face_pct: '%'
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
        var canvas = document.getElementById('canvas2')
        var img = canvas.toDataURL('image/png')
        img = img.substring(img.indexOf(',') + 1)

        // alert(img)
        var data = {img: img, id: this.id}
        var that = this
        var url = window.api_host + 'demo_card'
        that.isLoading = true
        axios.post(
          url,
          data,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then((response) => {
          that.isLoading = false
          if (response.data.success) {
            if (response.data.card_id && response.data.card_id.length === 13) {
              that.card_no = response.data.card_id
              that.savePicture2()
            } else {
              alert('unnable to detect id card information, please retake photo.')
              that.retake()
            }
          } else {
            alert('error')
          }
        })
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
        // hidden webcam
        var ctx2 = document.getElementById('canvas2').getContext('2d')
        ctx2.drawImage(video, 0, 0, w, h)
        w = parseInt(w / 5.0)
        h = parseInt(h / 5.0)
        context.drawImage(video, 0, 0, w, h)
        this.show_vdo = false
        this.can_save_cam = this.can_cancel_cam = !this.show_vdo
      }
    },
    beforeMount: function () {
    },
    mounted: function () {
      document.getElementById('video').addEventListener('play', function () {
        var w = video.videoWidth
        var h = video.videoHeight
        // hidden canvas
        var c2 = document.getElementById('canvas2')
        c2.width = w
        c2.height = h

        // alert('video w/h' + w + ' x ' + h)
        if (w < 1) return
        w = parseInt(w / 5.0)
        h = parseInt(h / 5.0)

        canvas.width = video.width = w
        canvas.height = video.height = h
      })
      initCameraDropdown()
    }
  }

window.chvdo1 = function (deviceId) {
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
      }
    }
    // var mediaConfig = {video: {deviceId: window.vdo_dev ? {exact: window.vdo_dev} : undefined}}
    var mediaConfig = hdConstraints

    navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
      video.src = window.URL.createObjectURL(stream)
      window.stream = stream
      video.play()
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
      window.chvdo1(vdoDev[vdoDev.selectedIndex].value)
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
