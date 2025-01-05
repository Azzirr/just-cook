export type FormState = {
  message?: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};
