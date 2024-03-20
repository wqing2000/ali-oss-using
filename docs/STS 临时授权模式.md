## STS 临时授权模式

> 为保证资源的安全性，文件下载使用 STS 临时授权模式访问，前端将无法通过后端返回的 HTTP 链接 直接访问，需要先通过 临时授权接口 获取 临时授权码（目前配置过期时间为 1 小时，过期后需要重新获取），再通过 阿里云 OSS 相关 SDK 携带授权信息访问资源。

1. 授权模式

   ![sts](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/8213221261/p273744.jpg)

2. 原有上传接口 /upload/file 增加参数  isPublic=false

   

3. 下载资源前，请求获取临时访问凭证接口

   ```
   /sts/token
   
   HTTP GET
   
   响应样例：
   {
       "code": 0,
       "msg": "成功",
       "data": {
           "requestId": "89C246C2-7B90-585C-8D5C-9CDDF8A2D650",
           "credentials": {
               "securityToken": "CAIS+gJ1q6Ft5B2yfSjIr5bgOurztK9I3LieTn7Xqk0bR7tDloTDpTz2IHhOendtBegWtPQ3lGxQ5/oSlqp8V5Yd+P1W+CopvPpt6gqET9frBKXXhOV2iP/IMGyXDAGBk622Su7lTdTbV+6wYlTf7EFayqf7cjPQOD7ANoaS26Z6cvMdXASzcUAYZrFsKxBltdUROFbIKP+pKWSKuGfLC1dysQcO+wEP4K+kkMqH8Uic3h+o0/AOro3qPpW/c44uTpcdPv6x2OtpDOWjtAdb9xlN8opvkaVA4k2pl9qBAl5XkXLkVu3P6Y9AIRNebKo3ELI+8pqar/BjvfHJnIna0gtEOfovMx7SX4e92sDJapHLRt8ybuT8IG+fkILNZIDqqAotem4WLx8NOfhZcyIgUUV2G2+EcPH5qQyQOz3OEfbVjPsEtrNu1Ejt8NawIFyCfq6Uyy5wOOVnNxl2aUNKhTy7IvdWL1QdLwN9ZaycSIJodwxTsr/4OMFC56yrQRsagAFhkNmyATOsTtBFO70Xyp0VQqGAxufkVMNraBlFbA5IivxFiYGDvUzxXNpPX8w0LRCJBE7uodfGyYaH9S8sqHUJnoHpfqOasC1GaKWWjs9dvO+J7idJS9ld7kyL1ZqxklQleAzPgCQohS4w2+JCqcA3seRCDIKNhr8a2l4sb6Jqwg==",
               "accessKeySecret": "5ewTBC2wz1cEjZ6yfHcpANgg6AntHAcDn5J6eaxNm8nj",
               "accessKeyId": "STS.NUUqPGYpikzuLXfNMNK4oyAhG",
               "expiration": "2023-06-09T10:40:53Z"
           },
           "assumedRoleUser": {
               "arn": "acs:ram::1580129662669421:role/ramosstest/gta",
               "assumedRoleId": "302665408280840948:gta"
           }
       },
       "success": true
   }
   ```

   

4. 使用 阿里云OSS SDK 来访问资源

   > [Browser.js授权访问 (aliyun.com)](https://help.aliyun.com/document_detail/120092.htm?spm=a2c4g.100624.0.0.6dd34b786OAcWa#section-iy3-bfe-7mn)

5. 阿里云相关文档

   [使用STS临时访问凭证访问OSS (aliyun.com)](https://help.aliyun.com/document_detail/100624.html?spm=a2c4g.31815.0.i2)

