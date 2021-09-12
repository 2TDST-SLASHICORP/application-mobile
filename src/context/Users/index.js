import React, { useReducer } from 'react';

import UserContext from './type';

const defaultUserState = {
    users: [],
};

const userReducer = (state, action) => {
    if (action.type === 'ADD') {
        const alreadyExistsEmail = state.users.find(item => item.email === action.item.email);
        const alreadyExistsUsername = state.users.find(item => item.username === action.item.username)

        if (alreadyExistsEmail) {
            alert('Email já existe!');
            return {
                users: state.users,
            };
        }

        if (alreadyExistsUsername) {
            alert('Username já existe!');
            return {
                users: state.users,
            };
        }

        const updatedItems = state.users.concat(action.item);

        alert('Usuário criado!');

        return {
            users: updatedItems,
        };
    } else if (action.type === 'UPDATE') {
        const existingUserIndex = state.users.findIndex(
            item => item.email === action.item.email,
        );

        const existingUserItem = state.users[existingUserIndex];

        if (existingUserItem) {
            const updatedItem = {
                username: existingUserItem.username,
                email: existingUserItem.email,
                password: action.item.password
            }

            const updatedItems = [...state.users];
            updatedItems[existingUserIndex] = updatedItem;

            return {
                users: updatedItems,
            };
        } else {
            alert('User not found!');
            return {
                users: state.users,
            };
        }
    } else if (action.type === 'DELETE') {
        const existingUserIndex = state.users.findIndex(
            item => item.email === action.item.email,
        );

        console.log(action.item.email)

        const existingUserItem = state.users[existingUserIndex];

        if (!existingUserItem) {
            alert('User não encontrado');
            return {
                users: state.users,
            };
        }

        const updatedItems = state.users.filter(
            item => item.email !== action.item.email,
        );

        alert('Usuário deletado!');

        return {
            users: updatedItems,
        };
    } else if (action.type === 'CLEAR') {
        return defaultUserState;
    }
    return defaultUserState;
};

const UserProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(
        userReducer,
        defaultUserState,
    );

    const createUser = item => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const forgotPasswordUser = item => {
        dispatchCartAction({ type: 'UPDATE', item: item });
    };

    const deleteUser = item => {
        dispatchCartAction({ type: 'DELETE', item: item });
    };


    const cartContext = {
        users: cartState.users,
        createUser,
        forgotPasswordUser,
        deleteUser,
    };

    return (
        <UserContext.Provider value={cartContext}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
