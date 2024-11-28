const page = ({ params }: { params: { category: string; recipe: string } }) => {
  return (
    <div>
      <h1>Recipe: {params.recipe}</h1>
      <p>Category: {params.category}</p>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  );
};

export default page;
