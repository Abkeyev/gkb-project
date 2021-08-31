import * as React from "react";
import { Link } from "react-router-dom";
import { Main } from "../containers";

export interface MainProps {}
export interface MainState {}

export class MainPage extends React.Component<MainProps, MainState> {
  render() {
    return <Main />;
  }
}
export default Main;
