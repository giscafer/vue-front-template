/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-05-27 17:34:26
 * @description: 表单验证 validator
 *
 */

export const validateMobilePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('手机号不可为空'));
  } else {
    if (value !== '') {
      const reg = /^1[0-9]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'));
      }
    }
    callback();
  }
};

export const validateUserName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('账户名不能为空'));
  } else if (value && value.length < 6) {
    callback(new Error('账户名不能小于6位'));
  } else {
    const reg = /^[A-Za-z0-9_-]+$/;
    if (!reg.test(value)) {
      callback(new Error('只能是字母、数字和下滑杠组成'));
    } else {
      callback();
    }
  }
};

export const validateLetter = (rule, value, callback) => {
  if (!value) {
    callback(new Error('不能为空'));
  } else if (value && value.length < 4) {
    callback(new Error('不能小于4位'));
  } else {
    const reg = /^[A-Za-z0-9_-]+$/;
    if (!reg.test(value)) {
      callback(new Error('只能是字母、数字和下滑杠组成'));
    } else {
      callback();
    }
  }
};

export const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请正确填写邮箱'));
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'));
      }
    }
    callback();
  }
};

export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请设置正确格式的密码'));
  } else if (value.length < 6) {
    callback(new Error('密码长度最小6位'));
  } else {
    callback();
  }
};

export const validateIp = (rule, value, callback) => {
  const pattern = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
  if (!pattern.test(value)) {
    callback(new Error('请设置正确格式的IP'));
  } else {
    callback();
  }
};
