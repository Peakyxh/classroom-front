import request from '../utils/request.js'

export async function fetchHomeworkData() {
    const res = await request.get('/classroom/homework/list');
    console.log(res)
    if(res?.code === 200){
        return res?.rows
    }
    return Promise.reject(new Error(res?.msg));
}
export async function addHomeworkT(data) {
    return request({
        url: '/classroom/homework/AddHomework',
        method: 'post',
        data: data
    })
}
export async function getHomeworkById(homeworkId) {
    return request({
        url: '/classroom/homework/seach/'+homeworkId,
        method: 'post',
    })
}
export async function updateHomework(data) {
    return request({
        url: '/classroom/homework/EditHomework',
        method: 'put',
        data: data
    })
}
export async function deleteHomework(homeworkId) {
    return request({
        url: '/classroom/homework/' + homeworkId,
        method: 'delete'
    })
}