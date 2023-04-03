import { useUserStore } from "~/stores/user-store"
import { useProfileStore } from "~/stores/profile-store"
import { useGeneralStore } from "~/stores/general-store"

export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: { 
            userStore: useUserStore(),
            profileStore: useProfileStore(),
            generalStore: useGeneralStore()
        },
    }
})

// Using this by below 
//const {$userStore} = userNuxtApp()