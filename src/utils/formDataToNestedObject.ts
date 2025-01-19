/**
 * Transforms a FormData object into a nested object structure.
 *
 * Useful when handling form submissions where field names represent
 * nested data (e.g., "ingredients.0.name" for arrays/objects).
 *
 */
const buildNestedObject = (entries: { name: string; value: any }[]) => {
  const result: Record<string, any> = {};

  entries.forEach(({ name, value }) => {
    const keys = name.split("."); // Split keys by "."
    let current = result;

    keys.forEach((key, index) => {
      if (!current[key]) {
        current[key] = isNaN(Number(keys[index + 1])) ? {} : []; // Initialize as array if the next key is numeric
      }

      if (index === keys.length - 1) {
        current[key] = value; // Assign value at the deepest level
      } else {
        current = current[key];
      }
    });
  });
  return result;
};

export const formDataToNestedObject = (formData: FormData) => {
  const result: { name: string; value: any }[] = [];

  formData.forEach((value, key) => {
    result.push({ name: key, value });
  });

  return buildNestedObject(result);
};
