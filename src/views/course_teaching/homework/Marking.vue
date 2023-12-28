<template>
    <div style="width: 100vw;margin:10vh 5vw ">
        <a-table :columns="columns" :data-source="data" style="width: 85vw">
            <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script lang="ts" setup>
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '所属标签',
        dataIndex: 'age',
        key: 'age',
        width: 120,
    },
    {
        title: '相似度',
        dataIndex: 'similar',
        key: 'address 1',
        ellipsis: true,
    },
    {
        title: '提交状态',
        dataIndex: 'ifPush',
        key: 'address 2',
        ellipsis: true,
    },
    {
        title: '字数',
        dataIndex: 'num',
        key: 'address 3',
        ellipsis: true,
    },
    {
        title: '批阅次数',
        dataIndex: 'checknum',
        key: 'address 4',
        ellipsis: true,
    },
    {
        title: '成绩',
        dataIndex: 'score',
        key: 'address 5',
        ellipsis: true,
    },
];

const data = [
    {
        key: '1',
        name: '杨雨露',
        age: '默认标签',
        similar: '-',
        ifPush: '-',
        num:'-',
        checknum:'0',
        score:'未交'
    },{
        key: '2',
        name: 'kuku',
        age: '默认标签',
        similar: '-',
        ifPush: '-',
        num:'-',
        checknum:'0',
        score:'未交'
    },
    {
        key: '3',
        name: '测试',
        age: '默认标签',
        similar: '-',
        ifPush: '已提交',
        num:'-',
        checknum:'1',
        score:'5'
    },
];
</script>

