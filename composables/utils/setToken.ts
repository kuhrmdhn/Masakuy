export async function setToken(token: string) {
    try {
        await $fetch("/api/auth/token/set-token", {
            method: "POST",
            body: { token },
        });
    } catch (err) {
        console.error(err);
        return err
    }
}