import _ from 'lodash'

function getDifferentAttributes(obj1: any, obj2: any): any {
  // 获取 obj2 中所有的键
  const keys2 = _.keys(obj2)

  // 创建一个新的对象，只保留 obj2 中与 obj1 值不一样的属性
  const differences = _.reduce(
    keys2,
    (acc: any, key) => {
      if (_.isObject(obj2[key]) && _.isObject(obj1[key])) {
        const nestedDifferences = getDifferentAttributes(
          obj1[key],
          obj2[key]
        )
        if (!_.isEmpty(nestedDifferences)) {
          acc[key] = nestedDifferences
        }
      } else if (!_.isEqual(obj2[key], obj1[key])) {
        acc[key] = obj2[key]
      }
      return acc
    },
    {}
  )

  return differences
}

export default getDifferentAttributes
