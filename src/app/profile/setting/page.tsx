"use client"
import { UserStore } from '@/store/UserStore'
import { useShallow } from "zustand/react/shallow"
import React from 'react'

export default function SettingPage() {
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    return (
        <div>
            setting
        </div>
    )
}
