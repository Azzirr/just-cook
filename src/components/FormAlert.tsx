type FormAlertProps = {
  message?: string;
  errors?: string[];
};

export const FormAlert = ({ message, errors }: FormAlertProps) => {
  return (
    <div>
      <p className="text-yellow-700">{message}</p>
      {errors?.map((error) => <p className="text-red-500">{error}</p>)}
    </div>
  );
};
