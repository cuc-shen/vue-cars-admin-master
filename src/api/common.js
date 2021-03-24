import service from "../utils/request";
import requestUrl from "./requestUrl";
/**
 * 获取城市列表
 */
export function GetCity(data = {}){
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}

/**
 * 获取table列表
 */
export function GetTableData(params = {}){
    return service.request({
        method: "post",
        url: requestUrl[params.url],
        data: params.data
    })
}

/**
 * 删除列表
 */
export function Delete(params = {}){
    return service.request({
        method: "post",
        url: requestUrl[params.url],
        data: params.data
    })
}

/**
 * 获取车辆品牌
 */
export function GetCarsBrand(data = {}){
    return service.request({
        method: "post",
        url: "/common/getCarsBrand/",
        data
    })
}

/**
 * 获取停车场
 */
export function GetParking(data = {}){
    return service.request({
        method: "post",
        url: "/common/getParking/",
        data
    })
}

/**
 * 获取七牛云 token
 */
export function GetQiniuToken(data = {}){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}