import service from "../utils/request";

/** 添加 */
export function CarsAdd(data = {}){
    return service.request({
        method: "post",
        url: "/cars/add/",
        data
    })
}

/** 禁启用状态 */
export function CarsStatus(data = {}){
    return service.request({
        method: "post",
        url: "/cars/status/",
        data
    })
}

/** 删除 */
export function CarsDelete(data = {}){
    return service.request({
        method: "post",
        url: "/cars/delete/",
        data
    })
}

/** 详情 */
export function CarsDetailed(data = {}){
    return service.request({
        method: "post",
        url: "/cars/detailed/",
        data
    })
}

/** 编辑 */
export function CarsEdit(data = {}){
    return service.request({
        method: "post",
        url: "/cars/edit/",
        data
    })
}

/** 获取详情（包含租赁类型） */
export function CarsInfoDetailed(data = {}){
    return service.request({
        method: "post",
        url: "/cars/carsDetailed/",
        data
    })
}

/** 添加（包含租赁类型） */
export function CarsInfoAdd(data = {}){
    return service.request({
        method: "post",
        url: "/cars/carsInfoAdd/",
        data
    })
}


/** 编辑（包含租赁类型） */
export function CarsInfoEdit(data = {}){
    return service.request({
        method: "post",
        url: "/cars/carsInfoEdit/",
        data
    })
}


/** 释放车辆 */
export function CarsLock(data = {}){
    return service.request({
        method: "post",
        url: "/cars/lock/",
        data
    })
}