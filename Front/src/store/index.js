import { createStore } from 'vuex';
import axios from 'axios';
import 'es6-promise/auto'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',

});

let user = localStorage.getItem('user')
if (!user) {
    user = {
       userId: '',
       pseudo: '',
     }; 
   } else {
     try {
       user = JSON.parse(user);

     } catch (ex) {
       user = {
         userId: '',
         pseudo: '',
       };
     }
   }

const store = createStore({
    state: {
        status: '', 
        user: user,
        userInfos : {
            picture: '', 
            bio: '', 

        },
    },
    mutations: {
        setStatus: function(state, status){
            state.status = status; 
        },
        logUser: function (state, user) {
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user; 
        },
        userInfos: function(state, userInfos) {
            state.userInfos = userInfos
        },
        disconnectUser: function(state, user) {
            localStorage.clear()
            state.user = user; 
        }
        


    },
    actions: {
        createAccount: ({ commit }, userInfos) => {
            return new Promise((resolve, reject) => {
                commit;
                axiosInstance.post('/api/auth/signup', userInfos, {withCredentials: true})
                    .then((response) => {
                        resolve(response)

                    })
                    .catch((error) => {
                        reject(error)
                    })
                //console.log(userInfos)

            })
        },
        login: ({ commit }, userInfos) => {
            return new Promise((resolve, reject) => {
                axiosInstance.post('/api/auth/login', userInfos, {withCredentials: true})
                    .then((response) => {
                        commit('logUser', response.data)
                        resolve(response)

                    })
                    .catch((error) => {
                        reject(error)
                    });
                console.log(userInfos)

            });

        },
        getUserInfos: ({commit, state}) => {
                axiosInstance.get(`/api/auth/user/` + state.user.userId, {withCredentials: true})
                    .then((response) => {
                        commit('userInfos', response.data)
        
                        console.log(response.data)
                        

                    })
                    .catch((error) => {
                        console.log(error)
                    });
        },
        disconnectUser: ({commit}) => { 
            axiosInstance.get('api/auth/logout', {withCredentials: true })
            .then((response ) => {
                commit('disconnectUser', response.data)
                console.log(response.data);
                console.log(response)
                
            })
            .catch((error) => { 
                console.log(error)
            })
        }, 
        deleteAccount: ({state}) => {
            axiosInstance.delete('api/auth/' + state.user.userId + '/delete', {withCredentials: true })
            .then((response ) => {
                console.log(response.data);
                console.log(response)
                
            })
            .catch((error) => { 
                console.log(error)
            })
        }, 
        updateUserProfil: ({state, commit}, dataForm) => {
            axiosInstance.put('api/auth/user/' + state.user.userId, dataForm, {withCredentials: true }, )
            .then((response ) => {
                commit('userInfos', response.data)
                console.log('data');
                console.log(response)
            })
            .catch((error) => { 
                console.log(error)
            })
            console.log(dataForm)

        } 
    }
})

export default store; 