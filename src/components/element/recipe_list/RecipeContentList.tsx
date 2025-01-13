import React from 'react'

type Props = {
    dataListItem: any[]
    listTitle: string
}

export default function RecipeContentList({ dataListItem, listTitle }: Props) {
    return (
        <ol className="w-full lg:w-1/2 lg:sticky top-20 h-fit">
            <h2 className="font-bold text-3xl mb-5 animate-rise-up opacity-0 delay-300">
                {listTitle}
            </h2>
            {
                dataListItem.map((item, index) => (
                    <li key={index} className='flex mb-2 animate-rise-up opacity-0' style={{animationDelay: `${(index + 4) * 0.1}s`}}>
                        <span className='w-7 h-7 flex justify-center items-center rounded-full font-bold text-slate-700 mr-2'>
                            {index + 1}
                        </span>
                        <p className='w-4/5'>
                            {item}
                        </p>
                    </li>
                ))
            }
        </ol>)
}
