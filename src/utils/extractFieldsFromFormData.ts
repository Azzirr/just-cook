export function extractFieldsFromFormData(
  formData: FormData,
): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const key of formData.keys()) {
    fields[key] = formData.get(key)?.toString() || "";
  }
  return fields;
}
