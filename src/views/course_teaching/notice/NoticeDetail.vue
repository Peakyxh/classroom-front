<template>
  <div>
    <div id="view-discuss" class="notice-detail">
      <div class="notice-box">
        <!--  公告-->
        <div class="announce-box">
          <div class="announce-box-cont">
            <span class="announce-box-cont-span">作业</span>
          </div>
          <!--          编辑的三个点下拉框-->
          <!--         <div class="el-dropdown">-->
          <!--           <span class="el-dropdown-link common_pointer el-dropdown-selfdefine" aria-haspopup="list" aria-controls="dropdown=menu-4878" role="button" tabindex="0">-->
          <!--             <i class="font_family icon-more_outline">-->
          <!--               </i>-->
          <!--           </span>-->
          <!--         </div>-->
          <div style="margin-top: 3vh;margin-bottom: 3vh" >
            <span class="el-tag el-tag--small">
              置顶
            </span>

            <span  style="margin-right: -180vh">
              {{noticeDetail.title}}
            </span>
          </div>
          <div class="detail flex-align flex-between" style="margin-bottom: 3vh">
            <div class="left flex-align">
              <img
                  src="https://ts1.cn.mm.bing.net/th/id/R-C.66d7b796377883a92aad65b283ef1f84?rik=sQ%2fKoYAcr%2bOwsw&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140305%2f1-140305131415.jpg&ehk=Hxl%2fQ9pbEiuuybrGWTEPJOhvrFK9C3vyCcWicooXfNE%3d&risl=&pid=ImgRaw&r=0">
              <b class="font-color font14">{{ user }}</b>
              <span class="font12">创建于{{ noticeDetail.createTime }}</span>
            </div>
            <div class="right flex-align font-color--main">
              <div class="item flex-align">
                <img src="https://www.ketangpai.com/images/zhanshiciyun.svg" alt style="margin-right: 8px;">
                <span class="font14 common_pointer">展示词云</span>
              </div>
            </div>
          </div>
          <div class="notice_content" >
            <div>
              <p>
                <strong v-html="noticeDetail.content"></strong>
              </p>
            </div>
          </div>
<!--          <div class="content-foot flex-align  mgt16">-->
<!--            <div class="left flex-align font12">-->
<!--              <span class="flex-align">-->
<!--                已读-->
<!--                <cite class="font-color&#45;&#45;main mgl-8">2xx</cite>-->
<!--              </span>-->
<!--              <span class="flex-align">-->
<!--                未读-->
<!--                <cite class="font-color&#45;&#45;main mgl-8">1xx</cite>-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <!--  评论-->
        <div class="comment-box">
          <section class="comment-container">
            <div class="comment-main flex-align">
              <div class="left">
                <img
                    src="https://ts1.cn.mm.bing.net/th/id/R-C.66d7b796377883a92aad65b283ef1f84?rik=sQ%2fKoYAcr%2bOwsw&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140305%2f1-140305131415.jpg&ehk=Hxl%2fQ9pbEiuuybrGWTEPJOhvrFK9C3vyCcWicooXfNE%3d&risl=&pid=ImgRaw&r=0">
              </div>
              <div class="right">
                <div class="el-textarea el-input--medium">
        <textarea
            autocomplete="off"
            rows="2"
            placeholder="说点什么吧"
            class="el-textarea__inner"
            style="min-height: 31px"
            v-model="commentform.content">

        </textarea>
                </div>
              </div>
            </div>
            <div class="comment-tools flex-align font-color font14">
              <label class="el-checkbox mgt16">
      <span class="el-checkbox__input">
<span class="el-checkbox__inner">

</span>
        <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value>
      </span>
                <span class="el-checkbox__label">实名发表</span>
              </label>
              <div data-v-0001d97a class="component-upload">

              </div>
              <button type="button" class="el-button el-button--primary el-button--medium" @click="submitComment">发表评论
              </button>
            </div>
            <div class="attachments-layout"></div>
          </section>
          <section class="comment-list">
            <h1>全部评论
              <span class="font12">共{{ commentNum }}条</span></h1>
            <a-card class="bottomCard" style="width: 150vh;padding:0">
              <a-comment v-for="item in commentList" :key="item.commentId">
                <template #author >
                  <a>{{ user }}</a>
                </template>
                <template #avatar>
                  <a-avatar
                      v-if="user.avatar == ''"
                      src="/src/assets/image/avatar1.png"
                  />
