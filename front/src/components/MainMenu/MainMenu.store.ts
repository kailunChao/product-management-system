import router from '@/router'
import { useMainStore } from '@/views/Main/Main.store'
import { Menu, SubMenu } from '@/views/Main/system/Menu/Menu.store'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useMainMenuStore = defineStore(
  'main-menu',
  () => {
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])

    const mainStore = useMainStore()

    watch(
      [selectedKeys, () => mainStore.userInfo],
      newValues => {
        console.log(newValues)
        if (newValues[1].menus.length !== 0) {
          newValues[1].menus.forEach((menuItem: Menu) => {
            menuItem.subMenus.forEach((subMenuItem: SubMenu) => {
              if (subMenuItem.id === newValues[0][0]) {
                console.log(subMenuItem)
                router.push(subMenuItem.path)
              }
            })
          })
        }
      },
      { immediate: true }
    )
    return {
      selectedKeys,
      openKeys
    }
  },
  {
    persist: true
  }
)
