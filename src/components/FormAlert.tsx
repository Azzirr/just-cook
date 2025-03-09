import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
type FormAlertProps = {
  message?: string;
  errors?: string[];
};

export const FormAlert = ({ message, errors }: FormAlertProps) => {
  return (
    <>
      {message && (
        <Alert variant="information">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {errors &&
        errors.map((error, index) => (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ))}
    </>
  );
};
