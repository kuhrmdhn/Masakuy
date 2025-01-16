"use client"
import React, { useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertStore } from '@/store/alertStore'
import { useShallow } from 'zustand/react/shallow'

export default function AlertProvider() {
    const { alert, setAlert } = AlertStore(useShallow((state) => ({ alert: state.alert, setAlert: state.setAlert })))
    const { isShowAlert, alertTitle, alertDescription } = alert
    
    useEffect(() => {
        if(isShowAlert) {
            setTimeout(() => {
                setAlert({...alert, isShowAlert: false})
            }, 3000)
        }
    }, [isShowAlert, alert, setAlert])

    return (
        <>
            <Alert className={`w-fit h-max fixed top-3 z-[9999] duration-500 ${isShowAlert ? "right-6 visible opacity-100" : "-right-full invisible opacity-0"}`}>
                <AlertTitle>
                    {alertTitle}
                </AlertTitle>
                <AlertDescription>
                    {alertDescription}
                </AlertDescription>
            </Alert>

        </>
    )
}
