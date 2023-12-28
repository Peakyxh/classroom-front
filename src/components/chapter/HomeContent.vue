<template>
  <div>
    <a-card :bordered="true" class="content_card">
      <a-list item-layout="horizontal">
        <template v-for="item in homeworkList" :key="item?.homeworkId">
          <a-list-item>
            <a-list-item-meta
                :description="item ? item.content : ''" >
              <template #title>
                <a href="#" style="font-size: 16px;">{{item ? item.title : ''}}</a>
                <div>
                  <EllipsisOutlined style="font-size: 1.3rem" />
                </div>
                <div style="margin-top: -1vh">
                  更多
                </div>
              </template>
              <template #avatar>
                <a-avatar size="middle" src="src/assets/image/icon-homework.svg"></a-avatar>
                <p style="margin-left: 0.1vw;font-size: 0.8rem;">作业</p>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
<!--    <a-card :bordered="true" style="width: 80vw;text-align: left;">-->
<!--      <a-list item-layout="horizontal"  :data-source ="homeworkList">-->
<!--        <template #renderItem="{ item }">-->
<!--          <a-list-item :key="item.title">-->
<!--            <a-list-item-meta-->
<!--                :description=item.description>-->

<!--              <template #title>-->
<!--                <a href="#" style="font-size: 16px;">{{ item.title}}</a>-->
<!--                &lt;!&ndash; 如果未发布 &ndash;&gt;-->
<!--                <div v-if="item.showpub" style="float: right;">-->
<!--                  <a href="#" style="font-size: 26px;margin-right: 1vw;float: left;">-->
<!--                    <SendOutlined />-->
<!--                    <p style="font-size: 16px;color: black;margin-left:-0.3vw;">发布</p>-->
<!--                  </a>-->
<!--                  <a href="#" style="font-size: 26px;margin-right: 1vw;float: left;">-->
<!--                    <EllipsisOutlined />-->
<!--                    <p style="font-size: 16px;color: black;margin-left:-0.3vw;">更多</p>-->
<!--                  </a>-->
<!--                </div>-->
<!--                <div v-else="item.showpub"  style="float: right;">-->
<!--                  <a href="#" style="font-size: 26px;margin-right: 2vw;float: left;">-->
<!--                    {{ item.approved}}-->
<!--                    <p style="font-size: 16px;color: black;margin-left:-1.3vw;">已批完</p>-->
<!--                  </a>-->
<!--                  <a href="#" style="font-size: 26px;margin-right: 2vw;float: left;">-->
<!--                    {{ item.unapproved}}-->
<!--                    <p style="font-size: 16px;color: black;margin-left:-1.3vw;">未批完</p>-->
<!--                  </a>-->
<!--                  <a href="#" style="font-size: 26px;margin-right: 2vw;float: left;">-->
<!--                    {{ item.unpaid}}-->
<!--                    <p style="font-size: 16px;color: black;margin-left:-0.7vw;">未交</p>-->
<!--                  </a>-->
<!--                </div>-->
<!--              </template>-->
<!--              <template #avatar>-->
<!--                <a-avatar :size="size" src="src/assets/image/zuoye.png">-->
<!--                </a-avatar>-->
<!--                <p style="margin-left: 0.3vw;font-size: 16px;">作业</p>-->
<!--              </template>-->
<!--            </a-list-item-meta>-->
<!--          </a-list-item>-->
<!--        </template>-->
<!--      </a-list>-->
<!--    </a-card>-->
  </div>
</template>
<script setup>

import {EllipsisOutlined, SendOutlined} from "@ant-design/icons-vue";

const homeworkList = defineProps(['contentInfo'])

</script>
<style>
.content_card{
  width: 74vw;
  text-align: left;
  margin-left: -1.5vw;
}
</style>
