import Handlebars from "handlebars";

export const render = (template, params) => Handlebars.compile(template)(params);
