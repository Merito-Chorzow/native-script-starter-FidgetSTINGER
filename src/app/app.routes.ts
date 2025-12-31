import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "/list", pathMatch: "full" },
  {
    path: "list",
    loadComponent: () =>
      import("./inventory/inventory-list.component").then(
        (m) => m.InventoryListComponent
      ),
  },
  {
    path: "add",
    loadComponent: () =>
      import("./inventory/inventory-add.component").then(
        (m) => m.InventoryAddComponent
      ),
  },
  {
    path: "detail/:id",
    loadComponent: () =>
      import("./inventory/inventory-detail.component").then(
        (m) => m.InventoryDetailComponent
      ),
  },
  {
    path: "about",
    loadComponent: () =>
      import("./about/about.component").then((m) => m.AboutComponent),
  },
];
