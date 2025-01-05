type FormAlertProps = {
  message?: string;
  issues?: string | string[];
};

export const FormAlert = ({ message, issues }: FormAlertProps) => {
  return (
    <div>
      <p className="text-yellow-700">{message}</p>
      <p className="text-red-500">{issues}</p>
    </div>
  );
};
