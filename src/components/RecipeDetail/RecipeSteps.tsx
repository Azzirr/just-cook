type Props = {
  steps: string[];
};

export const RecipeSteps = ({ steps }: Props) => {
  return (
    <section className="mt-4">
      <h2 className="mb-3">Steps</h2>
      <ol className="list-inside list-decimal marker:text-lg marker:font-bold">
        {steps.map((step, index) => (
          <li key={index} className="mb-2 pl-5 -indent-5">
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
};
