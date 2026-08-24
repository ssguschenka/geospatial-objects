export type ObjectType = "house" | "land";

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

export type ObjectConfig = Record<ObjectType, ObjectConfigItem>;
