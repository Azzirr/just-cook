export type FormState = {
  message?: string;
  fields?: Record<string, string>;
  errors?: string[];
  success: boolean;
};
