<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import type { StsTokenType } from "./types";
import { getAliOssDownloadURL, getAliOssPreviewURL } from "./utils/aliOss";

const originFileUrl = ref<string>("");
const fileUrl = ref<string>("");

const stsToken = ref({} as StsTokenType); // 需要从接口获取

const getDownloadFileUrl = () => {
  const url = getAliOssDownloadURL({
    filePath: originFileUrl.value,
    stsToken: stsToken.value,
    filename: "下载文件名",
  });

  fileUrl.value = url;
};

const getPreviewFileUrl = () => {
  const url = getAliOssPreviewURL({
    filePath: originFileUrl.value,
    stsToken: stsToken.value,
  });

  fileUrl.value = url;
};
</script>

<template>
  <div>
    <div>
      <button @click="getDownloadFileUrl">获取下载链接</button>
      <button @click="getPreviewFileUrl">获取预览链接</button>
    </div>

    <div>
      <label>链接：{{ fileUrl }}</label>
    </div>

    <div>
      <label>原始链接：{{ originFileUrl }}</label>
    </div>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped></style>
