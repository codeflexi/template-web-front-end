<template>
    <div>{{$generalStore.selectedPost}}</div>
    <div 
        id="PostPage" 
        class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
    >
        <div v-if="$generalStore.selectedPost" class="lg:w-[calc(100%-540px)] h-full relative">
            <NuxtLink
                :href="$generalStore.isBackUrl"
                class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
                <Icon name="material-symbols:close" color="#FFFFFF" size="27"/>
            </NuxtLink>

         
            <img 
                class="absolute top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto" 
                width="45" 
                src="~/assets/images/NKSUITLogo-200x80.jpeg"
            >

            <video 
               
                class="absolute object-cover w-full my-auto z-[-1] h-screen" 
                :src="$generalStore.selectedPost.video" 
            />

            <div class="bg-black bg-opacity-70 lg:min-w-[480px]">
                <video 
                    ref="video"
                    controls
                    loop
                    muted
                    class="h-screen mx-auto" 
                    :src="$generalStore.selectedPost.video"
                />
            </div>

        </div>

        <div 
            id="InfoSection" 
            v-if="$generalStore.selectedPost" 
            class="lg:max-w-[550px] relative w-full h-full bg-white"
        >

            <div class="py-7" />

            <div class="flex items-center justify-between px-8">
                <div class="flex items-center">
                    <NuxtLink :href="`/profile/${$generalStore.selectedPost.user._id}`">
                        <img 
                            class="rounded-full lg:mx-0 mx-auto" 
                            width="40" 
                            :src="$userStore.image"
                        >
                    </NuxtLink>
                    <div class="ml-3 pt-0.5">
                        <div class="text-[17px] font-semibold">
                            {{ $generalStore.allLowerCaseNoCaps($generalStore.selectedPost.user.email) }}
                        </div>
                        <div class="text-[13px] -mt-5 font-light">
                            {{ $generalStore.selectedPost.user.name }}
                            <span class="relative -top-[2px] text-[30px] pr-0.5 ">.</span>
                            <span class="font-medium">{{ $generalStore.selectedPost.created_date }}</span>
                        </div>
                    </div>
                </div>

                <Icon 
                    v-if="$userStore.id === $generalStore.selectedPost.user._id"
                    @click="deletePost()"
                    class="cursor-pointer" 
                    name="material-symbols:delete-outline-sharp"  
                    size="25"
                />
            </div>

            <div class="px-8 mt-4 text-sm">{{ $generalStore.selectedPost.description }}</div>

            <div class="px-8 mt-4 text-sm font-bold">
                <Icon name="mdi:music" size="17"/>
                original sound - {{ $generalStore.allLowerCaseNoCaps($generalStore.selectedPost.user.name) }}
            </div>

            <div class="flex items-center px-8 mt-8">
                <div class="pb-4 text-center flex items-center">
                    <button 
                        @click="isLiked ? unlikePost() : likePost()"
                        class="rounded-full bg-gray-200 p-2 cursor-pointer"
                    >
                        <Icon 
                            name="mdi:heart" 
                            size="25" 
                            :color="isLiked ? '#F02C56' : ''"
                        />
                    </button>
                    <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
                        {{ $generalStore.selectedPost.likes.length }}
                    </span>
                </div>

                <div class="pb-4 text-center flex items-center">
                    <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <Icon name="bx:bxs-message-rounded-dots" size="25"/>
                    </div>
                    <span class="text-xs pl-2 text-gray-800 font-semibold">43</span>
                </div>
            </div>

         
            <div 
                id="CreateComment" 
                v-if="$userStore.id"
                class="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
            >
                <div 
                    :class="inputFocused ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F2]'" 
                    class="bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]"
                >
                    <input 
                        v-model="comment"
                        @focus="inputFocused = true"
                        @blur="inputFocused = false"
                        class="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg" 
                        type="text"
                        placeholder="Add comment..."
                    >
                </div>
                <button
                    :disabled="!comment"
                    @click="addComment()"
                    :class="comment ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'" 
                    class="font-semibold text-sm ml-5 pr-1"
                >
                    Post
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted , ref } from 'vue';
const { $generalStore, $userStore, $profileStore } = useNuxtApp()

const route = useRoute()
const router = useRouter()



let video = ref(null)
let isLoaded = ref(false)
let comment = ref(null)
let inputFocused = ref(false)

onMounted(async () => {
    $generalStore.selectedPost = null
    try {
        const payload = await $generalStore.getPostById(route.params.id)
        $generalStore.setPost(payload.data.data)
    } catch (error) {
        if (error && error.response.status === 400) {
            router.push('/')
        }
    }

   setTimeout(() => video.value.play(), 500)
    // video.value.addEventListener('loadeddata', (e) => {
    //     if (e.target) {
    //         setTimeout(() => {
    //             isLoaded.value = true
    //         }, 500)
    //     }
    // });
})

onBeforeUnmount(() => {
    video.value.pause()
    video.value.currentTime = 0
    video.value.src = ''
})

// watch(() => isLoaded.value, () => {
//     if (isLoaded.value) {
//         setTimeout(() => video.value.play(), 500)
//     }
// })




const isLiked = computed(() => {
    // let res = $generalStore.selectedPost.likes.find(like => like.user_id === $userStore.id)
    // if (res) {
    //     return true
    // }
    // return false
})

const likePost = async () => {
    try {
        await $userStore.likePost($generalStore.selectedPost, true)
    } catch (error) {
        console.log(error)
    }
}

const unlikePost = async () => {
    try {
        await $userStore.unlikePost($generalStore.selectedPost, true)
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async () => {    
    let res = confirm('Are you sure you want to delete this post?')
    try {
        if (res) {
            await $userStore.deletePost($generalStore.selectedPost)
            await $profileStore.getProfile($userStore.id)
            router.push(`/profile/${$userStore.id}`)
        }
    } catch (error) {
        console.log(error)
    }
}

const addComment = async () => {    
    try {
        await $userStore.addComment($generalStore.selectedPost, comment.value)
        comment.value = null
        document.getElementById('Comments').scroll({ top:0, behavior:'smooth' });
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async (post, commentId) => {    
    let res = confirm('Are you sure you want to delete this comment?')
    try {
        if (res) {
            await $userStore.deleteComment(post, commentId)
        }
    } catch (error) {
        console.log(error)
    }
}
</script>




