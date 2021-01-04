export interface IColumn {
  id:
    | "image"
    | "name"
    | "categories"
    | "variants"
    | "sizes"
    | "inStock"
    | "remove"
    | "edit";
  label: string;
  format?: (value: number) => string;
}

const columns: IColumn[] = [
  { id: "image", label: "Image" },
  { id: "name", label: "Name" },
  { id: "categories", label: "Categories" },
  { id: "variants", label: "Variants" },
  { id: "sizes", label: "Sizes" },
  { id: "inStock", label: "In Stock" },
  { id: "remove", label: "Remove" },
  { id: "edit", label: "edit" },
];

export interface IUserColumn {
  id: "name" | "createdAt" | "email" | "ban" | "make-admin";
  label: string;
}

export const userCulumns: IUserColumn[] = [
  { id: "name", label: "Name" },
  { id: "createdAt", label: "Created At" },
  { id: "email", label: "Email" },
  { id: "ban", label: "Ban" },
  { id: "make-admin", label: "Make Admin" },
];

export default columns;