<!--                  <a-avatar v-if="user.avatar != ''" src="user.avatar"/>-->
                  <a-avatar v-if="user.avatar != ''" src="/src/assets/image/avatar1.png"/>
                </template>
                <template #actions>
                 <span style="text-align: right"><like-outlined/>{{ item.likesNumber }}&nbsp;&nbsp;<span
                     key="comment-nested-reply-to"
                     @click="reply(item.commentId)">回复</span>&nbsp;&nbsp;
                 </span>
                  <el-popover :visible="visible" placement="top" :width="160" style="text-align: right">
                    <p>确定要删除这条评论吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="small" text @click="visible = false">cancel</el-button>
                      <el-button size="small" type="primary" @click="confirmDelete(item.commentId)"
                      >confirm
                      </el-button
                      >
                    </div>
                    <template #reference>
                      <el-button @click="visible = true">删除</el-button>
                    </template>
                  </el-popover>

                </template>
                <template #content  >
                  <p style="text-align: left">{{ item.content }}</p>
                </template>

                <el-divider/>
                <ChildComponent :childComments="item.child !== null ? item.child : []" v-if="item.child != null">
                </ChildComponent>
              </a-comment>
            </a-card>

          </section>
        </div>
      </div>
    </div>
    <!--    已读人数弹窗-->
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {ref, onMounted, reactive} from "vue";
import {deleteNotice, getAllComment, getOneNotice} from "../../../api/notice.js";
import {getInfo} from "../../../api/login.js";
import {addComment, deleteCommentNotice, getComment, getCommentListTotal} from "../../../api/comment.js";
import ChildComponent from "/src/components/childComponent1.vue";
import {ElMessage} from "element-plus";
import {getOneHome} from "@/api/homework.js";

const noticeDetail = ref({
  title: '',
  content: '',
  createTime: '',
  createBy: '',
  documentLocation: '',
  pictureLocation: ''
})

const noticeid = ref()
noticeid.value = useRoute().query.noticeid
const id = noticeid.value
const user = ref()
const userId = ref()
const commentNum = ref()
const parentId = ref(0)
let visible = ref()
console.log("id；", id)

const commentform = reactive({
  commentId: '',
  content: '',
  typeId: '',
  createTime: Date(),
  createBy: '',
  parentId: ''

})


const commentList = ref(null)
onMounted(() => {
  getHomeDetail(id)
  getCommentAll(id)
  getInfo().then(res => {
    user.value = res.user.nickName
  })
  getCommentListCount(id)
  // console.log("user:",user.value)
})
// console.log("userNickName:",user.value.user)

const getHomeDetail = (id) => {
  getOneHome(id).then((res) => {
    console.log(res)
    noticeDetail.value.title = res.title;
    noticeDetail.value.content = res.content;
    noticeDetail.value.createTime = res.createTime;
    noticeDetail.value.createBy = res.createBy;
    noticeDetail.value.content = res.content;

  })
}
const getCommentAll = (id) => {
  getAllComment(id).then((res) => {
    console.log("res =====", res)
    commentList.value = res
    // commentNum.value = commentList.value.length
    // commentList.value.commentId = res.commentId;
    // commentList.value.content = res.content;
    // commentList.value.typeId = res.typeId;
    // commentList.value.createTime = res.createTime;
    // commentList.value.createBy = res.createBy;
  })
}
const getCommentListCount = (id) => {
  getCommentListTotal(id).then(res => {
    console.log("commentcount:", res)
    commentNum.value = res
  })
}
const submitComment = () => {
  getInfo().then(res => {
    userId.value = res.user.userId
    commentform.typeId = userId.value
    console.log("userId", userId.value);
    commentform.createTime = Date.parse(new Date())
    commentform.parentId = parentId.value
    // console.log("===============",commentform.createTime)
    addComment(commentform, id).then((res) => {
      console.log()
      getCommentAll(id)
    })
  })

  // getInfo().then(res => {
  //   console.log(res.user)
  //   userId.value = res.user.userId
  //   console.log(userId.value)
  //   comment.value.commentId = userId.value
  //   console.log("comment",comment.value)
  //   addComment(comment).then(res1 =>{
  //     console.log("res:",res1)
  //   })
  // })

  // console.log("=================",use)
  // comment.value.typeId = noticeDetail.value.id

}

