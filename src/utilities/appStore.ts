import { reactive, readonly, watch, ref } from "vue";
import type { Ref } from "vue";
import expiryLocalStorage from "expiry-localstorage";

export abstract class appStore<T extends Record<string, any>> {
  protected state: T;
  private isInitialized = ref(false);

  constructor(readonly storeName: string) {
    const data = this.data();
    this.state = reactive(data) as T;
  }

  protected abstract data(): T

  public Init = async () => {


    const getUserInfo = async () => {
      const dbRequest = window
        .indexedDB
        .open("firebaseLocalStorageDb")
        .onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const stores = ['firebaseLocalStorage'];
          const tx = db.transaction(stores);
        };

    }

    await getUserInfo();
    
    if (this.isInitialized.value) {

      watch(() => this.state, (value) => {
        expiryLocalStorage.setItem(this.storeName, JSON.stringify(value), 0.5 * 60 * 60 * 1000);
      }, { deep: true });

      this.isInitialized.value = true;
    }
  }

  public ClearState = () => {
    this.state = reactive(this.data()) as T;
    expiryLocalStorage.removeItem(this.storeName);
  }

  public GetState = (): T => {
    const dbState = JSON.parse(expiryLocalStorage.getItem(this.storeName)!) as T;

    if (dbState) {
      Object.assign(this.state, dbState);
    }

    return readonly(this.state) as T;
  }

  public GetIsInitialized = (): Ref<boolean> => {
    return this.isInitialized;
  }
}

