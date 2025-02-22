import { Unit } from "@prisma/client";

const unitAliases: Record<Unit, string> = {
  GRAM: "g",
  KILOGRAM: "kg",
  MILLILITER: "ml",
  LITER: "l",
  TEASPOON: "tsp",
  TABLESPOON: "tbsp",
  CUP: "cup",
  OUNCE: "oz",
  POUND: "lb",
  MILLIGRAM: "mg",
  PIECE: "pc",
  PINCH: "pinch",
};

export const unitTuple = Object.keys(Unit) as [Unit, ...Unit[]];

export function formatUnit(unit: Unit, format: "short" | "long") {
  return format === "long"
    ? unit[0].toUpperCase() + unit.slice(1).toLowerCase()
    : (unitAliases[unit] ?? unit);
}
