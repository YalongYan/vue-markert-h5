import base from './baseinfo';
import axios from '../api/axios.config';

/**
 * 分页，设置页数
 */
export function setPage(total, pageSize) {
  const totalPage = total / pageSize;
  if (totalPage === parseInt(totalPage, 10)) {
    return totalPage;
  } else if (totalPage > parseInt(totalPage, 10)) {
    return parseInt(totalPage + 1, 10);
  }
}
/**
 * json去掉空字段
 */
export function deleteEmpty(object) {
  const data = {};
  for (const name in object) {
    if (object[name] !== '') {
      data[name] = object[name];
    }
  }
  return data;
}
/*
 * 基础数据筛选
 * @parm {String} parm baseInfo中每个字段的名称
 * @parm {Number} id 用于与baseInfo字段比对的数值
 * @return {String} 经过id与基础数据比对后，相符的value
 */
export function getBaseData(parm, id) {
  for (let i = 0, parms = base.baseinfo.data[parm]; i < parms.length; i++) {
    if (id == parms[i].id) {
      return parms[i].text;
    }
  }
}
/*
 * 基础配置筛选
 * @parm {array}   需要筛选的数组
 * @return {String} 经过key与基础数据比对后，相符的value
 */
export function getCarConfig(parm) {
  const list = [];
  parm.forEach((val) => {
    if (val.value !== '0') {
      if (val.value === '1') {
        val.value = '标配';
      } else if (val.value === '2') {
        val.value = '加装';
      }
      list.push(val);
    }
  });
  for (let i = 0; i < base.carConfig.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (base.carConfig[i].key == list[j].code) {
        list[j].code = base.carConfig[i].text;
      }
    }
  }
  return list;
}

/**
 * 创建一个定时器对象。
 * @public
 *
 * @param {Function} func 定时器需要调用的函数
 * @param {number} delay 定时器延迟调用的毫秒数，如果为负数表示需要连续触发
 * @param {Object} caller 调用者，在 func 被执行时，this 指针指向的对象，可以为空
 * @param {Object} ... 向 func 传递的参数
 * @return {Function} 用于关闭定时器的方法
 */
export function timer(func, delay, caller) {
  let args = Array.prototype.slice.call(arguments, 3);
  let pausing;
  function build() {
    return (delay < 0 ? setInterval : setTimeout)(
      () => {
        func.apply(caller, args);
        // 使用delay<0而不是delay>=0，是防止delay没有值的时候，不进入分支
        if (!delay || delay > 0) {
          func = caller = args = null;
        }
      },
      Math.abs(delay),
    );
  }

  delay = delay || 0;
  let handle = build();
  /**
   * 中止定时调用。
   * @public
   *
   * @param {boolean} pause 是否暂时停止定时器，如果参数是 true，再次调用函数并传入参数 true 恢复运行。
   */
  return function (pause) {
    (delay < 0 ? clearInterval : clearTimeout)(handle);
    if (pause) {
      if (pausing) {
        handle = build();
      }
      pausing = !pausing;
    } else {
      func = caller = args = null;
    }
  };
}
/**
 * 小于10的数字前边补零
 * @public
 *
 * @param {Number} num 是否需要补零的数字
 * @return {String} 补零后的字符串
 */
export function addZero(num) {
  return num < 10 ? `0${num}` : num;
}
/**
 * 获取计算本地的开拍时间、结束时间，开始day
 * @public
 *
 * @param {Object} obj {
      serverStartTime: 1508755013090, //服务器开始时间,选填
      serverEndTime: 1508755593090,   //服务器结束时间,选填
      delay: 55593090                 //本地与服务器的时差，必填
    }
 * @return {Object} {
      localStartTime:1508755712010, //本地开始时间
      localStartDay: 'today',       //开拍时间-今天/明天
      localEndTime: 1508799712311   //本地结束时间
    }
 */
export function getLocTime(obj) {
  // const delay = obj.delay; 暂不处理本地-服务器之间的延时问题 2017-12-20 徐华
  const time = {};
  const tonight = new Date();
  tonight.setHours(23);
  tonight.setMinutes(59);
  tonight.setSeconds(1);
  // 本机开拍时间
  if (obj.serverStartTime) {
    // time.localStartTime = obj.serverStartTime - delay; 暂不处理本地-服务器之间的延时问题 2017-12-20 徐华
    time.localStartTime = obj.serverStartTime;
    if (time.localStartTime <= tonight.getTime()) {
      time.localStartDay = 'today';
    } else {
      time.localStartDay = 'tomorrow';
    }
  }
  if (obj.serverEndTime) {
    // time.localEndTime = obj.serverEndTime - delay; 暂不处理本地-服务器之间的延时问题 2017-12-20 徐华
    time.localEndTime = obj.serverEndTime;
  }

  return time;
}

/**
 * 数字保留小数点后几位的处理
 * 例：numToFixed(240000, 10000, 2) == 24 ， numToFixed(241111, 10000, 2) == 24.11
 * @public
 *
 * @param {Number} num 需要转化的数字
 * @param {Number} based 被除的基数
 * @param {Number} point 保留几位小数
 * @return {Number} 处理后的数字
 */
export function numToFixed(num, based, point) {
  const newVal = num / based;
  if (parseInt(newVal, 10) === newVal) {
    return newVal;
  }
  return newVal.toFixed(point);
}

/**
 *  判断空对象，obj为空返回值为false
 */
export function isEmpty(obj) {
  if (JSON.stringify(obj) == '{}') {
    return false;
  }
  return true;
}
/**
 *  获取当前token
 */
export function getToken() {
  return axios.defaults.headers['x-access-token'];
}

// 新加的过滤方法，便于显示调用
/**
 *  时间过滤器方法
 */
export function formatDate(val, format, separators) {
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
      case 'hh-mm-ss':
        dformat = [addZero(d.getHours()), addZero(d.getMinutes()), addZero(d.getSeconds())].join(sptors);
        break;
      default:
        dformat = [d.getFullYear(), addZero(d.getMonth() + 1), addZero(d.getDate())].join(sptors);
    }
    return dformat;
  }
  return '--';
}
/**
 *  处理空时的方法
 */
export function formateResolveNilStr(val, separators = '--') {
  if (typeof val !== 'string') return val;
  if (val !== null && val !== undefined && val.replace(/(^\s*)|(\s*$)/g, '') !== '') {
    return val.replace(/(^\s*)|(\s*$)/g, '');
  }
  return separators;
}

/**
 * 图片压缩，默认同比例压缩
 * @param {Object} path
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj
 *   obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *   回调函数有一个参数，base64的字符串数据
 */
export function dealImage(path, obj, callback) {
  const img = new Image();
  img.src = path;
  img.onload = function () {
    const that = this;
    // 默认按比例压缩
    let w = that.width;
    let h = that.height;
    const scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    let quality = 0.7; // 默认图片质量为0.7
    // 生成canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // 创建属性节点
    const anw = document.createAttribute('width');
    anw.nodeValue = w;
    const anh = document.createAttribute('height');
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    const base64 = canvas.toDataURL('image/jpeg', quality);
    // 回调函数返回base64的值
    callback(base64);
  };
}
