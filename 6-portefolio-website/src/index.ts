// index.ts
import { Router } from "@vaadin/router";
import "./app"; // Adding the lit-app component here for better performance

console.log("Hello from index.ts");

const routes = [
  {
    path: "/",
    component: "lit-app",
    children: [
      {
        path: "",
        component: "lit-home",
        action: async () => {
          await import("./pages/home");
        },
      },
      {
        path: "about",
        component: "lit-about",
        action: async () => {
          await import("./pages/about");
        },
      },
      {
        path: "blog",
        component: "lit-blog",

        action: async () => {
          await import("./pages/blog");
        },
      },
      {
        path: "contact",
        component: "lit-contact",
        action: async () => {
          await import("./pages/contact");
        },
      },
      {
        path: "faq",
        component: "lit-faq",
        action: async () => {
          await import("./pages/faq");
        },
      },
      {
        path: "(.*)",
        component: "lit-404",
        action: async () => {
          await import("./pages/404");
        },
      },
    ],
  },
];

const outlet = document.getElementById("outlet");
export const router = new Router(outlet);
router.setRoutes(routes);
