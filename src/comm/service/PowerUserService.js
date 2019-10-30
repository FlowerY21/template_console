import {post} from './support/axios-helper';
import {PowerUserApi} from "./support/UrlMapper";

/*
    权限管理--用户管理 相关接口服务类
    author: FlowerY21
    Date:   2019-10-29
*/

const port = ':8880';

const list = (data) => {
    return post(PowerUserApi.List,port,data,true);
};

export default {list}
