
export interface StsTokenType {
  assumedRoleUser: {
    arn: string;
    assumedRoleId: string;
  };
  credentials: {
    securityToken: string;
    accessKeySecret: string;
    accessKeyId: string;
    expiration: string;
  };
  bucket: string;
}