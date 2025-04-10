import { cva, type VariantProps } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'
export { default as AlertDescription } from './AlertDescription.vue'
export { default as AlertTitle } from './AlertTitle.vue'

export const alertVariants = cva(
  'relative w-fit rounded-lg border px-6 py-4 text-sm flex items-center gap-3 has-[>svg]:grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 has-[>svg]items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive: 'p-4 border-l-4 border-red-500 bg-red-100 text-red-800 rounded-lg',
        success: 'p-4 border-l-4 border-green-500 bg-green-100 text-green-800 rounded-lg',
        warning: 'p-4 border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800 rounded-lg',
        info: 'p-4 border-l-4 border-blue-500 bg-blue-100 text-blue-800 rounded-lg'
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
