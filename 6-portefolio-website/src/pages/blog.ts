import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("lit-blog")
export class BlogPage extends LitElement {
  render() {
    return html` <h2>Blog Page</h2> `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-blog": BlogPage;
  }
}
