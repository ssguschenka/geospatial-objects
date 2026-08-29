export type ObjectType = "house" | "land";

export type WallMaterial = "brick" | "panel" | "monolith" | "wood";

export type Category = "agriculture" | "settlement" | "industrial";

export type OwnershipType = "state" | "private" | "municipal";

export type FieldOption = {
  label: string;
  value: string;
};

export type ObjectField = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  required?: boolean;
  mask?: string;
  validation? : {
    pattern?: string,
  };
  options?: FieldOption[];
};

export type ObjectConfigItem = {
  title: string;
  fields: ObjectField[];
};

export type ObjectData = {
  area: number;
  cadastralNumber: string;
  floors?: number;
  wallMaterial?: WallMaterial;
  category?: Category;
  allowedUsage?: string;
  ownershipType?: OwnershipType;
}

export type MapObject = ObjectData & {
  id: string;
  type: ObjectType;
  geometry: string;
  visible: boolean;
}

export type ObjectConfig = Record<ObjectType, ObjectConfigItem>;
