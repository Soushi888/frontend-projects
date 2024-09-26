import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-home")
export class HomePage extends LitElement {
  render() {
    return html` <h2>Home Page</h2> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-home": HomePage;
  }
}
