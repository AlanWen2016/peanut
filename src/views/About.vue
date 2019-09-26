<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="showConfirm">click me</button>
  </div>
</template>


<script>

  import confirm from '../components/confirm/index'
  export default {
    name: 'about',
    data() {
      return {}
    },
    methods: {
      showConfirm (){
        confirm('1234').then((success)=>{
          console.log(success)
        }, error => {
          console.log(error)

        })
      }
    }

  }
</script>
