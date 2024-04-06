<template>
  <ImageToBase64Uploader
    v-if="changable"
    #default
    class="w-20 h-20 place-content-center"
    @image-uploaded="handleBase64"
  >
    <Image :src="imageData"></Image>
  </ImageToBase64Uploader>
  <div v-else class="inline-block border rounded-lg w-20 h-20">
    <Image :src="imageData"></Image>
  </div>
</template>
<script lang="ts" setup>
// import {KeyValue} from ''
const props = defineProps<{
  changable: boolean;
}>();
const imageData = ref("");
const handleBase64 = async (data: string) => {
  const keyvalue = {
    key: "organizationLogo",
    value: data,
  };
  
  const uploadok = await useNuxtApp()
    .$OrganizationDoc()
    .getApi()
    .runUploadlogo(keyvalue);
  if (uploadok) {
    await loadLogo();
  }
};
const loadLogo = async () => {
  await refreshOrgLogo();
  imageData.value = getOrgLogo();  
};

onMounted(async () => await loadLogo());
</script>
