import type { AlertVariants } from '~/components/ui/alert'

export const useAlertStore = defineStore('alert', {
  state: (): {
    isShow: boolean
    title: string
    description: string
    variant: AlertVariants['variant']
  } => ({
    isShow: false,
    title: '',
    description: '',
    variant: 'default',
  }),

  actions: {
    showAlert(
      title: string,
      description: string,
      variant: AlertVariants['variant'] = 'default',
    ) {
      this.isShow = true
      this.title = title
      this.description = description
      this.variant = variant
    },
    hideAlert() {
      this.isShow = false
      this.title = ''
      this.description = ''
      this.variant = 'default'
    },
  },
})
