<template>
    <div class="wrapper">
        <div class="logo"></div>
        <XInput :placeholder="'账号'" v-model="userId" class="margin-top-10"></XInput>
        <XInput v-if="!isLoginMode" :placeholder="'昵称'" v-model="username" class="margin-top-10"></XInput>
        <XInput :placeholder="'密码'" :type="'password'" v-model="password" class="margin-top-10"></XInput>
        <XInput v-if="!isLoginMode" :placeholder="'再输入一次'" :type="'password'" v-model="repeat" class="margin-top-10">
        </XInput>
        <XButton @click="doLogin" class="margin-top-10">
            {{ buttonText }}
        </XButton>
        <XButton :link="true" @click="toggleRegister" class="margin-top-10">{{ linkText }}</XButton>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import XInput from '@/components/x-input'
import XButton from '@/components/x-button'
import { login, register } from '@/api/login'
import { User } from '@/models'
import { namespace } from 'vuex-class'
import config from '@/config'

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
    @gameModule.Mutation('setMe') setMe!: (user: User) => void

    get buttonText() {
        return this.isLoginMode ? '登录' : '注册并登录'
    }

    get linkText() {
        return this.isLoginMode ? '注册新用户' : '返回登录'
    }

    doLogin() {
        if (this.isLoginMode) {
            login(this.userId, this.password).then(this.loginCallback)
        } else {
            // todo 验证两次密码是否一致
            register(this.userId, this.username, this.password).then(this.loginCallback)
        }
    }

    private loginCallback(res: any) {
        this.setMe(res.data as User)
        this.$connect(`${config.wsUrl}/websocket/?userId=${this.userId}`)
    }

    toggleRegister() {
        this.isLoginMode = !this.isLoginMode
    }
}
</script>

<style scoped>
.wrapper {
    height: 500px;
    margin: auto auto;
}

.margin-top-10 {
    margin: 10px auto
}

.logo {
    background-image: url("@/assets/logo.png");
    width: 100%;
    height: 200px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
</style>