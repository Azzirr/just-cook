import { Button } from "@/components/ui/button";
import Image from "next/image";
import ExampleImage from "@/public/images/example-image.png";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Button>
        <Link href="/categories">Appen Machen</Link>
      </Button>
      <Image
        src={ExampleImage}
        alt="Example description"
        width={300}
        height={300}
      />
    </div>
  );
};

export default Home;
