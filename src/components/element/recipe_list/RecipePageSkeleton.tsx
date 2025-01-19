import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function RecipePageSkeleton() {
    const dummyRecipeData = [...Array(15)].map((e, i) => ({
        id: `dummy-data-${i}`
    }))
    return (
        <section className="w-full h-full overflow-hidden sm:pl-40 lg:pl-52">
            <div className={`w-full h-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-items-center gap-y-3`}>
                {
                    dummyRecipeData.map((e) => (
                        <Skeleton
                            key={e.id}
                            className="w-[170px] sm:w-[180px] lg:w-[280px] h-[240px] lg:h-[360px] rounded-lg border shadow-xl hover:shadow-lg duration-300"
                        />
                    ))
                }
            </div>
        </section>
    )
}
