import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AlertVariants } from '~/components/ui/alert'

export const useAlertStore = defineStore('alert', () => {
  const isShow = ref(false)
  const title = ref('')
  const description = ref('')
  const variant = ref<AlertVariants['variant']>('default')

  function showAlert(
    newTitle: string,
    newDescription: string,
    newVariant: AlertVariants['variant'] = 'default'
  ) {
    isShow.value = true
    title.value = newTitle
    description.value = newDescription
    variant.value = newVariant
  }

  function hideAlert() {
    isShow.value = false
    title.value = ''
    description.value = ''
    variant.value = 'default'
  }

  return {
    isShow,
    title,
    description,
    variant,
    showAlert,
    hideAlert,
  }
})
