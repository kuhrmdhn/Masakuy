import React from 'react';
import Input from "../../ui/input";
import { InputType } from '@/types/InputType';

type Props = {
    inputData: InputType[];
};

export default function AuthForm({ inputData, ...props }: Props) {
    return (
        <div className="space-y-7 w-full" {...props}>
            {inputData.map(({ id, placeholder, type, handleOnChange, value, required }) => (
                <Input
                    key={id}
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    className='bg-gray-100'
                    value={value}
                    onChange={handleOnChange}
                    required={required}
                />
            ))}
        </div>
    );
}
