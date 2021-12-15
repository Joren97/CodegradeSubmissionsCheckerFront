import https from 'https';
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { NuxtAppOptions } from '@nuxt/types';
import { globalModule } from '~/store';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

let $axios: NuxtAxiosInstance;

export function initializeAxios(
  axiosInstance: NuxtAxiosInstance,
  store: Store<any>,
  app: NuxtAppOptions,
) {
  $axios = axiosInstance;

  $axios.onRequest((config) => {    
    const sessionToken = null;

    if (sessionToken) {
      config.headers.common.Authorization = `Bearer ${sessionToken}`;
    }

    config.httpsAgent = agent;
  });

  $axios.onResponse(() => {    
   });

  $axios.onError((error) => {
      globalModule.setError();    
  });
}

export { $axios };
