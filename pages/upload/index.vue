<template>
<UploadLayout>

    <div class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
        <div>
            <div class="text-[23px] font-semibold">Upload video</div>
            <div class="text-gray-400 mt-1">Post a video to your account</div>
        </div>

        <div class="mt-8 md:flex gap-6">

            <label 
                
                for="fileInput"
                class="
                    md:mx-0
                    mx-auto
                    mt-4
                    mb-6
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    w-full 
                    max-w-[260px] 
                    h-[470px] 
                    text-center 
                    p-3 
                    border-2 
                    border-dashed 
                    border-gray-300 
                    rounded-lg 
                    hover:bg-gray-100 
                    cursor-pointer
                "
            >
                <Icon name="majesticons:cloud-upload" size="40" color="#b3b3b1"/>
                <div class="mt-4 text-[17px]">Select video to upload</div>
                <div class="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</div>
                <div class="mt-12 text-gray-400 text-sm">MP4</div>
                <div class="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</div>
                <div class="mt-2 text-gray-400 text-[13px]">Less than 2 GB</div>
                <div class="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm">
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
                        <Icon class="mr-4" size="20" name="mdi:box-cutter-off"/>
                    </div>
                    <div>
                        <div class="text-semibold text-[15px] mb-1.5">Divide videos and edit</div>
                        <div class="text-semibold text-[13px] text-gray-400">
                            You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into portrait videos
                        </div>
                    </div>
                    <div class="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                        <button class="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
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
                        class="
                            w-full
                            border
                            p-2.5
                            rounded-md
                            focus:outline-none
                        "
                    >
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
                    <div class="text-red-600" >
                       xx
                    </div>
                    <div class="text-red-600">
                       bb
                    </div>
                </div>

            </div>

            </div>


 

            </div>


</UploadLayout>

</template>

<script setup>
import UploadLayout from "~/layouts/UploadLayout.vue"
</script>
