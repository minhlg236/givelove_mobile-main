import { LazyExoticComponent } from "react";
import { RouteProps } from "react-router-dom";

export interface RouteConfig extends Omit<RouteProps, "render"> {
  path: string;
  isPrivate?: boolean;
  accessRole?: any[];
  component: LazyExoticComponent<() => JSX.Element>;
  nestedRoute?: RouteConfig;
}
