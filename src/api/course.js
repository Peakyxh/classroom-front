import request from '../utils/request.js'

// 查询所有课程
export async function getAllCourse(userId) {
    const res = await request.get('/classroom/course/list/'+userId)
    if(res?.code === 200){
        return res?.rows
    }
    return Promise.reject(new Error(res?.msg));
}

// 查询用户教的、学的和协助的所有课程
export async function getUserTCourse(userId, type) {
    const res = await request.get('/classroom/course/byUserId?userId='+userId+"&type="+type)
    if(res?.code === 200){
        return res?.data
    }
    return Promise.reject(new Error(res?.msg))
}

// 得到一个课程
export async function getOneCourse(id) {
    const res = await request.get('/classroom/course/byId/'+id)
    if(res?.code === 200){
        return res?.data
    }
    return Promise.reject(new Error(res?.msg));
}

// 添加课程
export async function addCourse(data){
    const res = await request.post('/classroom/course', data)
    if(res?.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res?.msg))
}

// 删除课程
export async function deleteCourse(courseIds) {
    const res = await request.delete('/classroom/course/'+courseIds)
    if(res?.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res?.msg))
}

// 加入课程
export async function joinCourse(code){
    const res = await request.get('/classroom/course/code/'+code)
    if(res?.code === 200){
        return res
    }
    if(res?.code === 500){
        return res
    }
    return Promise.reject(new Error(res?.msg))
}

// 修改课程
export async function editCourse(data){
    const res = await request.put('/classroom/course', data)
    if(res?.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res?.msg))
}

// 重置课程码
export async function renewCode(courseId){
    const res = await request.put('/classroom/course/renew/'+courseId)
    if(res?.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res?.msg))
}

// 进行结课
export async function overTheCourse(courseId){
    const res = await request.put('/classroom/course/overCourse/'+courseId)
    if(res?.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res?.msg))
}

// 进行取消结课
export async function openTheCourse(courseId){
    const res = await request.put('/classroom/course/openCourse/'+courseId)
    if(res?.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res?.msg))
}

// 取消置顶
export async function cancelCourse(courseId, isTop) {
    const res = await request.put('/classroom/course/top', {
        courseId: courseId,
        isTop: isTop
    })
    if(res?.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res?.msg))
}

// 退出课程
export async function exitCourse(courseId) {
    const res = await request.get('/classroom/course/exit/'+courseId)
    if(res?.code === 200){
        return res?.msg
    }
    return Promise.reject(new Error(res?.msg))
}

// 得到课程成员
export async function getMemberInfo(courseId) {
    const res = await request.get('/classroom/course/member/'+courseId)
    if(res?.code === 200){
        return res
    }
    return Promise.reject(new Error(res?.msg))
}
