import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import global from '~/store/global';

let globalModule: global

function initialiseStores(store: Store<any>): void {
    globalModule = getModule(global, store);
}

export { initialiseStores, globalModule }