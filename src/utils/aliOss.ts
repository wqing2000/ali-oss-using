/* eslint-disable @typescript-eslint/no-unsafe-call */
import OSS from "ali-oss";
import type { StsTokenType } from "../types";

export interface AliOssType {
  filePath: string;
  stsToken: StsTokenType;
  filename?: string;
}

/**
 *
 * @param url 文件名 或 文件链接(最后匹配为文件名)
 * @param sign 默认连接符 .
 * @returns 带有连接符的文件后缀名
 */
export function parseUrl(url: string, sign = ".") {
  const regex = /\.(\w+)(?:\?.*)?$/;
  const match = regex.exec(url);
  if (!match) {
    return ""; // 如果 URL 不匹配正则表达式，则返回 null
  }
  const extension = match[1]; // 文件后缀名是第一个捕获组
  return `${sign}${extension}`;
}

/** ali-oss 获取文件的临时预览链接 */
export function getAliOssPreviewURL(params: AliOssType): string {
  const { filePath, stsToken } = params;

  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "oss-cn-shenzhen",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: stsToken.credentials.accessKeyId,
    accessKeySecret: stsToken.credentials.accessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: stsToken.credentials.securityToken,
    // 填写Bucket名称。
    // bucket: 'qwsaastest'
    bucket: stsToken.bucket,
  });

  // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
  const url = client.signatureUrl(
    // qwsaastest.oss-cn-shenzhen.aliyuncs.com/
    filePath.split(`${stsToken.bucket}.oss-cn-shenzhen.aliyuncs.com/`)[1],
    { expires: 3600 }
  );

  // 设置URL的有效时长。单位为秒。如果不设置有效时长，则默认为1800。以3600秒，expires填写为3600。
  // url = client.signatureUrl('exampleobject.txt', {expires: 3600});
  // console.log(url);

  return url;
}

/** ali-oss 获取文件的临时下载链接 */
export function getAliOssDownloadURL(params: AliOssType): string {
  const { filePath, stsToken, filename } = params;

  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "oss-cn-shenzhen",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: stsToken.credentials.accessKeyId,
    accessKeySecret: stsToken.credentials.accessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: stsToken.credentials.securityToken,
    // 填写Bucket名称。
    // bucket: 'qwsaastest'
    bucket: stsToken.bucket,
  });

  // 配置响应头实现通过URL访问时自动下载文件，并设置下载后的文件名。
  // const filename = 'examplefile.txt'
  // const suffix = filePath

  const extension = parseUrl(filePath);
  const response = {
    "content-disposition": `attachment; filename=${encodeURIComponent(
      `${filename}${extension}`
    )}`,
  };
  // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
  const url = client.signatureUrl(
    // qwsaastest.oss-cn-shenzhen.aliyuncs.com/
    filePath.split(`${stsToken.bucket}.oss-cn-shenzhen.aliyuncs.com/`)[1],
    { response }
  );
  return url;
}
