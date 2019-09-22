export interface User {
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    role: string;
    accessToken?: string;
}
