import service from "../utils/request";
/** 标志 */
export function BrandLogo(data = {}){
    return service.request({
        method: "post",
        url: "/brand/logo/",
        data
    })
}

/** 添加 */
export function BrandAdd(data = {}){
    return service.request({
        method: "post",
        url: "/brand/add/",
        data
    })
}

/** 删除 */
export function BrandDelete(data = {}){
    return service.request({
        method: "post",
        url: "/brand/delete/",
        data
    })
}


/** 禁启用 */
export function BrandStatus(data = {}){
    return service.request({
        method: "post",
        url: "/brand/status/",
        data
    })
}

/** 详情 */
export function BrandDetailed(data = {}){
    return service.request({
        method: "post",
        url: "/brand/detailed/",
        data
    })
}

/** 修改 */
export function BrandEdit(data = {}){
    return service.request({
        method: "post",
        url: "/brand/edit/",
        data
    })
}
