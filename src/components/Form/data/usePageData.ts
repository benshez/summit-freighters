import type { IPage, IElement } from "@/interfaces";

export const usePageData = () => {
  const Pages = [
    {
      "name": "login",
      "heading": "Login",
      "path": "/login",
      "requiresAuthenticaton": true,
      "elements": [
        {
          "id": "email",
          "label": "Email",
          "component": "FormInput",
          "value": "",
          "helpText": "Enter your username/email.",
          "placeholderText": "Username/Email",
          "isReadonly": false,
          "isVisible": true,
          "isVisibleIf": [],
          "isRequired": true,
          "isValid": true,
          "isValidIf": (): boolean => {
            const email: IElement = getElementsById("login", "email");
            email.isValid = email.value !== ""; 

            return email.isValid;
          },
          "type": "email",
          "cssClass": "w-full px-3 py-2 mb-1 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
        },
        {
          "id": "password",
          "label": "Password",
          "component": "FormInput",
          "value": "",
          "helpText": "Enter your password.",
          "placeholderText": "Password",
          "isReadonly": false,
          "isVisible": true,
          "isVisibleIf": (): boolean => {
            const email: IElement = getElementsById("login", "email");
            const query = email?.isValidIf || null;
            let visible: boolean = true;

            if (typeof query === "function") {
              if (visible) visible = query();
            }

            return  visible;
          },
          "isRequired": true,
          "isValid": true,
          "type": "password",
          "cssClass": "w-full px-3 py-2 mb-1 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
        }
      ]
    }
  ] as Array<IPage>;

  const getData = (): Array<IPage> => {
    return Pages;
  }

  const getElementsForCurrentPage = (pageName: string,) => {
    return getData().find(item => {
      return item.name === pageName;
    }) as IPage;
  }

  const getElementsById = (pageName: string, elementId: string): IElement => {
    const elements = getElementsForCurrentPage(pageName).elements;

    return elements.find(item => {
      return item.id === elementId;
    }) as IElement;
  }

  return {
    getData,
    getElementsForCurrentPage,
    getElementsById
  }
}