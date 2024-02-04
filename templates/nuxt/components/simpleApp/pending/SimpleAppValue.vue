<template>
    <div v-if="schema" :class="fieldcontainerclass">  
        
        <div v-if="hidelabel"></div>
        <label v-else  :for="uuid">{{ fieldlabel }} <span v-if="props.setting.isrequired && fieldlabel" class="input-error">*</span></label>
        
        <div :uuid="uuid" class="simpleapp-value-readonly">{{ modelValue }}</div>


        <small v-if="error" class="input-desc">{{ error }}</small>
        <small v-else class="input-desc">{{ fielddesc }}</small>

        <slot></slot>
    </div>
    <div v-else class="simpleapp-input-container">
        <label class="input-error">wrong path in getField()</label>
        <div class="input-error">{{ props.setting.path }}</div>
    </div>
</template>
<script setup lang="ts">
import {camelCaseToWords} from './helper'
import {computed,watch} from 'vue'
import {ref} from 'vue'
const modelValue = defineModel()
const uuid = randomUUID()
const fieldlabel = ref('')
const fielddesc = ref('')
const defaultcssclass='simpleapp-input-container'
const fieldcontainerclass = ref(defaultcssclass)
let instancepath = ref('')
const props = defineProps<{
    label?: string,    
    description?: string,
    instancepath?:string,
    hidelabel?:boolean,
    // error?:string,
    setting:any
}>()

// console.log('props.setting',props.setting.fieldsetting)
let schema:any 
if(props.setting.fieldsetting && props.setting.fieldsetting.type){
    
    schema = props.setting.fieldsetting
    // console.log("schema setting",props.setting,schema)
    if(props?.instancepath) instancepath.value =props.instancepath
    else if(props.setting?.instancepath) instancepath.value = props.setting.instancepath
    else instancepath.value='/unknown'

    const fieldnamearr = instancepath.value.split('/')
    const fieldname = camelCaseToWords(fieldnamearr[fieldnamearr.length-1])

    if(props.label)fieldlabel.value = props.label 
    else if (schema.title ) fieldlabel.value=schema.title
    else fieldlabel.value=fieldname
    
    if(props.description)fielddesc.value = props.description 
    else if (schema?.description != 'undefined') fielddesc.value=schema.description
    else fielddesc.value=''

   

}
const errormsg = computed(()=>{
    
    props.setting.errors[instancepath.value]
})
const error = ref("")
watch(props.setting.errors,(newvalue,oldvalue)=>{
    //it is array
    error.value=''
    if(newvalue[instancepath.value]){
        const errlist:any[] = newvalue[instancepath.value]
        for(let i=0;i<errlist.length;i++){
            error.value += errlist[i].message +','
        }
        fieldcontainerclass.value=defaultcssclass + ' input-error'
    }else{
        error.value=''
        fieldcontainerclass.value=defaultcssclass
    }
    // console.log("validation result",props.setting.instancepath,)
    // error.value = newvalue[props.setting.instancepath].message
})

</script>
