import {createRouter, createWebHistory} from 'vue-router'

import TopicDetail from "../views/course_teaching/topic/TopicDetail.vue";
import AddTest from "../views/course_teaching/test/AddTest.vue";
import TestContent from "../views/course_teaching/test/TestContent.vue"


import NoticeDetail from "../views/course_teaching/notice/NoticeDetail.vue";
import NoticeDialog from "../views/course_teaching/notice/NoticeDialog.vue";
import ClassDetail from "@/views/ClassDetail.vue";
import MemberInfo from "@/views/course_teaching/member/MemberInfo.vue";
import Login from "../views/login.vue"
import {getToken} from "@/utils/token-utils.js";
import {WHITE_LIST,LAYOUT_PATH } from "@/config/setting.js";
import AddHomework from "../components/homework/AddHomework.vue";
import HomeDetail from "../views/course_teaching/homework/HomeDetail.vue";
import Marking from "../views/course_teaching/homework/Marking.vue";
const routes = [

    {
        path:'/topicDetail/:topicId/:noJoinNumber',
        name:'TopicDetail',
        component:TopicDetail,
        props: true,
    },
    {
        path: '/',
        name: 'HomePage',
        component: () => import("../views/HomePage.vue"),
        meta: {
            title: '我的课堂'
        }
    },
    {
        path: '/classDetail',
        name: 'ClassDetail',
        component: ClassDetail,
        meta: {
            title: '课程内容'
        }
    },
    {
        path: '/noticeDetail',
        name: 'NoticeDetail',
        component: NoticeDetail
    },{

        path: '/noticeDialog',
        name: 'NoticeDialog',
        component: NoticeDialog

    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/classSetting',
        name: 'ClassSetting',
        component: () => import("../views/ClassSetting.vue"),
        meta: {
            title: '课程设置'
        }
    },
    {
        path:'/addtest',
        name:'AddTest',
        component: AddTest
    },{
        path:'/testContent',
        name:'TestContent',
        component: TestContent
    },
    {
        path: '/member',
        name: 'MemberInfo',
        component: MemberInfo
    },
    {
        path:'/AddHomework',
        name:'AddHomework',
        component: AddHomework
    },
    {
        path:'/homeDetail',
        name:'HomeDetail',
        component: HomeDetail
    },{
        path: '/marking',
        name: 'Marking',
        component: Marking
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

/**
 * 路由守护
 */
router.beforeEach(async (to, from) => {
    if(!getToken()){
        //未登录跳转登录界面
        if(!WHITE_LIST.includes(to.path)){
            return{
                path: '/login',
                query: to.path === LAYOUT_PATH ? {} : {from: to.path}
            };
        }
        return;
    }
})

export default router;


