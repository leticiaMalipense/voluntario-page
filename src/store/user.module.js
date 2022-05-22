import { userService } from '../service';
import { router } from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true, loggedErro: false }, user }
    : { status: { loggedErro: false }, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/home');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    getAllCompanies({ commit }, { page, size }) {   
        commit('getCompany', { page });
        return userService.getCompany(page, size);
    },

    getAllIndividuals({ commit }, { page, size }) {   
        commit('getIndividual', { page });
        return userService.getIndividual(page, size);
    },

    updateStatus({ commit }, { id, approve }) {   
        commit('updateStatus', { id });
        return userService.updateStatus(id, approve);
    },

    logout({ commit }) {
        userService.logout();
        commit('logout');
        router.push('/login');
    }
};

const mutations = {
    getCompany() {
    },

    getIndividual() {
    },

    updateStatus() {
    },

    loginRequest(state, user) {
        state.status = { loggingIn: true,  loggedErro: false };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true,  loggedErro: false };
        state.user = user;
    },
    loginFailure(state) {
        state.status = { loggedErro: true };
        state.user = null;
    },
    logout(state) {
        state.status = { loggedErro: false };
        state.user = null;
    },
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};