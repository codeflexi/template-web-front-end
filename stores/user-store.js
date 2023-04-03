import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useGeneralStore } from '~/stores/general-store'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    last_name:'',
    email: '',
    token: '',
    bio: '',
    image: ''
  }),
  getters: {
    getToken: (state) => {
      return state.token
    },
    getId: (state) => {
        return state.id
      }
  },
  
  actions: {

    async getTokens() {
      await $axios.get('/sanctum/csrf-cookie')
    },

    setToken(payload) {
        if (payload.token) {
            this.token = payload.token
            localStorage.setItem('token',JSON.stringify(payload.token))
        }
        
      },
  
  
    async login(email, password) {
        try {
          return await $axios.post('/api/v1/auth/login', { email, password })
        } catch (error) {
          if (error) throw error
        }
      },

      setUser(payload) {
        if (payload._id) this.id = payload._id
        if (payload.name) this.name = payload.name
        if (payload.last_name) this.lastName = payload.last_name
        if (payload.email) this.email = payload.email
        if (payload.bio) this.bio = payload.bio
        this.$state.image =
        //'http://localhost:5000/public/images/1680485743304-69743.jpg'
  "https://media.licdn.com/dms/image/C5603AQF4gbfK8P9eog/profile-displayphoto-shrink_100_100/0/1643778347120?e=1684972800&v=beta&t=AR0Cp2YroE1cl_1X32WwpIkf8-SHR1tL2CBcff98A-8";

      },
  

    async register(name, email, password, confirmPassword) {
      await $axios.post('/api/v1/auth/register', {
        name: name,
        email: email,
        password: password
      })
    },

    async getUser() {
      let res = await $axios.get('/api/v1/auth/me')
    return res
    //   this.$state.id = res.data[0].id
    //   this.$state.name = res.data[0].name
    //   this.$state.bio = res.data[0].bio
    //   this.$state.image = res.data[0].image
    },

    async updateUserImage(data,id) {
     const api = `/api/v1/users/${id}`
      return await $axios.post(api, {
        image: data.image
      })
    },

    async updateUser(name,last_name, bio,id) {
        const api = `/api/v1/users/${id}`
      return await $axios.put(api, {
        name: name,
        last_name: last_name,
        bio: bio
      })
    },

    async createPost(data) {
    console.log('data' + data)
      return await $axios.post('/api/v1/posts', data)
    },

    async deletePost(post) {
      return await $axios.delete(`/api/posts/${post.id}`)
    },

    async addComment(post, comment) {
      let res = await $axios.post('/api/comments', {
        post_id: post.id,
        comment: comment
      })

      if (res.status === 200) {
        await this.updateComments(post)
      }
    },

    async deleteComment(post, commentId) {
      let res = await $axios.delete(`/api/comments/${commentId}`, {
        post_id: post.id
      })

      if (res.status === 200) {
        await this.updateComments(post)
      }
    },

    async updateComments(post) {
      let res = await $axios.get(`/api/profiles/${post.user.id}`)

      for (let i = 0; i < res.data.posts.length; i++) {
          const updatePost = res.data.posts[i];

          if (post.id == updatePost.id) {
              useGeneralStore().selectedPost.comments = updatePost.comments
          }
      }
    },

    async likePost(post, isPostPage) {
      let res = await $axios.post('/api/likes', {
        post_id: post.id,
      })

      console.log(res)

      let singlePost = null

      if (isPostPage) {
        singlePost = post
      } else {
        singlePost = useGeneralStore().posts.find(p => p.id === post.id)
      }
      console.log(singlePost)
      singlePost.likes.push(res.data.like)
    },

    async unlikePost(post, isPostPage) {
      let deleteLike = null
      let singlePost = null

      if (isPostPage) {
        singlePost = post
      } else {
        singlePost = useGeneralStore().posts.find(p => p.id === post.id)
      }

      singlePost.likes.forEach(like => {
        if (like.user_id === this.id) { deleteLike = like }
      });
      
      let res = await $axios.delete('/api/likes/' + deleteLike.id)

      for (let i = 0; i < singlePost.likes.length; i++) {
        const like = singlePost.likes[i];
        if (like.id === res.data.like.id) { singlePost.likes.splice(i, 1); }
      }
    },

    async logout() {
      await $axios.get('/api/v1/auth/logout')
      this.resetUser()
    },

    resetUser() {      
      this.$state.id = ''
      this.$state.name = ''
      this.$state.last_name = ''
      this.$state.email = ''
      this.$state.bio = ''
      this.$state.image = ''
      this.$state.token = ''
    }

  },
  persist: true,
})
