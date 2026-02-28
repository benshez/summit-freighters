import type { IElement, IOption, IPage } from "@/interfaces";

export const useFormBuilderComponent = () => {

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
    return {} as IElement;
    //return find(flatten(map(steps, 'elements')), { id: key }) as IElement;
  }

  const isVisible = (element: IElement): boolean => {
    const queries: Array<IOption> = element?.visibleIf || [];

    if (queries.length > 0) {
      queries.forEach((query: IOption) => {
        const parent: IElement = findElementById(query.key.toString())
        element.visible = (parent.value.toLowerCase() === query.value.toString().toLowerCase())
      });
    }

    return element.visible || true
  }

  const handleInput = (element: IElement): void => {
    //handleValidate(emit, element)

    if (element?.visibleIf && element.visibleIf.length > 1) {
      isVisible(element)
    }

    if (validate(element)) {
      //emit("data-input", { id: element.id, value: element.value });
    } else {
      console.log('Not valid!')
    }
  }

  const handleValidate = (emit: any) => {
  }

  const findCurrentPageElements = (pages: Array<IPage>, pageName: string): IPage => {
    const page: IPage = pages.find(item => {
      return item.name === pageName;
    }) as IPage;

    return page;
  }

  return {
    handleInput,
    handleValidate,
    validate,
    isVisible,
    findCurrentPageElements
    //findPageIndex
  }
}