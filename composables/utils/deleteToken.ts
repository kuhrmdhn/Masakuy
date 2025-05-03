export async function deleteToken() {
    try {
        await $fetch("/api/auth/delete-token", {
            method: "POST",
        });
    } catch (err) {
        console.error(err);
        return err
    }
}