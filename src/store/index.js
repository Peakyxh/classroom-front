import {createPinia, defineStore} from "pinia";

// 存储课程id
export const userCourseId = defineStore('courseId', {
    state: () => {
        courseId: null
    },
    actions: {
        getCourseId() {
            return this.courseId
        },
        setCourseId(id) {
            this.courseId = id
        }
    }
})

// 存储用户信息
export const userInfo = defineStore('userInfo', {
    state: () => ({
        token: '',
        name: '',
        avatar: '',
        roles: [],
        username: '',
        permissions: []
    }),
    getters: {

        // getPermissions() {
        //     return this.permissions
        // }
    },
    actions: {
        getToken() {
            return this.token
        },
        getName() {
            return this.name
        },
        getAvatar() {
            return this.avatar
        },
        getUsername() {
            return this.username
        },
        getRoles() {
            return this.roles
        },
        getPermissions() {
            return this.permissions
        },
        setUserInfo(data) {
            this.token = data?.token
            this.name = data?.name
            this.avatar = data?.user?.avatar
            this.username = data?.user?.userName
            this.roles = data?.roles
            this.permissions = data?.permissions
        }
    }
})
