import { parseTime } from './index';

/**
 * 日期快捷选项
 */
export const PickerOptions = {
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }
  ]
};
/**
 *  格式化时间，包含时间区间sql使用
 * @param {Object<Date>} time
 */
export const formatDatePickerValue = (time = []) => {
  const start = time[0] || new Date();
  const end = time[1] || new Date();
  const startTime = parseTime(start, '{y}-{m}-{d}') + ' 00:00:00';
  const endTime = parseTime(end, '{y}-{m}-{d}') + ' 23:59:59';
  return [startTime, endTime];
};
