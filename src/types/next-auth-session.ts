// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string,
        username: string,
        password:string
    }
    
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            name: string
        };
    }
}

declare module "next-auth/jwt" {
    interface jwt {
        id: string;
        username: string;
    }
}
