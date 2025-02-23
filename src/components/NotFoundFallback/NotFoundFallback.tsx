import { Link } from "@/i18n/routing";

type NotFoundFallbackProps = {
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export const NotFoundFallback = ({
  description = "We couldn't find what you were looking for.",
  buttonLabel = "Return to Home",
  buttonHref = "/",
}: NotFoundFallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 pt-10">
      <h1 className="text-3xl font-bold text-red-500">
        Oops! Something went wrong.
      </h1>
      <p className="mt-2 text-gray-600">{description}</p>
      <Link
        href={buttonHref}
        className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
      >
        {buttonLabel}
      </Link>
    </div>
  );
};
