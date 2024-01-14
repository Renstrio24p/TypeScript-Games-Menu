import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from 'react-dom/client';

declare global {

  interface Window {
    React: typeof React;
    ReactDOM: typeof ReactDOM;
  }

  declare module "*";

  declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }

  declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
  }

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

window.React = React;
window.ReactDOM = ReactDOM;

declare module 'require-context' {
  function requireContext(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ): {
    keys(): string[];
    <T>(id: string): T;
  }

  export = requireContext;
}
