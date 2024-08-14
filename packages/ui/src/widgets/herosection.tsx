import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
    bgImg:string;
    heading:string;
    className?:string;
    btnText?:string;
    btnLink:string;
}

export default function HeroSection({bgImg,heading,className,btnLink,btnText}: Props) {
  return (
    <div className={cn('relative w-full rounded-xl overflow-hidden bg-cover',className)} >
        <Image className="w-full" src={bgImg} alt="HeroBG"  width="949" height="632"/>
        <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
            <h1 className='font-bold drop-shadow-2xl bg-transparent w-3/4 text-center text-5xl'>{heading}</h1>
            {btnText && 
            <Button className="m-6" size="lg" asChild>
                <Link href={btnLink}>{btnText}</Link>
            </Button>}
        </div>
    </div>
  )
}