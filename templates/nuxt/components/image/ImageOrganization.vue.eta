<template>
  <ImageToBase64Uploader
    v-if="changable"
    #default
    :class="`w-${sizenumber} h-${sizenumber} place-content-center bg-white`"
    @image-uploaded="handleBase64"
  >
    <NuxtImg
      class="w-full h-full"
      :key="imageKey"
      provider="myProvider"
      :src="imagepath"
    />
  </ImageToBase64Uploader>
  <div
    v-else
    :class="`inline-block border rounded-lg w-${sizenumber} h-${sizenumber} bg-white`"
  >
    <NuxtImg class="w-full h-full" provider="myProvider" :src="imagepath" />
  </div>
</template>
<script lang="ts" setup>
// import {KeyValue} from ''
const props = defineProps<{
  changable?: boolean;
  orgRecordId?: string;
  size: number;
}>();
const imageKey = ref(0);
const orgRecordId = computed(
  () => props.orgRecordId ?? getUserProfile()?.orgRecordId,
);
const xorgpath= getCurrentXorg() ? `${getCurrentXorg()}/` : 'MC0wLTA/'

const imagepath = `${xorgpath}images/organization/${
  orgRecordId.value
}`;
const sizenumber = props.size ?? 16;
const imageData = ref("");
watch(
  () => props.orgRecordId,
  () => imageKey.value++,
);
const handleBase64 = async (data: string) => {
  const keyvalue = {
    key: "org-" + props.orgRecordId,
    value: data,
  };
  console.log("upload logo ", data);
  const uploadok = await useNuxtApp()
    .$OrganizationDoc()
    .getApi()
    .runUploadlogo(keyvalue);
  if (uploadok) {
    const realpath = `/api/${imagepath}`;
    await fetch(realpath, { cache: "reload", credentials: "include" });
    imageKey.value++;
  }
};
</script>
