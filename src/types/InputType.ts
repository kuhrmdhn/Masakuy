export interface InputType {
    id: string
    placeholder: string
    type?:string
    name?:string
    value: any
    handleOnChange: (e: any) => void
    required?: boolean
}