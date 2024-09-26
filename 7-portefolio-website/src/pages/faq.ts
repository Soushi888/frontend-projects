import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-faq")
export class FAQPage extends LitElement {
  render() {
    return html` <h2>F.A.Q Page</h2> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-faq": FAQPage;
  }
}
