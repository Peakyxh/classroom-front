<template>
  <div>
<!--    <a-card :bordered="true" class="content_card">-->
<!--      <a-list item-layout="horizontal">-->
<!--        <template v-for="item in homeworkList" :key="item?.topicId">-->
<!--          <a-list-item>-->
<!--            <a-list-item-meta-->
<!--                :description="item ? item.content : ''" >-->
<!--              <template #title>-->
<!--                <a href="#" style="font-size: 16px;">{{item ? item.title : ''}}</a>-->
<!--              </template>-->
<!--              <template #avatar>-->
<!--                <a-avatar size="middle" src="src/assets/image/icon-homework.svg"></a-avatar>-->
<!--                <p style="margin-left: 0.1vw;font-size: 0.8rem;">话题</p>-->
<!--              </template>-->
<!--            </a-list-item-meta>-->
<!--          </a-list-item>-->
<!--        </template>-->
<!--      </a-list>-->
<!--    </a-card>-->
    <a-card :bordered="true" class="content_card">
      <a-list item-layout="horizontal">
        <template v-for="item in topicList" :key="item.topicId">
          <a-list-item class="topic-list">
            <a-list-item-meta>
              <template #title>
                <div>
                <span
                    class="title1"
                    @click="goToTopicDetail(item.topicId, item.noJoinNumber)"
                >
                  {{ item.title }}
                </span>
                  <br />
                  <div class="content2" v-if="item.publishDate == null">
                    <span>未发布</span>
                  </div>
                  <div
                      v-if="item.publishDate != null && userRole == 'admin'"
                      class="content1"
                  >
                    截止时间：
                    <span v-if="item.deadline != null">
                    {{ formatDeadline(item.deadline) }}
                  </span>
                    <span v-else> 不限 </span>| 已参加
                    <span>{{ item.joinNumber }}</span>
                    | 未参加
                    <span>
                    {{ item.noJoinNumber }}
                  </span>
                    |评论
                    <span>
                    {{ item.commentCount }}
                  </span>
                  </div>
                  <div
                      class="issue"
                      v-if="item.publishDate == null && userRole == 'admin'"
                  >
                    <send-outlined @click="issue(item.topicId)" />发布
                  </div>
                  <div class="more" v-if="userRole == 'admin'">
                    <p style="font-size: 2vh">更多</p>
                    <el-popover
                        placement="right"
                        :width="50"
                        :height="100"
                        trigger="click"
                    >
                      <template #reference>
                        <ellipsis-outlined size="15" /><br />
                      </template>

                      <div>置顶</div>
                      <div>
                        <span @click="deleteTopic(item.topicId)">删除</span>
                      </div>
                      <div><span @click="issue(item.topicId)">编辑</span></div>
                      <div>移动到章节</div>
                    </el-popover>
                  </div>
                </div>
              </template>
              <template #avatar>
                <a-avatar
                    :size="40"
                    src="src/assets/image/Topics.png"
                    class="avatar"
                ></a-avatar>
                <p style="font-size: large">话题</p>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>
<script setup>

import {EllipsisOutlined, SendOutlined} from "@ant-design/icons-vue";

const topicList = defineProps(['contentInfo'])

console.log(topicList)

</script>
<style>
.content_card{
  width: 70vw;
  text-align: left;
  margin-left: -1.5vw;
}
</style>
