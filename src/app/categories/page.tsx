import Link from "next/link";

const page = () => {
  const categories = ["desserts", "main-dishes", "appetizers"];

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/categories/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
