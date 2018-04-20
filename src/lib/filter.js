import Vue from 'vue';
import { addZero } from './method';
import { } from './extend';
import baseInfo from './baseinfo';

Vue.filter('numToStr', value => value.toString());
Vue.filter('interiorColorFilter', (value) => {
  switch (value) {
    case 1:
      return '米黄';
    case 2:
      return '米灰';
    case 3:
      return '红色';
    case 4:
      return '黑色';
    case 5:
      return '棕色';
    default:
      return '--';
  }
});
Vue.filter('licencePlateNumFilter', (value) => {
  switch (value) {
    case '':
      return '--';
    default:
      return value;
  }
});
Vue.filter('bodyColorFilter', (value) => {
  switch (value) {
    case 1:
      return '银灰色';
    case 2:
      return '深灰色';
    case 3:
      return '黑色';
    case 4:
      return '白色';
    case 5:
      return '红色';
    case 6:
      return '蓝色';
    case 7:
      return '咖啡色';
    case 8:
      return '香槟色';
    case 9:
      return '黄色';
    case 10:
      return '紫色';
    case 11:
      return '绿色';
    case 12:
      return '橙色';
    case 13:
      return '粉红色';
    case 14:
      return '棕色';
    case 15:
      return '冰川白';
    default:
      return '--';
  }
});
// 入场状态  只显示  出厂(3 4 )  入场(1 2 5)
Vue.filter('markerStatusFilter', (value) => {
  switch (value) {
    case 1:
      return '入场';
    case 2:
      return '入场';
    case 3:
      return '出场';
    case 4:
      return '出场';
    case 5:
      return '入场';
    default:
      return '';
  }
});
// 展示真实的状态
Vue.filter('initMarkerStatusFilter', (value) => {
  switch (value) {
    case 1:
      return '未入场';
    case 2:
      return '待入场';
    case 3:
      return '已入场';
    case 4:
      return '待出场';
    case 5:
      return '已出场';
    default:
      return '';
  }
});

const baseinfo = baseInfo.baseinfo;
const baseinfoMap = {};
for (const key in baseinfo) {
  const _item = baseinfo[key];
  const temp = {};
  for (let i = 0, item; item = _item[i++];) {
    temp[item.id] = item.text;
  }
  baseinfoMap[key] = temp;
}
// 定义过滤器
Vue.filter('formatTitle', (value = '', maxwidth = 18) => {
  let result = value;
  if (value.length > 0 && value.length > maxwidth) {
    result = `${value.substring(0, maxwidth)}...`;
  }
  return result;
});
/*
* 格式化字符串
* 字符串截取，默认截取18位
*/
Vue.filter('formatStr', (value, maxwidth) => {
  const maxWidth = maxwidth || 18;
  let result = value || '';
  if (value.length > 0 && value.length > maxWidth) {
    result = value.substring(0, maxWidth);
  }
  return result;
});

/**
 将数值四舍五入后格式化.
 @param num 数值(Number或者String)
 @param cent 要保留的小数位(Number)
 @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 @return 格式的字符串,如'1,234,567.45'
 @type String
 */
Vue.filter('formatNumber', (num, cent, isThousand) => {
  if (num === '***') {
    return '***';
  }
  let _cent = cent || 2;
  isThousand = isThousand || 0;
  if (!num) {
    num = 0;
  }
  num = num.toString().replace(/\$|,/g, '');
  // 检查传入数值为数值类型.
  if (isNaN(num)) {
    num = '0';
  }
  // 确保传入小数位为数值型数值.
  if (isNaN(_cent)) {
    _cent = 0;
  }
  _cent = parseInt(cent, 10);
  _cent = Math.abs(cent);// 求出小数位数,确保为正整数.
  // 确保传入是否需要千分位为数值类型.
  if (isNaN(isThousand)) {
    isThousand = 0;
  }
  isThousand = parseInt(isThousand, 10);
  if (isThousand < 0) {
    isThousand = 0;
  }
  // 确保传入的数值只为0或1
  if (isThousand >= 1) {
    isThousand = 1;
  }
  const sign = (num == (num = Math.abs(num)));// 获取符号(正/负数)
  // Math.floor:返回小于等于其数值参数的最大整数
  num = Math.floor(num * Math.pow(10, cent) + 0.50000000001);// 把指定的小数位先转换成整数.多余的小数位四舍五入.
  let cents = num % Math.pow(10, cent); // 求出小数位数值.
  num = Math.floor(num / Math.pow(10, cent)).toString();// 求出整数位数值.
  cents = cents.toString();// 把小数位转换成字符串,以便求小数位长度.
  while (cents.length < cent) { // 补足小数位到指定的位数.
    cents = `0${cents}`;
  }
  // 不需要千分位符.
  if (isThousand == 0) {
    return (`${((sign) ? '' : '--') + num}.${cents}`);
  }
  // 对整数部分进行千分位格式化.
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num = `${num.substring(0, num.length - (4 * i + 3))},${
      num.substring(num.length - (4 * i + 3))}`;
  }
  return (`${((sign) ? '' : '--') + num}.${cents}`);
});

