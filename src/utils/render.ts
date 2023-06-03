import Handlebars from "handlebars";

export const render = (
  template: string,
  params: {
    [key: string]: string;
  }
) => Handlebars.compile(template)(params);
