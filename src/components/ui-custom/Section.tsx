import { cn } from "@/lib/utils";

const Section = ({ className, children }: any) => {
  return <div className={cn("p-4", className)}>{children}</div>;
};

const SectionTitle = ({ className, children }: any) => {
  return (
    <h2 className={cn("my-1 text-2xl font-bold", className)}>{children}</h2>
  );
};

const SectionDescription = ({ className, children }: any) => {
  return (
    <h3 className={cn("mb-2 mt-1 text-sm text-gray-500", className)}>
      {children}
    </h3>
  );
};

const SectionContent = ({ className, children }: any) => {
  return <div className={cn("py-2", className)}>{children}</div>;
};

export { Section, SectionTitle, SectionDescription, SectionContent };
