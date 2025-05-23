export async function deleteToken() {
    try {
        await $fetch("/api/auth/delete-token", {
            method: "DELETE",
        });
    } catch (err) {
        console.error(err);
        return err
    }
}