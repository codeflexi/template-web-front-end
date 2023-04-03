<template>
  <MainLayout>
    <div>sdfjsldkfjlsdkjfls</div>
    <div @click="logout()">
      <span class="pl-2 font-semibold text-sm">Looo</span>
    </div>

    <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
      <div v-for="post in $generalStore.posts" :key="post._id">
        <PostMain v-if="post" :post="post" />
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MainLayout from "~/layouts/MainLayout.vue";
import PostMain from "~/components/PostMain.vue";
const { $generalStore, $userStore } = useNuxtApp();
onMounted(async () => {
  $generalStore.getAllUsersAndPosts();
  // try {
  //   $generalStore.getAllUsersAndPosts();
  // } catch (error) {
  //   console.log(error);
  // }
});
const logout = () => {
  try {
    $userStore.logout();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
