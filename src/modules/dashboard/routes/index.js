export default [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../views/Dashboard"),
    meta: {
      layout: "content",
    },
  },
];
