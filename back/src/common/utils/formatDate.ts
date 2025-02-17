import dayjs from 'dayjs';

const formatDate = (data: any): any => {
  const transform = (item: any): any => {
    if (Array.isArray(item)) {
      // 如果是一个数组，递归处理数组中的每个元素
      return item.map(transform);
    } else if (typeof item === 'object' && item !== null) {
      // 如果是一个对象，处理对象中的每个属性
      return Object.keys(item).reduce((acc, key) => {
        if (key === '_id' && item._id) {
          // 特殊处理 _id 字段
          acc.id = item._id;
          acc._id = undefined;
        } else if (key === 'createdAt' && item.createdAt) {
          // 特殊处理 createdAt 字段
          acc.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
        } else if (key === 'updatedAt' && item.updatedAt) {
          // 特殊处理 updatedAt 字段
          acc.updatedAt = dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        } else if (key === '__v') {
          // 删除 __v 字段
          return acc;
        } else {
          // 其他字段，递归处理
          acc[key] = Array.isArray(item[key])
            ? item[key].map(transform) // 如果是数组，递归处理
            : typeof item[key] === 'object' && item[key] !== null
              ? transform(item[key]) // 如果是对象，递归处理
              : item[key]; // 否则直接返回
        }
        return acc;
      }, {} as any);
    } else {
      // 如果不是对象或数组，直接返回
      return item;
    }
  };

  return Array.isArray(data) ? data.map(transform) : transform(data);
};

export default formatDate;