//添加有父评论的评论
const reply = (parentId) => {
  getInfo().then(res => {
    userId.value = res.user.userId
    commentform.typeId = userId.value
    console.log("userId", userId.value);
    commentform.createTime = Date.parse(new Date())
    commentform.parentId = parentId
    // console.log("===============",commentform.createTime)
    addComment(commentform, id).then((res) => {
      console.log()
      getCommentAll(id)
    })
  })
  // addComment(userId.value, topicId, comment.value, parentId);
};

//删除逻辑
const confirmDelete=(commId)=>{
   deleteCommentNotice(commId).then(res =>{
     console.log(res)
     getCommentAll(id)
     ElMessage({
       message:'删除成功！',
       type:'success'
     })
     visible.value = false
})
}

</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  border: 0;

}

#view-discuss {
  padding: 20px;
  /*width: 1224px;*/
  width: 80vw;
  margin: auto;

}

.notice-box {
  margin: 0 auto;

}

.announce-box {
  width: 80vw;
  height: auto;
  margin: 0 auto;
  border: 1px solid #dadce0;
  padding: 40px 24px 24px;
  border-radius: 4px;
  text-align: left;
  position: relative;
}

.announce-box-cont-span {
  position: absolute;
  background: #6642f4;
  color: #fff;
  font-size: 14px;
  left: 0;
  top: 0;
  border-bottom-right-radius: 4px;
  text-align: center;
  padding: 8px;
}


.common_pointer {

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

}

/*span {*/
/*  outline: none;*/
/*}*/

.el-dropdown i {
  font-size: 20px;
}

.font_family {
  font-family: font_family !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-more_outline:before {
  content: "\e6be"
}


.el-tag {
  background-color: #00ca90;
  border-color: #00ca90;
  color: #fff;
}

.el-tag--small {
  height: 20px;
  padding: 0 5px;
  line-height: 19px;
}

.title {
  font-size: 20px;
}

.detail {
  padding: 4px 0;
  /*margin-top: 10px;*/
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-align {
  display: flex;
  align-items: center;
}

.detail .left img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.font-color {
  color: #3c4043;
}

.font14 {
  font-size: 14px;
}

.detail .left span {
  margin: 0 14px;
  color: #74787c;
}

.font12 {
  font-size: 12px;
}

.font-color--main {
  color: #4285f4;
}

.content {
  margin: 16px 0;
  line-height: 24px;
  /*flex-wrap: inherit;*/
  /*float: left;*/
}

.mgt16 {
  margin-top: 16px;
}

.mgl-8 {
  margin-left: 8px;
}

.comment-box {
  width: 80vw;
  overflow: auto;
  color: #3c4043;
  background: #fff;
  /*padding:20px ;*/
  /*padding-right: 0;*/
}

.comment-main {
  margin-top: 24px;
  padding: 12px;
  border-bottom: 2px solid #4285f4;
  background: #f8f9fa;
}

.comment-box .comment-container .comment-main .left img {
  width: 2.6vw;
  height: 2.6vw;
  border-radius: 50%;
}

.comment-container .comment-main .right {
  flex: 1;
}

.el-textarea {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
}

.el-textarea textarea {
  background: #f8f9fa;
  border: 0;
}

.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dadce0;
  border-radius: 4px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.comment-tools {
  margin: 16px 0;
  justify-content: flex-end;
}

.comment-tools .mgt16 {
  margin-right: 16px;
}

.el-checkbox__label {
  color: #4285f4;
}

.el-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.comment-list {
  margin-top: 12px;
}

.comment-list h1 {
  font-size: 20px;
  text-align: left;
}

.bottomCard {
  margin: auto;
}

.comment {
  width: 150vh;
}

</style>

