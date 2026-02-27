import type { AxiosRequestConfig } from "axios";
import type { IConfig } from "@/interfaces";
import { type FirebaseOptions } from "firebase/app";

class appConfiguration implements IConfig {
  AppName: string = "";
  AppTitle: string | undefined;
  ApiBaseUrl: string | undefined;
  AppBaseRoute?: string | undefined;
  CorsDomains: string | undefined;
  AccessToken: string | undefined;
  IsProductionEnvironment: boolean | false;
  IsDevelopmentEnvironment: boolean | false;
  ApiRequestConfig: AxiosRequestConfig | undefined;
  FirebaseConfig: FirebaseOptions | undefined;

  constructor() {
    this.AppTitle = import.meta.env.VITE_APP_TITLE;
    this.AppName = import.meta.env.VITE_APP_NAME;
    this.IsProductionEnvironment = import.meta.env.PROD;
    this.IsDevelopmentEnvironment = import.meta.env.DEV;
    this.ApiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    this.CorsDomains = import.meta.env.VITE_APP_ACCESS_CONTROL_ALLOW_ORIGINS;
    this.AppBaseRoute = import.meta.env.VITE_APP_BASE_ROUTE;
    this.FirebaseConfig = {
      apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
    }
    
    this.GetApiHeaderConfiguration();
  }

  GetApiHeaderConfiguration = (): AxiosRequestConfig => {
    this.ApiRequestConfig = {
      baseURL: this.ApiBaseUrl,
      timeout: 1000,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": this.CorsDomains,
        "X-Custom-Header": "foobar"
      },
      validateStatus: () => true,
    };

    this.SetAuthorizationBearerToken()

    return this.ApiRequestConfig;
  }

  GetFirebaseConfiguration = () => {
    return this.FirebaseConfig;
  }

  SetAuthorizationBearerToken = async (token: string = ""): Promise<void> => {
    if (token && token !== "") {
      Object.assign(this.ApiRequestConfig?.headers as object, { "Authorization": `Bearer ${token}` });
    }
  }

}

export const configuration = new appConfiguration();