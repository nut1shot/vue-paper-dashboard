<template>
    <div class="row">
      <div class="col-lg-12 col-md-7" style="display: none;">
        <edit-profile-form>

        </edit-profile-form>
      </div>
      <div class="col-lg-12 col-md-7">
        <register-form>

        </register-form>
      </div>
    </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import RegisterForm from './UserProfile/RegisterForm.vue'
  export default {
    components: {
      EditProfileForm,
      RegisterForm
    }
  }

</script>
<style>

</style>
