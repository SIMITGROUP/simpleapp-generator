<template>
  <div
    @click="openUploadDialog"
    :title="selectedBase64Img"
    class="vvv place-content-center image-to-base64-uploader rounded-lg border block"
  >
    <ClientOnly>
      <slot name="default">
        <Image v-if="selectedBase64Img" :src="selectedBase64Img" />
        <i v-else class="pi pi-upload text-3xl"></i>
      </slot>

      <Dialog
        v-if="dialogVisible"
        v-model:visible="dialogVisible"
        header="Image Upload"
        :pt="{ root: { class: 'w-4/5' } }"
      >
        <div class="w-full grid grid-cols-2 gap-2">
          <div class="w-7/8 border rounded p-4">
            <TabView lazy>
              <TabPanel :header="t('upload')">
                <div class="upload-container">
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleImageUpload"
                  />
                </div>
              </TabPanel>
              <TabPanel :header="t('webcam')">
                <div class="webcam-container h h-1/6">
                  <WebCamUI :fullscreenState="false" @photoTaken="photoTaken" />
                </div>
              </TabPanel>
            </TabView>
          </div>
          <div id="preview" class="w-7/8 border rounded p-4">
            <Cropper
              v-if="scaledImage"
              ref="cropperInstance"
              :src="scaledImage"
              :stencil-props="{ aspectRatio: 1 }"
              :options="cropperOptions"
              @change="changeChropper"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex flex-row gap-4">
            <ButtonDefault @click="dialogVisible = false">{{
              t("cancel")
            }}</ButtonDefault>
            <ButtonPrimary @click="confirm">{{ t("confirm") }}</ButtonPrimary>
          </div>
        </template>
      </Dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Assuming the Dialog component and Cropper component are globally available or imported in a parent component
// import { defineEmits } from "vue";
import { WebCamUI } from "vue-camera-lib";
import VueCameraLib from "vue-camera-lib";

// import Cropper from 'cropperjs'; // Assuming CropperJS is installed using a package manager
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const selectedBase64Img = ref("");
const cropedBase64Img = ref("");
const dialogVisible = ref(false);
const previewImage = ref<string | null>(null);
const scaledImage = ref<string | null>(null);
// const image = ref<string | null>(null);
const emit = defineEmits<{
  (event: "image-uploaded", imageData: string): void;
}>();

// Use camera reference to call functions
const photoTaken = (data: any) => {
  scaledImage.value = data.image_data_url;
};
const openUploadDialog = () => {
  dialogVisible.value = true;
};

const handleImageUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 400; // Set your desired maximum width
        const maxHeight = 300; // Set your desired maximum height
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        const canvas = document.createElement("canvas");
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        scaledImage.value = canvas.toDataURL("image/jpeg"); // Replace with your preferred format
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// const handleImageUpload = (event) => {
//   const file = event.target.files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       previewImage.value = e.target.result as string;
//       // Initialize Cropper instance automatically
//       // if (cropperInstance.value) {
//       //   cropperInstance.value.replace(previewImage.value); // Update Cropper with new image
//       // }
//     };
//     reader.readAsDataURL(file);
//   }
// };
const changeChropper = (imageEvent: any) => {
  // console.log('changeChropper',imageEvent)
  // if(cropedBase64Img.value==''){
  //   cropedBase64Img.value = imageEvent.image.src
  // }else{
  //   cropedBase64Img.value=''
  // }
};
const cropperInstance = ref();
const cropperOptions = {
  aspectRatio: 16 / 9, // Optional: Set aspect ratio for cropping
  zoomable: true, // Optional: Allow zooming
  movable: true, // Optional: Allow moving the crop area
  viewMode: 1, // Optional: Set initial zoom level
};

const confirm = () => {
  const imgevent = cropperInstance.value.getResult();
  selectedBase64Img.value = imgevent.canvas.toDataURL("image/jpeg");
  emit("image-uploaded", selectedBase64Img.value);

  dialogVisible.value = false;
  resetFileInput(); // Optional: Reset file input value
};

const resetFileInput = () => {
  const fileInput = ref(null);
  if (fileInput.value) {
    fileInput.value = null;
  }
};
</script>
