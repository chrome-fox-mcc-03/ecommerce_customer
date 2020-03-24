<template>
    <div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input v-model="userEmail" class="input is-hovered is-rounded" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input v-model="userPassword" class="input is-hovered is-rounded" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserForm',
  data () {
    return {
      userEmail: '',
      userPassword: ''
    }
  },
  watch: {
    userEmail (value) {
      this.$emit('userEmail', value)
    },
    userPassword (value) {
      this.$emit('userPassword', value)
    }
  }
}
</script>

<style scoped>
</style>
