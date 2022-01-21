export default [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home"),
    meta: {
      layout: "blank",
    },
  },
];
