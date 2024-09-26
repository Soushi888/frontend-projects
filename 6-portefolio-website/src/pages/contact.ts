import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-contact")
export class ContactPage extends LitElement {
  render() {
    return html` <h2>Contact Page</h2> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-contact": ContactPage;
  }
}
