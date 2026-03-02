import { useRoute } from "vue-router";
import type { IPage, IElement } from "@/interfaces";

export const usePageData = () => {
  const route = useRoute();
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
          "readonly": false,
          "visible": true,
          "visibleIf": [],
          "isRequired": true,
          "isValid": true,
          "type": "email",
          "cssClass": "w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
          "validators": [
            {
              "type": "expression"
            }
          ]
        },
        {
          "id": "password",
          "label": "Password",
          "component": "FormInput",
          "value": "",
          "helpText": "Enter your password.",
          "placeholderText": "Password",
          "readonly": false,
          "visible": true,
          "visibleIf": [(): boolean => {
            const element: IElement = getElementsById("email");
            return element.value !== "";
          }, (): boolean => {
            const element: IElement = getElementsById("email");
            return element.isValid || true;
          },
          ],
          "isRequired": true,
          "isValid": true,
          "type": "password",
          "cssClass": "w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
          "validators": [
            {
              "type": "expression"
            }
          ]
        }
      ]
    }
  ] as Array<IPage>;

  const getData = (): Array<IPage> => {
    return Pages;
  }

  const getDataForCurrentPage = () => {
    const key: string = route.name as string;

    return getData().find(item => {
      return item.name === key;
    }) as IPage;
  }

  const getElementsById = (key: string): IElement => {
    const elements = getDataForCurrentPage().elements;

    return elements.find(item => {
      return item.id === key;
    }) as IElement;
  }

  return {
    getData,
    getDataForCurrentPage,
    getElementsById
  }
}