
import { useRoute } from "vue-router";
import type { IElement, IOption, IPage } from "@/interfaces";
import pages from "@/components/Form/data/data.json";

export const useFormBuilderComponent = () => {
  const route = useRoute();

  const validate = (element: IElement): boolean => {
    let isValid = true;

    if (element.visible && !element.readonly) {
      if (element.isRequired) isValid = (element.value !== "")

      if (isValid) {

      }
    }

    return isValid
  }

  const findElementById = (key: string): IElement => {
    const elements = findCurrentPageElements().elements;

    return elements.find(item => {
      return item.id === key;
    }) as IElement;
  }

  const handleDisplay = (element: IElement): boolean => {
    const queries: Array<IOption> = element?.visibleIf || [];

    if (queries.length > 0) {
      queries.forEach((query: IOption) => {
        const parent: IElement = findElementById(query.key.toString())
        let display: boolean = (parent.value.toLowerCase() === query.value.toString().toLowerCase());
        switch (query.value.toString()) {
          case "NO_EMPTY":
            display = parent.value.toLowerCase() !== ""
            break;
        }

        element.visible = display;
      });
    }

    return element.visible || true
  }

  const handleInput = (element: IElement): void => {
    //handleValidate(emit, element)
    const elements = findCurrentPageElements().elements;

    elements.forEach((e) => {
      if (e?.visibleIf && e.visibleIf.length > 0) {
        handleDisplay(e);
      }
    })

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


    return pages.pages.find(item => {
      return item.name === key;
    }) as IPage;
  }

  return {
    handleInput,
    handleValidate,
    validate,
    handleDisplay,
    findCurrentPageElements
    //findPageIndex
  }
}