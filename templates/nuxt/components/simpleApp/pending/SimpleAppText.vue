
<template>
    <FieldContainer :hidelabel="hidelabel" v-model="modelValue" :label="label" :description="description" :setting="setting" :instancepath="instancepath" :error="error" #default="slotprops">        
        <InputText v-if="slotprops.error"
            class="simpleapp-inputfield simpleapp-invalid-input"
            :id="slotprops.uuid"
            v-model="modelValue"
            :path="setting.instancepath"
            :type="type"
            :readonly="isReadonly"
         ></InputText>         
         <InputText v-else
            class="simpleapp-inputfield"
            :id="slotprops.uuid"
            v-model="modelValue"
            :path="setting.instancepath"
            :type="type"
            :readonly="isReadonly"
         ></InputText>  
    </FieldContainer>
</template>
<script lang="ts" setup>
import {computed,watch,ref} from 'vue'
import InputText from 'primevue/inputtext';
import FieldContainer from './SimpleAppFieldContainer.vue'
const modelValue = defineModel()
const props = withDefaults( defineProps<{
    label?:string,
    description?:string,
    error?:string,
    setting:any,
    type?:string,
    instancepath?:string,
    hidelabel?: boolean
    readonly?: boolean
}>(),{type:'text'})

// const modelValue = defineModel<{modelValue?:string}>()
// console.log(modelValue.value)
const isReadonly = computed(()=>{
    if(props.readonly){
        return props.readonly
    }else if(props.setting.readonly){
        return props.setting.readonly
    }else{
        return false
    }
})
const emits = defineEmits(['change'])
// const onchange=(e:any)=>{    
//     emits('update:modelValue',e.target.value)
// }


watch(modelValue ,()=>{
    // props.setting.document.validateFailed()
    emits('change',modelValue.value)
})
</script>