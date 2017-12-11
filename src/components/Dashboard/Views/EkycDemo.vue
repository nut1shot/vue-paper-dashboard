<template>
	<div class="card cam" id='cam' style='height:300px'>
	xxxxxx	
    </div>
</template>
<script>
  import axios from 'axios'
  import {evtBus} from 'main'
  export default {
    data () {
      return {
        user: {
          citizenIdF: '',
          citizenIdB: ''
        }
      }
    },
    methods: {
    },
    beforeMount: function () {
    }
  }
</script>
<style>
#cam {
  background-color:pink;
}
body {
 color:blue;
}
</style>
