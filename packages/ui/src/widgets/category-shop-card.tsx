import { Card } from "@/components/ui/card"
import Link from "next/link"

type Props = {
    image:string;
    title:string;
    link:string;
  }
export default function CategoryShopCard({image,title,link}: Props) {
  return (
    <Card className="w-48 h-fit p-0">
        <Link href={link}>
            <img 
            loading="lazy" 
            src={image} 
            alt="" 
            className="w-full h-auto rounded-lg" 
            width="290" 
            height="290" />
            <p className="text-center text-muted-foreground">{title}</p>
        </Link>
    </Card>
  )
}