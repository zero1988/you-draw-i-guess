<template>
    <div>
        <XInput :placeholder="'账号'" v-model="userId"></XInput>
        <XInput :placeholder="'密码'" :type="'password'" v-model="password"></XInput>
        <XButton @click="doLogin">登录</XButton>
        <XButton>注册新用户</XButton>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import XInput from '@/components/x-input'
import XButton from '@/components/x-button'
import { useRouter } from 'vue-router'

@Options({
    components: {
        XInput,
        XButton,
    },
})

export default class Login extends Vue {

    userId: string = ''
    password: string = ''

    $route: any = useRouter()

    mounted() {
        console.log('Login mounted')
    }
    doLogin() {
        this.$router.push('/game')
    }
}
</script>

<style scoped>
</style>