import { defineStore } from 'pinia'
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useProfileStore = defineStore('profile', {
  state: () => ({
    id: '',
    name: '',
    bio: '',
    image: '',
    post: null,
    posts: null,
    allLikes: 0,
  }),
  actions: {
    async getProfile(id) {
      this.resetUser()
      let res = await $axios.get(`/api/v1/posts/customer/${id}`)
      console.log('post' + res.data.data[0])
      this.$state.id = res.data.data[0].user._id
      this.$state.name = res.data.data[0].user.name
      this.$state.bio = res.data.data[0].user.email
      this.$state.image = '' //res.data.user[0].image

      this.$state.posts = res.data.data

      this.allLikesCount()
    },

    allLikesCount() {
        this.allLikes = 0
        for (let i = 0; i < this.posts.length; i++) {
            const post = this.posts[i];
             for (let j = 0; j < post.likes.length; j++) {
                this.allLikes++
             }
        }
    },
    setProfile() {      
        this.$state.id = ''
        this.$state.name = ''
        this.$state.bio = ''
        this.$state.image = ''
        this.$state.posts = ''
      },

    resetUser() {      
        this.$state.id = ''
        this.$state.name = ''
        this.$state.bio = ''
        this.$state.image = ''
        this.$state.posts = ''
      }
  },
  persist: true,
})
