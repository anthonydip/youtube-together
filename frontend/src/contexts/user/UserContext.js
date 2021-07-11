import { createContext } from 'react';

export const UserContext = createContext({
    user: {
        uid: 0,
        username: '',
        email: '',
        logged: false,
    },
});