<template>
  <div class=" w-full">    
    <div v-for="(b, index) in branchList" :key="index" class="flex flex-col">
      <div>{{ b.branchName }}</div>    
      <div>        
        <SelectButton :options="grouplist" v-model="permdata[b.branchId??0].groups" 
            @update:model-value="updatePermission($event,b.branchId ??0)"
            multiple option-value="value" option-label="label"/>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Branch, Permission, UserPermission } from "~/simpleapp/generate/openapi";
import _ from 'lodash'
const props = defineProps<{ id: string }>();
const perm = useNuxtApp().$PermissionDoc();
const branchList = ref<Branch[]>()
const branch = useNuxtApp().$BranchDoc()
const grouplist = getAllGroups().map((item) => {
  return { value: item, label: _.capitalize(item) };
});
const orgs = ref<UserPermission[]>();
const selectedGroup=ref()
type PermDataType = {[key:number]: {groups?:string[],permId?:string}}
const permdata=ref<PermDataType>({})
const loadBranches = async ()=>{
    branchList.value=await branch.search({
        filter:{orgId:getUserProfile()?.orgId},
        fields:['branchCode','branchName','active','branchId'],
        sorts:[['branchCode','asc']]
    })

    branchList.value?.forEach(b=>{
        const branchId:number = b.branchId ?? 0
        permdata.value[branchId] ={groups:[],permId:''}
    })
}
const loadPermission = async () => {
  const permissions:Permission[] = await perm.search({
    filter:{userId:props.id},
    fields:['groups','userId','uid','branchId']
  })
  console.log("load permissions" , permissions)
  permissions.forEach(p=>{
    console.log("PPP",p)
    if(p.branchId && permdata.value[p.branchId]){
        permdata.value[p.branchId].groups = p.groups ??[]
        permdata.value[p.branchId].permId = p._id
    }
  })
};
const updatePermission = async (newgroups:string[],branchId:number)=>{
    const data =perm.getReactiveData()
    if(permdata.value[branchId] && permdata.value[branchId].permId){        
        await perm.getById(permdata.value[branchId].permId)
    }else{
        data.value._id=randomUUID()
        data.value.userId=props.id     
    }
    data.value.groups=newgroups
    
     
    if(permdata.value[branchId] && permdata.value[branchId].permId){        
        await perm.update()
    }else{
        await perm.create()
    }
    await loadPermission()
}
onMounted(async () => {
    await loadBranches()
    await loadPermission()

});
watch(
  () => props.id,
  async () => {
    await loadPermission()

}
);
</script>
