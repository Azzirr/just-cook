type FormAlertProps = {
  message?: string;
  errors?: string[];
};

export const FormAlert = ({ message, errors }: FormAlertProps) => {
  return (
    <>
      {message && <p className="text-yellow-700">{message}</p>}
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}
    </>
  );
};
