import React from 'react';

const UserContext = React.createContext({
    users: [
        {
            email: '',
            username: '',
            password: '',
        },
    ],
    createUser: item => { },
    forgotPasswordUser: item => { },
    deleteUser: item => { },
});

export default UserContext;
