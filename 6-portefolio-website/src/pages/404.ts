import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-404")
export class NotFoundPage extends LitElement {
  render() {
    return html` <h2>404 Error</h2> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-404": NotFoundPage;
  }
}
