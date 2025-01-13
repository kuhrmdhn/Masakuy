import React, { Suspense } from 'react'
import Loading from './loading'
import { Metadata } from 'next';
import { publicRecipeRouter } from '@/router/publicRecipeRouter';
import { notFound } from 'next/navigation';
import { UserRouter } from '@/router/userRouter';

type Props = {
    children: React.ReactNode
}

export async function generateMetadata({ params }: { params: { recipeId: string } }): Promise<Metadata> {
    const recipe = await publicRecipeRouter.getRecipeById(params.recipeId);
    if(!recipe) notFound()
    const title = recipe.title;
    const { username: author } = await UserRouter.getUserById(recipe.authorId)

    return {
        title: `${title} by ${author}`,
        description: `Discover the recipe for ${title} by ${author}.`,
    };
}

export default function layout({ children }: Props) {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
}
