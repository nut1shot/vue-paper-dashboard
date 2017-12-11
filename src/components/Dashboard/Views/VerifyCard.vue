<template>
	<div class="card">
		<div class="header"><h4 class="title">รูปตัวเอง</h4></div>
		<div class="content">
			<img style="width: 100%; display: block; margin: auto;" src="http://sm.hjkl.ninja:8124/chk/Add_user_icon.png">
      		<input style="display: block; margin: auto;" @change="onFileChange" type="file" accept="image/*">
		</div>
		<hr style="height: 15px; background-color: #eee;">
		<div class="header"><h4 class="title">รูปตัวเอง</h4></div>
		<div class="content">
			<img style="width: 100%; display: block; margin: auto;" src="http://sm.hjkl.ninja:8124/chk/Add_user_icon.png">
      		<input style="display: block; margin: auto;" @change="processFile2($event)" type="file" accept="image/*">
		</div>
		<button v-on:click="verifyFaces" class="btn btn-info btn-fill btn-wd">verify</button>
	</div>
</template>
<script type="text/javascript">
  import axios from 'axios'
  import { evtBus } from 'main'
  export default {
    data () {
      return {
        faceId1: '',
        faceId2: ''
      }
    },
    methods: {
      verifyFaces () {
        var url = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/verify'
        var data = { 'faceId1': this.faceId1, 'faceId2': this.faceId2 }
        console.log(data)
        /*
        axios.post(
          url,
          data
        ).then((response) => {
          if (response.data.success) {
            alert(response.confidence)
          } else {
            alert(response)
          }
        })
        */
      },
      onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        console.log('createImage')
        var image = new Image()
        var reader = new FileReader()
        var vm = this

        reader.onload = (e) => {
          vm.image = e.target.result
          console.log(vm.image)
          var binaryString = atob(vm.image)
          var len = binaryString.length
          var bytes = new Uint8Array(len)
          for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          console.log(bytes.buffer)
        }
        reader.readAsDataURL(file)
      },
      processFile () {
        var reader = new FileReader()
        this.faceId1 = event.target.files[0]
        reader.onload = function (e) {
          var arr = new Uint8Array(this.faceId1.result)
          console.log(arr)
        }
      },
      processFile2 (event) {
        this.faceId2 = event.target.files[0]
      },
      base64ToArrayBuffer (base64) {
        var binaryString = window.atob(base64)
        var len = binaryString.length
        var bytes = new Uint8Array(len)
        for (var i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        return bytes.buffer
      }
    }
  }
</script>
