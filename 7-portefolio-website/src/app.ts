import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./lib/components/navbar";

@customElement("lit-app")
export class App extends LitElement {
  render() {
    return html`
      <header>
        <nav-bar></nav-bar>
      </header>

      <slot></slot>
    `;
  }

  static styles = css`
    nav {
      display: flex;
      gap: 2rem;
      justify-content: space-evenly;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-app": App;
  }
}
