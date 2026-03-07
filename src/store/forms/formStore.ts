import { defineStore, } from "pinia";
import type { IPage, IElement } from "@/interfaces";
import { useRegisterView, useEditView, useLoginView } from "@/store"

export const useFormStore = defineStore("form", {
  state: () => ({
    elementsState: [] as Array<IElement>
  }),
  actions: {
    getElements(route: string) {
      let elements: Array<IElement> = [];

      switch (route) {
        case "edit":
          elements = useEditView().GetElements();
          break;
        case "login":
          elements = useLoginView().GetElements();
          break;
        case "register":
          elements = useRegisterView().GetElements();
          break;
      }

      this.$state.elementsState = elements as Array<IElement>;
    },
    updateElementState(key: string, options: { key: string, value: unknown }) {
      this.$state.elementsState
        .find((el) => {
          if (el.id === key) {
            switch (options.key) {
              case "value":
                el.value = options.value as string;
                break;
              case "isValid":
                el.isValid = options.value as boolean;
                break;
            }
          }
        }
        ) as unknown as IElement;
    },
    handleInput(key: string) {
      this.handleValidate(key);
    },
    handleValidate(key: string) {
      const query: Function = this.$state.elementsState
        .find((el) => {
          if (el.id === key) {
             return el.isValidIf?.apply as Function;
          }
        }) as unknown as Function || undefined;

      let isValid: boolean = true;

      if (query && typeof query === "function") {
        if (isValid) isValid = query();
      }

      this.updateElementState(key, { key: key, value: isValid });
    }
  },
  getters: {
    elements: (state) => state.elementsState
  }

})