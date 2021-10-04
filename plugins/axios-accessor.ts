import { Plugin } from '@nuxt/types';
import { initializeAxios } from '~/utils/api';

const accessor: Plugin = ({ $axios, store, app }) => {
  initializeAxios($axios, store, app);
};

export default accessor;
