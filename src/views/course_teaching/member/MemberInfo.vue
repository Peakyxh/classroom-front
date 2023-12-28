<template>
  <div>
    <a-table :columns="columns" :data-source="dataTeacher" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
      <template #title>老师成员</template>
    </a-table>
  </div>
  <div>
    <a-table :columns="columns" :data-source="dataStudent" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
      <template #title>学生成员</template>
    </a-table>
  </div>
</template>
<script setup>
import {useRoute} from "vue-router";
import {getMemberInfo} from "@/api/course.js";
import {ref} from "vue";

const columns = [
  {
    title: '账号',
    dataIndex: 'userName',
  },
  {
    title: '邮箱',
    className: 'column-money',
    dataIndex: 'email',
  },
  {
    title: '电话',
    dataIndex: 'phonenumber',
  },
];
const dataTeacher = ref([]);
const dataStudent = ref([]);

const route = useRoute();

const courseId = route.query.courseId

// const memberInfo = ref(null)
// 得到数据
if(courseId !== undefined){
  getMemberInfo(courseId).then((res) => {
    if(res?.data?.courseTeacherVos){
      dataTeacher.value = res?.data?.courseTeacherVos
    }else {
      dataStudent.value = res?.data?.courseStudentVos
    }
  })
}


</script>
<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
