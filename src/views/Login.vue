<template>
    <div>
        <XInput :placeholder="'账号'" v-model="userId" class="margin-top-10"></XInput>
        <XInput v-if="!isLoginMode" :placeholder="'昵称'" v-model="username" class="margin-top-10"></XInput>
        <XInput :placeholder="'密码'" :type="'password'" v-model="password" class="margin-top-10"></XInput>
        <XInput v-if="!isLoginMode" :placeholder="'再输入一次'" :type="'password'" v-model="repeat" class="margin-top-10">
        </XInput>
        <XButton @click="doLogin" class="margin-top-10">
            {{ buttonText }}
        </XButton>
        <XButton :link="true" @click="toggleRegister">{{ linkText }}</XButton>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import XInput from '@/components/x-input'
import XButton from '@/components/x-button'
import { login, register } from '@/api/login'
import { namespace } from 'vuex-class'

const gameModule = namespace('game')

@Options({
    components: {
        XInput,
        XButton,
    },
    watch: {
        gameId: {
            handler(val) {
                console.log(val)
                if (val > 0) {
                    this.$router.push('/game')
                }
            },
            immediate: true
        }
    }
})

export default class Login extends Vue {

    userId: string = 'C1034'
    username: string = 'zero'
    password: string = '123'
    repeat: string = '123'
    isLoginMode: boolean = true

    @gameModule.State('gameId') gameId!: number

    get buttonText() {
        return this.isLoginMode ? '登录' : '注册并登录'
    }

    get linkText() {
        return this.isLoginMode ? '注册新用户' : '返回登录'
    }

    doLogin() {
        const me = this
        if (this.isLoginMode) {
            login(this.userId, this.password).then(res => {
                this.$connect(`ws://localhost:8080/v1/websocket/?userId=${this.userId}`)
            })
        } else {
            // todo 验证两次密码是否一致
            register(this.userId, this.username, this.password).then(res => {
                this.$connect(`ws://localhost:8080/v1/websocket/?userId=${this.userId}`)
            })
        }
    }

    toggleRegister() {
        this.isLoginMode = !this.isLoginMode
    }
}
</script>

<style scoped>
.margin-top-10 {
    margin-top: 10px;
}
</style>