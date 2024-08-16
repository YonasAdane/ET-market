import { Button } from "@/components/ui/button";
import { Card } from "@repo/ui/components/ui/card"
import { MoveRight } from "lucide-react";
import Link from "next/link";

type Props = {
  image:string;
  title:string;
  link:string;
}

export default function CategoryCard({image,title,link}: Props) {
  return (
    <Card className='relative w-[250px] h-[250px] rounded-lg flex justify-center items-center group overflow-hidden' >
      <div className=" w-full overflow-hidden ">
        <img
          className=" h-full w-full rounded-lg object-contain transition duration-300 ease-in-out group-hover:scale-105" 
          width={276} height={500} src={image} alt="product-picture"
        />
        
      </div>
        <div className="w-full flex absolute bottom-4 items-end px-6   group-hover:opacity-100 duration-1000">
            <Button asChild variant={"default"} className="w-full  text-sm">
              <Link href={link}>
                Shop {title}<MoveRight className="ml-1" />
              </Link>
            </Button>
        </div >
    </Card>
  )
}