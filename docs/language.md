# Introduction

To support multiple language in simpleapp project, you shall understand basic ideal of:
1. i18n
2. file & folder structures related to languages 
3. how to use language key in source code

# i18n
Simpleapp generator use @nuxt/i18n page, you can learn basic ideal from it

# file & folders
After project initialize correctly, everything is preconfigure as nuxt3 i18n practises. However, you shall know
1. you shall define all default language key/message in `project-root/lang/default.json`, it will later copy into `frontend/lang/df.ts`.
2. `fontend/lang/df.ts` consider as "unpolish" language file, will be override every time to frontend code regenerate, you shall maintain all language key as (1)
3. after project completed, developer may pass `frontend/lang/df.ts` to suitable person (or chatgpt) to create proper `en.ts`, `cn.ts`
4. put after translated file (`en.ts, cn.ts,...`) into `frontend/lang`

# how to use language key
in source code, just use syntax `t('yourkey')`, it will auto pick correct language file and language key