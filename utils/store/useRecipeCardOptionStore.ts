export const useRecipeCardOptionStore = defineStore("card-option", {
    state: (): {
        cardOptionId: string,
    } => ({
        cardOptionId: "",
    }),
    actions: {
        toggleOpenOption(id: string) {
            this.cardOptionId = this.cardOptionId === id ? "" : id;
        },
        resetOpenOption() {
            this.cardOptionId = ""
        }
    }
})