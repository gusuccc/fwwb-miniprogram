var data = {
  //客服联系方式
  kefu: {
        weixin: 'guxxandy',
        qq: '874043890',
        gzh: 'https://i03piccdn.sogoucdn.com/f0f13c4729c42883', //公众号二维码必须为网络地址
        phone: '15308184902' //如果你不设置电话客服，就留空
  },
  //默认启动页背景图，防止请求失败完全空白 
  //可以是网络地址，本地文件路径要填绝对位置
  bgurl: 'https://img.pc841.com/2018/0303/20180303112252805.jpg',
 
}
function formTime(creatTime) {
  let date = new Date(creatTime),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
  if (M < 10) {
        M = '0' + M;
  }
  if (D < 10) {
        D = '0' + D;
  }
  if (H < 10) {
        H = '0' + H;
  }
  if (m < 10) {
        m = '0' + m;
  }
  if (s < 10) {
        s = '0' + s;
  }
  return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}
function ms(creatTime){
      let date = new Date(creatTime),
      Y = date.getFullYear(),
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
      if (M < 10) {
            M = '0' + M;
      }
      if (D < 10) {
            D = '0' + D;
      }
      if (H < 10) {
            H = '0' + H;
      }
      if (m < 10) {
            m = '0' + m;
      }
      if (s < 10) {
            s = '0' + s;
      }
      return Y + M  + D + H  + m + s;
}
function days() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  if (month < 10) {
        month = '0' + month;
  }
  if (day < 10) {
        day = '0' + day;
  }
  let date = year + "" + month + day;
  return date;
}
module.exports = {
  data: JSON.stringify(data),
  formTime: formTime,
  days: days,
  ms :ms
}