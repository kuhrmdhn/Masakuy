import type { User } from "../zod/userSchema";

export const useUserData = defineStore("user-data", () => {
    const userData = ref<User | null>(null);

    const setUserData = (data: User) => {
        userData.value = data;
    };

    const initializeUserData = async () => {
        const response = await $fetch<{ data: User }>("/api/user/user-data");
        if (response?.data) {
            setUserData(response.data);
        }
    };

    return { userData, setUserData, initializeUserData };
});
