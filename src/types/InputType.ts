export interface InputType {
    id: string
    placeholder: string
    type?:string
    value: any
    handleOnChange: (e: any) => void
    required?: boolean
}