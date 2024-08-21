import bcrypt from "bcryptjs";

async function encodeBcrypt(key: string): Promise<string> {
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(key, saltRounds);
        return hash;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to encode key");
    }
}

async function decodeBcrypt(key: string, hashKey: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(key, hashKey);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to decode key");
    }
}

export { encodeBcrypt, decodeBcrypt };