import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            username: string;
            roles: string[];
            assignedGroup: number;
        } & DefaultUser;
    }

    interface User {
        id: string;
        username: string;
        roles: string[];
        assignedGroup: number;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        username: string;
        roles: string[];
        assignedGroup: number;
    }
}
