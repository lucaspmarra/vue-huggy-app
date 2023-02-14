import { createStore } from '@pinia/core';

const store = createStore({
    state: () => ({
        accessToken: null
    }),
    actions: {
        setAccessToken (accessToken) {
            this.accessToken = accessToken;
        }
    }
});