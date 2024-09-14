// import { ModeToggle } from "./components/modeTheme";
import HeroSection from "@/widgets/herosection";
import PorductCard from "@repo/ui/widgets/card.tsx"
import Display from "@repo/ui/widgets/display.tsx";
import Controls from "@repo/ui/widgets/controls.tsx";
import Footer from "@/widgets/footer";
import { Navigation } from "@/widgets/Navigation";
import { CategoryArray } from "./lib/consts";
export default function Home() {
  const data = [
    {
      id: 1,
      name: "MacBook Pro 13",
      prevPrice:1200,
      description:"Mobile phone",
      price: 999.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 2,
      name: "iPhone 13 Pro",
      prevPrice:1200,
      description:"Mobile phone",
      price: 699.99,
      image:
        "https://media.istockphoto.com/id/1309717274/vector/realistic-black-modern-thin-frame-display-computer-monitor-vector-illustration-jpg.jpg?s=612x612&w=0&k=20&c=hWFdkv0V09HqWjqRy2w93ikw2RBAcoxrhXq_9AQsOhQ=",
    },
    {
      id: 3,
      name: "Sony Headphones",
      prevPrice:1200,
      description:"Mobile phone",
      price: 349.99,
      image:
        "https://cdn.mos.cms.futurecdn.net/MfGHFkGhpcwwNQ7VikCkej-1200-80.jpg",
    },
    {
      id: 4,
      name: "Apple Watch Series 7",
      prevPrice:1200,
      description:"Mobile phone",
      price: 399.99,
      image:
        "https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series7-availability_hero_10052021_big.jpg.large.jpg",
    },
    {
      id: 5,
      name: "iPad Air 4",
      prevPrice:1200,
      description:"Mobile phone",
      price: 599.99,
      image:
        "https://www.cultofmac.com/wp-content/uploads/2020/09/CD387101-6D45-4664-A623-7D250668F782.jpeg",
    },
    {
      id: 6,
      name: "AirPods Pro",
      prevPrice:1200,
      description:"Mobile phone",
      price: 249.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 7,
      name: "Seagate Hard Drive",
      prevPrice:1200,
      description:"Mobile phone",
      price: 79.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 8,
      name: "PlayStation 5 Console",
      prevPrice:1200,
      description:"Mobile phone",
      price: 499.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
  ];
  return (
  <>
    <Navigation categoryArray={CategoryArray}/>
    <main className="w-full mx-auto">
      <div className="w-full flex flex-col gap-24 ">
        <div className="">
        <HeroSection className="w-4/6 mt-4 h-96 mx-auto" bgImg="https://images.pexels.com/photos/9255747/pexels-photo-9255747.jpeg" btnLink="google.com" heading="Level Up your style with our summer collections" btnText="shop now "  key={1} />
        <div className="font-medium">
          <div className="p-4 mx-auto w-full lg:max-w-[1400px] ">
            <div className="w-full flex flex-col items-center justify-start p-6">
              <Display/>
              <Controls/>
            </div>
            <div className="w-4/5 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((product) => (
                  <PorductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
    <Footer className="mt-4 rounded-none"/>
  </>
  );
}
