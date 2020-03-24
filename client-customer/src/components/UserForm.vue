<template>
    <div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input is-hovered is-rounded" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input is-hovered is-rounded" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserForm'
}
</script>

<style scoped>
</style>
