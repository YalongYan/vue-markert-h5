import axios from './axios.config';

export default {
  getAllRoles(marketId) { // 获取市场下的所有角色
    return axios.post(`/market/v1/sys-market/markets/${marketId}/roles`);
  },
  getAllDepts(marketId) { // 获取市场所有的部门
    return axios.post(`/market/v1/sys-market/markets/${marketId}/depts`);
  },
  getAllDuties() { // 获取所有的职位,职位是特定的，可以枚举，不用每次请求
    return axios.get('/market/v1/base/duty');
  },
  getUserInfo() { // 获取当前登录人账号信息
    return axios.get('/market/v1/base/userinfo');
  },
  getBaseCarBrand() { // 车辆品牌
    return axios.get('/market/v1/base/brand');
  },
  getBaseCarSeries(brandId) { // 车系
    return axios.get(`/market/v1/base/series/${brandId}`);
  },
  getBaseCarTypes(seriesId) { // 车型
    return axios.get(`/market/v1/base/motorcycletype/${seriesId}`);
  },
  customerLogin(params) { // 登录
    return axios.post(`/market/login?username=${params.username}&password=${params.password}&uuid=${params.uuid}`);
  },
  sendSmsCaptcha(mobile) { // 发送短信验证码
    return axios.post(`/market/send-sms-captcha?mobile=${mobile}`);
  },
  getCarDetailByCarId(carId) { // 获取车源详情
    return axios.get(`/market/v1/car-manage/cars/${carId}/detail`);
  },
  getCarConfigsByCarId(carId) { // 获取车源配置信息
    return axios.get(`/market/v1/car-manage/cars/${carId}/configure`);
  },
  getCarDescByCarId(carId) { // 获取车源描述信息
    return axios.get(`/market/v1/car-manage/cars/${carId}/describe`);
  },
  getCarList(params) { // 获取车源列表，通过设置marketStatus状态请求不同状态的车辆列表
    return axios.post('/market/v1/car-manage/cars/list', params);
  },
  setCarEnter(carId) { // 设置车辆入场
    return axios.post(`/market/v1/car-manage/cars/${carId}/enter`);
  },
  setCarOut(carId) { // 设置车辆出场
    return axios.post(`/market/v1/car-manage/cars/${carId}/out`);
  },
};
