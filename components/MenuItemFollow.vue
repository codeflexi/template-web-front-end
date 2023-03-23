<template>
    <div class="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2">
        <img 
            
            class="rounded-full lg:mx-0 mx-auto" 
            width="35" 
            :src="img"
        >
        <div class="lg:pl-2.5 lg:block hidden">
            <div class="flex items-center">
                <div class="font-bold text-[14px]">
                    Nattapong Mahamart
                </div>
                <div class="ml-1 rounded-full bg-[#58D5EC] h-[14px] relative">
                    <Icon class="relative -top-[7px]" name="teenyicons:tick-small-solid" color="#FFFFFF" size="15"/>
                </div>
            </div>

            <div class="font-light text-[12px] text-gray-600">
                Nattapng M.
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['user'])
const img = "https://media.licdn.com/dms/image/C5603AQF4gbfK8P9eog/profile-displayphoto-shrink_100_100/0/1643778347120?e=1684972800&v=beta&t=AR0Cp2YroE1cl_1X32WwpIkf8-SHR1tL2CBcff98A-8"

</script>