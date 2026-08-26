import type {Category, ObjectType, OwnershipType, WallMaterial} from "@/types.ts";

 export const objectTypeLabels: Record<ObjectType, string> = {
  house: 'Дом',
  land: 'Участок',
}

export const objectWallMaterial: Record<WallMaterial, string> = {
  brick: 'Кирпич',
  panel: 'Панель',
  monolith: 'Монолит',
  wood: 'Дерево'
}

export const objectCategory: Record<Category, string> = {
  agriculture: 'Сельхозназначение',
  settlement: 'Населенные пункты',
  industrial: 'Промышленное'
}

export const objectOwnershipType: Record<OwnershipType, string> = {
  state: 'Государственная',
  municipal: 'Муниципальная',
  private: 'Частная',
}