// 显示有或者无两种文案
Vue.filter('formatval', (val) => {
  if (val) {
    return '有';
  }
  return '无';
});
// 显示有或者无两种文案
Vue.filter('transferType', (val) => {
  if (val === 1) {
    return '本地';
  } else if (val === 2) {
    return '外迁';
  }
  return '--';
});
// 排放标准
Vue.filter('forEmission', (val) => {
  switch (val) {
    case 1:
      return '国一';
    case 2:
      return '国二';
    case 3:
      return '国三';
    case 4:
      return '国四';
    case 5:
      return '国四';
    default:
      return '--';
  }
});
Vue.filter('formatOffer', (val, type, count) => {
  if (type && count && (count > 0)) {
    if (type === 1) {
      return `${val}次投标`;
    }
    return `${val}次出价`;
  } else if (type && type > 1) {
    return '暂无出价';
  } else if (type && type === 1) {
    return '暂无投标';
  }
});
//
Vue.filter('reLine', (val) => {
  if (val) {
    return val;
  }
  return '--';
});


Vue.filter('formatText', (val, str) => {
  if (val !== '') {
    return `${val}${str}`;
  }
  return '--';
});
/**
 * 格式化百分比
 */
Vue.filter('formatRate', (value, isRound) => {
  if (!isRound) {
    return (value * 100).toFixed(2);
  }
  return Math.round(value * 100);
});

Vue.filter('formatCatalog', (value, status, type) => this.$.formatCatalog(value, status, type));

/**
 * 计算可投余额
 * FUNDED:已满标
 * PORTION_FUNDED:部分满标
 * SIGNED：放款
 */
Vue.filter('computeInvestBalance', (amount, total, status) => {
  if (status === 'FUNDED' || status === 'SIGNED' || status === 'PORTION_FUNDED') {
    return 0;
  }
  return (total - amount).toFixed(2);
});
/**
 * 时间戳转换
 * @parm {Number} val 时间戳
 * @parm {String} format 不传默认为yyyy-MM-dd格式， 指定时间格式,如：yyyy-MM
 * @parm {String} separators 分隔符，不传默认为'-'
 * return {String} 时间字符串
 */
Vue.filter('formatDate', (val, format, separators) => {
  if (val) {
    const d = new Date(val);
    const sptors = separators || '-';
    let dformat;
    switch (format) {
      case 'yyyy':
        dformat = d.getFullYear();
        break;
      case 'yyyy-MM':
        dformat = [d.getFullYear(), addZero(d.getMonth() + 1)].join(sptors);
        break;
      case 'yyyy-MM-dd':
        dformat = [d.getFullYear(), addZero(d.getMonth() + 1), addZero(d.getDate())].join(sptors);
        break;
      case 'hh-mm':
        dformat = [addZero(d.getHours()), addZero(d.getMinutes())].join(sptors);
        break;
      case 'yyyy-MM-dd hh:mm':
        dformat = `${[d.getFullYear(), addZero(d.getMonth() + 1), addZero(d.getDate())].join(sptors)} ${
          [addZero(d.getHours()), addZero(d.getMinutes())].join(':')}`;
        break;
      case 'hh-mm-ss':
        dformat = [addZero(d.getHours()), addZero(d.getMinutes()), addZero(d.getSeconds())].join(sptors);
        break;
      default:
        dformat = [d.getFullYear(), addZero(d.getMonth() + 1), addZero(d.getDate())].join(sptors);
    }
    return dformat;
  }
  return '--';
});
Vue.filter('formatYear', (val) => {
  if (val) {
    const d = new Date(val);
    const dformat = d.getFullYear();
    return dformat;
  }
  return '--';
});
Vue.filter('parseDate', (val, format) => {
  const da = new Date(val);
  if (da == 'Invalid Date') {
    return val;
  }
  return da.pattern(format);
});
/**
 *处理后台数据换行符转换为<br/>
 */
Vue.filter('transLine', (str) => {
  let t = '';
  if (str) {
    t = str.replace(/\n/g, '<br>');
    return t;
  }
});

/**
 * 判断是否显示投资定时器
 */
Vue.filter('getSellTimestamp', (autoSellTime, nextSellTime, currentInvestmentAmount) => {
  let sellTimestamp = 0;
  if (!autoSellTime) {
    return 0;
  }
  if (autoSellTime === nextSellTime) {
    sellTimestamp = autoSellTime;
  } else if (autoSellTime !== nextSellTime) {
    if (currentInvestmentAmount <= 0) {
      sellTimestamp = nextSellTime;
    }
  }
  return sellTimestamp;
});

Vue.filter('isShow', (val) => {
  if (val) {
    return 'show';
  }
  return 'hide';
});

