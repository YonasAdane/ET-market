// import { ModeToggle } from "./components/modeTheme";

// import { ModeToggle } from "@repo/ui/widgets/modeToggle.tsx";
import PorductCard from "@repo/ui/widgets/card.tsx"
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
      name: "Sony Noise Cancelling Headphones",
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
      name: "Seagate External Hard Drive",
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
    {
      id: 9,
      name: "Fitbit Charge 5",
      prevPrice:1200,
      description:"Mobile phone",
      price: 179.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 10,
      name: "Canon EOS R5 Camera",
      prevPrice:1200,
      description:"Mobile phone",
      price: 3799.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 11,
      name: "Bose Bluetooth Speaker",
      prevPrice:1200,
      description:"Mobile phone",
      price: 299.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 12,
      name: "HP OfficeJet Pro Printer",
      prevPrice:1200,
      description:"Mobile phone",
      price: 229.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 13,
      name: "Dell 4K Monitor",
      prevPrice:1200,
      description:"Mobile phone",
      price: 629.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 14,
      name: "Logitech Wireless Keyboard",
      prevPrice:1200,
      description:"Mobile phone",
      price: 99.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 15,
      name: "Razer Gaming Mouse",
      prevPrice:1200,
      description:"Mobile phone",
      price: 69.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 16,
      name: "Philips Smart Bulb Kit",
      prevPrice:1200,
      description:"Mobile phone",
      price: 199.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 17,
      name: "North Face Recon Backpack",
      prevPrice:1200,
      description:"Mobile phone",
      price: 99.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 18,
      name: "Anker Portable Charger",
      prevPrice:1200,
      description:"Mobile phone",
      price: 49.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 19,
      name: "AmazonBasics Lightning Cable",
      prevPrice:1200,
      description:"Mobile phone",
      price: 12.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 20,
      name: "Logitech HD Webcam",
      prevPrice:1200,
      description:"Mobile phone",
      price: 69.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 21,
      name: "Linksys Wi-Fi Router",
      prevPrice:1200,
      description:"Mobile phone",
      price: 149.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 22,
      name: "SanDisk SDXC Memory Card",
      prevPrice:1200,
      description:"Mobile phone",
      price: 34.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 23,
      name: "Samsung USB Flash Drive",
      prevPrice:1200,
      description:"Mobile phone",
      price: 24.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 24,
      name: "Logitech Gaming Mouse",
      prevPrice:1200,
      description:"Mobile phone",
      price: 79.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
    {
      id: 25,
      name: "AmazonBasics HDMI Cable",
      prevPrice:1200,
      description:"Mobile phone",
      price: 8.99,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
    },
  ];
  
  return (
    <main className="w-full mx-auto">
      <div className="w-full flex flex-col gap-24 ">
        <div className="bg-green-400">

        hello world!
        <div className="font-medium">
          <div className="p-4 mx-auto w-full lg:max-w-[1400px] ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((product) => (
                <PorductCard {...product} />
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
