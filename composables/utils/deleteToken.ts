export async function deleteToken() {
    try {
        await $fetch("/api/auth/token/delete-token", {
            method: "DELETE",
        });
    } catch (err) {
        console.error(err);
        return err
    }
}