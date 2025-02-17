import { Menu } from '@/views/Main/system/Menu/Menu.store'

function extractSubMenuId(menus: Menu[] | undefined): string[] {
  const result: string[] = []

  if (!menus) {
    return result
  }

  function collectSubMenuIds(items: Menu[]) {
    for (const item of items) {
      if (item.subMenus && item.subMenus.length > 0) {
        for (const subItem of item.subMenus) {
          result.push(subItem.id)
        }
      }
    }
  }

  collectSubMenuIds(menus)
  return result
}

export default extractSubMenuId
