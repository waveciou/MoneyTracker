interface ICategoriesItem {
  id: string;
  name: string;
}

interface IMainCategoriesItem {
  id: string;
  name: string;
  subcategories: ICategoriesItem[];
}

export type { IMainCategoriesItem, ICategoriesItem };