// 使用性质 1-营运 2-非营运 3-营转非 4-租赁营运 5-租赁非营运
Vue.filter('useProperty', (value) => {
  switch (value) {
    case 1:
      return '营运';
    case 2:
      return '非营运';
    case 3:
      return '营转非';
    case 4:
      return '租赁营运';
    case 5:
      return '租赁非营运';
    default:
      return '--';
  }
});

// 1-公户 2-私户 3-外事车
Vue.filter('carProperty', (value) => {
  switch (value) {
    case 1:
      return '公户';
    case 2:
      return '私户';
    case 3:
      return '外事车';
    default:
      return '--';
  }
});
// 排放标准 -1无效，1-国一，2-国二，3,-国三，4-国四，5-国五
Vue.filter('emissionStandard', (value) => {
  switch (value) {
    case -1:
      return '--';
    case 1:
      return '国一';
    case 2:
      return '国二';
    case 3:
      return '国三';
    case 4:
      return '国四';
    case 5:
      return '国五';
    default:
      return '--';
  }
});

/*
  * 解决万万元的问题
  * */
Vue.filter('foramatZiChan', (value) => {
  if (value.indexOf('万') === -1 && value.indexOf('万元') === -1) {
    return `${value}万元`;
  } else if (value.indexOf('万') !== -1 && value.indexOf('万元') === -1) {
    return `${value}元`;
  }
});

Vue.filter('paymentType', (value) => {
  switch (value) {
    case 0:
      return '采购车款';
    case 1:
      return '销售车款';
    case 2:
      return '其他款项';
    default:
      return '--';
  }
});
Vue.filter('moneyType', (value) => {
  switch (value) {
    case 1:
      return '全款';
    case 2:
      return '定金';
    case 3:
      return '首付款';
    case 4:
      return '尾款';
    case 5:
      return '按揭款';
    default:
      return '--';
  }
});
Vue.filter('paymentMethod', (value) => {
  switch (value) {
    case 1:
      return '银行转账';
    case 2:
      return 'POS机';
    case 3:
      return '现金';
    case 4:
      return '支票';
    case 5:
      return '挂账';
    case 6:
      return '其他';
    default:
      return '--';
  }
});
Vue.filter('carTypeFilter', (id) => {
  switch (id) {
    case 1:
      return '新车';
    default:
      return '二手车';
  }
});
/*
 * 资金流水显示问题
 * */
Vue.filter('foramatLiuShui', (value) => {
  if (value === 'PAYMENT') {
    return '回款';
  }
  if (value === 'DEPOSIT') {
    return '充值';
  }
  if (value === 'WITHDRAW') {
    return '取现';
  }
  if (value === 'FROZEN') {
    return '冻结';
  }
  if (value === 'UNFROZEN') {
    return '解冻';
  }
  if (value === 'INTEREST_SUCCESS') {
    return '投标成功';
  }
  if (value === 'PLATFORM_FEE') {
    return '平台服务费';
  }
  if (value === 'INCREASE_INTEREST') {
    return '加息返现';
  }
  if (value === 'REWARD') {
    return '奖励';
  }
  if (value === 'REBATE') {
    return '投资返现';
  }
  if (value === 'LOAN_SUCCESS ') {
    return '借款成功';
  }
  if (value === 'LOAN_FEE ') {
    return '借款服务费';
  }
  if (value === 'REPAYMENT') {
    return '还款';
  }
  if (value === 'TAIL') {
    return '系统贴息';
  }
});

/*
判断 精选标的  持有本金那一项 是否显示
 */
Vue.filter('transfer', (val) => {
  const TransferCatalog = ['JIASHI_V5', 'JIASHI_V10', 'JIASHI_V12', 'JIASHI_V13_T'];
  for (let i = 0; i < TransferCatalog.length; i++) {
    if (TransferCatalog[i] === val) {
      return true;
    }
  }
  return false;
});
/*
  精选标的  时间区间
 */
Vue.filter('formatDateSection', (val, val2) => {
  const d1 = new Date(val);
  const d2 = new Date(val2);
  const dformat1 = [d1.getFullYear(), d1.getMonth() + 1, d1.getDate()].join('.');
  const dformat2 = [d2.getFullYear(), d2.getMonth() + 1, d2.getDate()].join('.');
  return `${dformat2}-${dformat1}`;
});
/*
  从枚举中取数据
 */
Vue.filter('parseBaseInfo', (id, key) => {
  if (id === '' || id === -1) {
    return '--';
  }
  return baseinfoMap[key] === undefined ? id : baseinfoMap[key][id] ? baseinfoMap[key][id] : '--';
});
// 公里转换万公里  元转换万元(不带单位)
Vue.filter('formatMillion', (number, str) => {
  const newVal = number / 10000;
  const unit = str || '万公里';
  if (!number) {
    return '--';
  } else if (parseInt(newVal, 10) === newVal) {
    return `${newVal}${unit}`;
  }
  return `${newVal.toFixed(2)}${unit}`;
});

Vue.filter('checkValue', (val) => {
  if (val == '') {
    return '--';
  }
  return val;
});
