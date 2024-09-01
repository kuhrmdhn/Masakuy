import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import React from 'react'

type Props = {
    loading: boolean
}

export default function AuthButton({ loading }: Props) {
    return (
        <Button
            className={`bg-primary-app text-white w-full h-12 shadow-lg shadow-primary-app hover:bg-primary-app hover:bg-opacity-80 duration-200 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            type="submit"
            disabled={loading}
        >
            {loading ? <span className="animate-spin"><RefreshCw /></span> : "Register"}
        </Button>
    )
}
