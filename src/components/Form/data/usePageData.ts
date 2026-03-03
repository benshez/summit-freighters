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

            return visible;
          },
          "isRequired": true,
          "isValid": true,
          "type": "password",
          "cssClass": "w-full px-3 py-2 mb-1 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
        }
      ]
    },
    {
      "name": "register",
      "heading": "Register",
      "path": "/register",
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
            const email: IElement = getElementsById("register", "email");
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
          "isVisibleIf": null,
          "isRequired": true,
          "isValid": true,
          "isValidIf": (): boolean => {
            const password: IElement = getElementsById("register", "password");
            const isValid = password.value !== "";

            return isValid;
          },
          "type": "password",
          "cssClass": "w-full px-3 py-2 mb-1 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
        },
        {
          "id": "confirm_password",
          "label": "Confirm Password",
          "component": "FormInput",
          "value": "",
          "helpText": "Confirm your password.",
          "placeholderText": "Confirm your password",
          "isReadonly": false,
          "isVisible": true,
          "isVisibleIf": null,
          "isRequired": true,
          "isValid": true,
          "isValidIf": (): boolean => {
            const password: IElement = getElementsById("register", "password");
            const confirmPassword: IElement = getElementsById("register", "confirm_password");
            const isValid = confirmPassword.value !== "" && confirmPassword.value === password.value;

            return isValid;
          },
          "type": "password",
          "cssClass": "w-full px-3 py-2 mb-1 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
        }
      ]
    }
  ] as Array<IPage>;

  const getData = (): Array<IPage> => {
    return Pages;
  }

  const getElementsForCurrentPage = (pageName: string,): IPage => {
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

  const handleValidate = (event: Event, element: IElement) => {
    const query = element?.isValidIf || [];
    let isValid: boolean = true;

    if (typeof query === "function") {
      if (isValid) isValid = query();
    }

    element.isValid = isValid;
  }

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

  const handleInput = (route: string, event: Event, element: IElement): void => {
    handleValidate(event, element);
    const elements = getElementsForCurrentPage(route).elements;

    if (validate(element)) {
      //emit("data-input", { id: element.id, value: element.value });
    } else {
      console.log('Not valid!')
    }
  }  

  return {
    getData,
    getElementsForCurrentPage,
    getElementsById,
    handleInput,
    handleDisplay
  }
}