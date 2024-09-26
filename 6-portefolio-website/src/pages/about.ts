import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-about")
export class AboutPage extends LitElement {
  render() {
    return html` <h2>About Page</h2> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-about": AboutPage;
  }
}
