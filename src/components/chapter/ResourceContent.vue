<template>
  <div>
    <a-card :bordered="true" class="content_card">
      <a-list item-layout="horizontal">
        <template v-for="item in homeworkList" :key="item?.resourceId">
          <a-list-item>
            <a-list-item-meta
                :description="item ? item.content : ''" >
              <template #title>
                <a href="#" style="font-size: 16px;">{{item ? item.title : ''}}</a>
              </template>
              <template #avatar>
                <a-avatar size="middle" src="src/assets/image/icon-data.svg"></a-avatar>
                <p style="margin-left: 0.1vw;font-size: 0.8rem;">资料</p>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>
<script setup>

const homeworkList = defineProps(['contentInfo'])

</script>
<style>
.content_card{
  width: 74vw;
  text-align: left;
  margin-left: -1.5vw;
}
</style>
