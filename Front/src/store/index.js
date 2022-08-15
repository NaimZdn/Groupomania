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
       picture: '', 
       isAdmin: '', 
       bio: '', 
     }; 
   } else {
     try {
       user = JSON.parse(user);

     } catch (ex) {
       user = {
         userId: '',
         pseudo: '',
         picture: '', 
         isAdmin: '', 
         bio: '', 
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
            userId: '', 
         
        },
        post : {
            message: '', 
            picture: '', 
            likes: '', 

        }
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
            localStorage.setItem('user', JSON.stringify(userInfos));
            state.userInfos = userInfos
        },
        updateUserInfos: function(state, userInfos) {
            const userData = JSON.parse(localStorage.getItem('user')); 

            userData.bio = userInfos.bio ; 
            
            userData.picture = userInfos.picture
            //console.log(userData)
            
            //userData.picture= userInfos.picture; 
            //userData.bio = userInfos.bio
            localStorage.setItem('user', JSON.stringify(userData));
            state.userInfos = userData
        },
        
        disconnectUser: function(state, user) {
            localStorage.clear()
            state.user = user; 
        },
        deleteAccount: function(state, user) {
            localStorage.clear()
        },
        postInfo: function(state, post) {
            localStorage.setItem('post', JSON.stringify(post))
            state.post = post
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
        login: ({ commit, dispatch}, userInfos) => {
            return new Promise((resolve, reject) => {
                axiosInstance.post('/api/auth/login', userInfos, {withCredentials: true})
                    .then((response) => {
                        commit('logUser', response.data)
                        dispatch('getUserInfos')
                       
                        console.log(response.data)
                        resolve(response)
                        
                    

                    })
                    .catch((error) => {
                        reject(error)
                    });
                console.log(userInfos)

            });

        },
        getUserInfos: ({commit, state}) => {
            return new Promise((resolve, reject) => {
                axiosInstance.get(`/api/auth/user/` + state.user.userId, {withCredentials: true})
                    .then((response) => {
                        commit('userInfos', response.data)
                        console.log(response.data)
                        resolve(response)
                        

                    })
                    .catch((error) => {
                        reject(error)
                    });
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
        deleteAccount: ({state, commit}) => {
            axiosInstance.delete('api/auth/' + state.user.userId + '/delete', {withCredentials: true })
            .then((response ) => {
                commit('deleteAccount', response.data)
                console.log(response.data);
                console.log(response)
                
            })
            .catch((error) => { 
                console.log(error)
            })
        }, 
        updateUserProfil: ({state, commit}, dataForm) => {
            //console.log(state.user.userId)
            //console.log(state.user)
            axiosInstance.put('api/auth/user/' + state.user.userId , dataForm, {withCredentials: true }, )
            .then((response ) => {
               commit('updateUserInfos', response.data)
    
            })
            .catch((error) => { 
                console.log(error)
            })
            

        },
        getAllUsersPost: ({commit, state}) => {
            axiosInstance.get('api/mainpage/' + state.user.userId, {withCredentials: true })
            .then((response) => {
                console.log(response.data)
            })
        }, 
        createPost: ({commit}, post) => {
            axiosInstance.post('api/mainpage/',post, {withCredentials: true })
                .then((response) => {
                    commit('postInfo', response.data)
                    console.log(response.data)
                })
        }, 
    }
})

export default store; 