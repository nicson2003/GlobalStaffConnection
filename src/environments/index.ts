export interface Environment {
  apiBaseUrl: string;
}

export type EnvType = 'development' | 'staging' | 'uat' | 'production' | 'sit' | 'cit';

export const env: EnvType = 'development';
import environmentDevelopment from "./environment.development";
export default environmentDevelopment as Environment;
