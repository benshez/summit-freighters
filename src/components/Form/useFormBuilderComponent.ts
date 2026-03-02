
import { useRoute } from "vue-router";
import type { IElement, IOption, IPage } from "@/interfaces";
import { usePageData } from "@/components/Form/data//usePageData";

export const useFormBuilderComponent = () => {
  const route = useRoute();

  const validate = (element: IElement): boolean => {
    let isValid = true;

    if (element.isVisible && !element.isReadonly) {
      if (element.isRequired) isValid = (element.value !== "")

      if (isValid) {

      }
    }

    return isValid
  }

  const handleDisplay = (element: IElement): boolean => {
    const query = element?.isVisibleIf || [];
    let display: boolean = element.isVisible || true;

    if (typeof query === "function") {
      if (display) display = query();
    }

    element.isVisible = display;

    return element.isVisible || true
  }

  const handleInput = (event: Event, element: IElement): void => {
    //handleValidate(emit, element)
    const elements = findCurrentPageElements().elements;

    // elements.forEach((e) => {
    //   if (e?.visibleIf && e.visibleIf.length > 0) {
    //     handleDisplay(e);
    //   }
    // })

    if (validate(element)) {
      //emit("data-input", { id: element.id, value: element.value });
    } else {
      console.log('Not valid!')
    }
  }

  const handleValidate = (emit: any) => {
  }

  const findCurrentPageElements = (): IPage => {
    const key: string = route.name as string;
    const pages = usePageData()

    return pages.getData().find(item => {
      return item.name === key;
    }) as IPage;
  }

  return {
    handleInput,
    handleValidate,
    validate,
    handleDisplay,
    findCurrentPageElements
  }
}