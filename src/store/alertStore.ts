import { create } from "zustand";

export const initialAlertData = {
    isShowAlert: false,
    alertTitle: "",
    alertDescription: ""
}

type Alert = {
    isShowAlert: boolean,
    alertTitle: string,
    alertDescription: string
}

type Store = {
    alert: Alert,
    setAlert: (alertData: Alert) => void
}

export const AlertStore = create<Store>()((set) => ({
    alert: initialAlertData,
    setAlert: (alertData: Alert) => {
        set({
            alert: alertData
        })
    }
}))