import { ref, Ref } from 'vue'

const useRef = <T>(value: T): [Ref<T>, (value: T) => void] => {
  const state = ref(value)

  const setState = (value: T) => {
    state.value = value
  }

  return [state as Ref<T>, setState]
}

export default useRef
