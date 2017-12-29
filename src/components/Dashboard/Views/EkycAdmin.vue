<template>
	<div v-if="state==1" class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th class="text-center" v-for="column in columns">
			       {{column_name[column]}}
          </th>
        </thead>          
        <tbody>
          <tr class="text-center" v-for="(item, index) in tb">
            <td v-for="column,c in columns">
              <span v-if="column=='No'">
                  {{index + 1}}
              </span>
              <span v-else-if="column=='detail'">
                  <button v-on:click="detail(item)" class="btn btn-info btn-fill btn-wd">View</button>
              </span>
              <span v-else-if="column=='filename'">
                  {{item[column] + '.webm'}}
              </span>
              <span v-else>
                  {{item[column]}}
              </span>       	
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="state==2">
      <video width="640" height="480" controls preload>
        <source :src="src_vdo" type="video/webm" >
        <track label="English" kind="subtitles" srclang="en" :src="src_sub" default>
        <track label="Thai" kind="subtitles" srclang="th" :src="src_sub" >
        Your browser does not support the video tag.
      </video>
      <br><br><button v-on:click="goState(1)" class="btn btn-info btn-fill btn-wd">Back</button>
    </div>
</template>
<script type="text/javascript">
  import axios from 'axios'
  import { evtBus } from 'main'
  export default {
    data () {
      return {
        state: 1,
        columns: ['No', 'comp_id', 'id', 'ref_no', 'word', 'time', 'filename', 'detail'],
        tb: [],
        column_name: { 'No': 'No.', 'comp_id': 'company', 'id': 'id', 'ref_no': 'ref_no', 'word': 'words', 'time': 'times', 'filename': 'filename', 'detail': 'ดูรายละเอียด' },
        src_vdo: '',
        src_sub: ''
      }
    },
    mounted () {
      var url = window.api_host + 'ekyc_report'
      axios.post(
        url
      ).then((response) => {
        if (response.data.success) {
          console.log(JSON.stringify(response.data.data))
          this.tb = response.data.data
        } else {
          alert(response.data.error_msg)
        }
      })
    },
    methods: {
      detail (item) {
        this.src_vdo = 'https://creden.co/face/images/vdo/' + item['filename'] + '.webm'
        this.src_sub = 'https://creden.co/face/images/vdo/' + item['filename'] + '.vtt'
        this.goState(2)
      },
      goState (state) {
        this.state = state
      }
    }
  }
</script>
