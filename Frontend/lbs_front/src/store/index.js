import { createStore } from 'vuex';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default createStore({
    state: {
        token: localStorage.getItem('token') || '',
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const response = await axios.post('/api/login', { email, password });
                const token = response.data.token;
                commit('setToken', token);
                localStorage.setItem('token', token);
            } catch (error) {
                console.error(error);
            }
        },
        async logout({ commit }) {
            commit('setToken', '');
            localStorage.removeItem('token');
        },
        async checklogin({ commit }) {
            try {
                const response = await axios.get('/api/checklogin',
                    { headers: { Authorization: `Bearer ${this.state.token}` }, });
                const token = response.data.token;
                commit('setToken', token);
                localStorage.setItem('token', token);
                // 토큰 디코딩
                const decoded = jwtDecode(token);
                console.log(decoded); // 디코딩된 페이로드 출력
                // 사용자 정보 추출
                const { name, email, role } = decoded;
                console.log(name, email, role); // 사용자 정보 출력


            } catch (error) {
                console.error(error);
                commit('setToken', '');
                localStorage.removeItem('token');
            }
        }
    },
})