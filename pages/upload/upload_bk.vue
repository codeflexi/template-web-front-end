<template>
  <UploadLayout>
    <div
      class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4"
    >
      <div>
        <div class="text-[23px] font-semibold">Upload video</div>
        <div class="text-gray-400 mt-1">Post a video to your account</div>
      </div>

      <div class="mt-8 md:flex gap-6">
        <label
          for="fileInput"
          class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <Icon name="majesticons:cloud-upload" size="40" color="#b3b3b1" />
          <div class="mt-4 text-[17px]">Select video to upload</div>
          <div class="mt-1.5 text-gray-500 text-[13px]">
            Or drag and drop a file
          </div>
          <div class="mt-12 text-gray-400 text-sm">MP4</div>
          <div class="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</div>
          <div class="mt-2 text-gray-400 text-[13px]">Less than 2 GB</div>
          <div
            class="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm"
          >
            Select file
          </div>
          <input
            ref="file"
            type="file"
            id="fileInput"
            @input="onChange"
            hidden
            accept=".mp4"
          />
        </label>

        <div class="mt-4 mb-6">
          <div class="flex bg-[#F8F8F8] py-4 px-6">
            <div>
              <Icon class="mr-4" size="20" name="mdi:box-cutter-off" />
            </div>
            <div>
              <div class="text-semibold text-[15px] mb-1.5">
                Divide videos and edit
              </div>
              <div class="text-semibold text-[13px] text-gray-400">
                You can quickly divide videos into multiple parts, remove
                redundant parts and turn landscape videos into portrait videos
              </div>
            </div>
            <div
              class="flex justify-end max-w-[130px] w-full h-full text-center my-auto"
            >
              <button
                class="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm"
              >
                Edit
              </button>
            </div>
          </div>

          <div class="mt-5">
            <div class="flex items-center justify-between">
              <div class="mb-1 text-[15px]">Caption</div>
              <div class="text-gray-400 text-[12px]">xxx/150</div>
            </div>
            <input
              v-model="caption"
              maxlength="150"
              type="text"
              class="w-full border p-2.5 rounded-md focus:outline-none"
            />
          </div>

          <div class="mt-2  bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white ">
              ขนาดปก
            </h3>
            <ul
              class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
              >
                <div class="flex items-center pl-3">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value=""
                    name="list-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="horizontal-list-radio-license"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >ปกธรรมดา
                  </label>
                </div>
              </li>
              <li
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
              >
                <div class="flex items-center pl-3">
                  <input
                    id="horizontal-list-radio-id"
                    type="radio"
                    value=""
                    name="list-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="horizontal-list-radio-id"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >ปกแหลม</label
                  >
                </div>
              </li>
              <li
                class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
              >
                <div class="flex items-center pl-3">
                  <input
                    id="horizontal-list-radio-millitary"
                    type="radio"
                    value=""
                    name="list-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="horizontal-list-radio-millitary"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >ปกกล้วยหอม</label
                  >
                </div>
              </li>
              <li class="w-full dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="horizontal-list-radio-passport"
                    type="radio"
                    value=""
                    name="list-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="horizontal-list-radio-passport"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >ไม่มีปก</label
                  >
                </div>
              </li>
            </ul>
          </div>

<div class = "mt-2 bg-white shadow-lg rounded-md py-6 md:px-10 px-4">

    <div class="flex">
        <div class="flex items-center mr-4">
            <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 1</label>
        </div>
        <div class="flex items-center mr-4">
            <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
        </div>
        <div class="flex items-center mr-4">
            <input checked id="inline-checked-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-checked-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline checked</label>
        </div>
        <div class="flex items-center">
            <input disabled id="inline-disabled-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="inline-disabled-radio" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Inline disabled</label>
        </div>
    </div>
    
</div>

          <div class="flex gap-3">
            <button
              @click="discard()"
              class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
            >
              Discard
            </button>
            <button
              @click="createPost()"
              class="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm"
            >
              Post
            </button>
          </div>

          <div v-if="errors" class="mt-4">
            <div class="text-red-600">xx</div>
            <div class="text-red-600">bb</div>
          </div>
        </div>
      </div>
    </div>
  </UploadLayout>
</template>

<script setup>
import UploadLayout from "~/layouts/UploadLayout.vue";
</script>
