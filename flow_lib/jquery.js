declare module "jquery" {
  declare function $(element: Element | string): any;

  declare function ajax(settings: ?Object): Promise<Object>;
  declare function ajax(url: string, settings: ?Object): Promise<Object>;

  declare function param(obj: OBJECT_OR_ARRAY, traditional: ?boolean): string;
}

var $ = require('$').$;
