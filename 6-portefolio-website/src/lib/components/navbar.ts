import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("nav-bar")
export class NavBar extends LitElement {
  render() {
    return html`
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a> |
        <a href="/blog">Blog</a> | <a href="/contact">Contact</a> |
        <a href="/faq">F.A.Q</a>
      </nav>
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
    "nav-bar": NavBar;
  }
}
