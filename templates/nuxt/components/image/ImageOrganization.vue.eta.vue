<template>
  <ImageToBase64Uploader
    v-if="changable"
    #default
    class="w-20 h-20 place-content-center"
    @image-uploaded="handleBase64"
  >
    <Image v-if="imageData!=''" :src="imageData"></Image>
    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M21 10h-2V4h1V2H4v2h1v6H3a1 1 0 0 0-1 1v9h20v-9a1 1 0 0 0-1-1m-7 8v-4h-4v4H7V4h10v14z"/><path fill="black" d="M9 6h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z"/></svg>
  </ImageToBase64Uploader>
  <div v-else class="inline-block border rounded-lg w-20 h-20 bg-white">
    <Image v-if="imageData!=''" :src="imageData"></Image>
    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M21 10h-2V4h1V2H4v2h1v6H3a1 1 0 0 0-1 1v9h20v-9a1 1 0 0 0-1-1m-7 8v-4h-4v4H7V4h10v14z"/><path fill="black" d="M9 6h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z"/></svg>
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
