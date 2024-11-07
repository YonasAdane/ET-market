import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {ChevronLeft, ChevronRight } from "lucide-react"
import BannerSwiper from "@/widgets/banner-swiper"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/widgets/Navigation"
import { CategoryArray } from "app/lib/consts"
import Footer from "@/widgets/footer"
import { watches } from "./sample-product"
import PorductCard from "@/widgets/card"
import ThumbinailSlider from "@/widgets/slide"
import NewArivals from "@/widgets/slide"

export default function Component() {
  const navItems = ["Brands", "Men", "Women", "Jewelry", "Luxury", "Stores", "Sale", "Blog"]
  const trendingNow = [
    {
      id: 1,
      name: "Philipp Plein - The Skull",
      image: "https://www.justwatches.com/cdn/shop/files/PP---Skull.jpg?v=1719551287&width=1200",
    },
    {
      id: 2,
      name: "Guess - Dress",
      image: "https://www.justwatches.com/cdn/shop/files/GUESS_6e1aa606-2897-4a08-a495-7fd5789dfbeb.jpg?v=1719551326&width=1200",
    },
    {
      id: 3,
      name: "Versace - Medusa",
      image: "https://www.justwatches.com/cdn/shop/files/VERSACE_10501501-dd8e-43a9-a1b9-94dea266b9e2.jpg?v=1719551363&width=1200",
    },
  ]

  const showcaseWatches = [
    {
      id: 1,
      name: "Red-faced watch with black leather strap",
      image: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 2,
      name: "Minimalist white watch with metal mesh strap",
      image: "/placeholder.svg?height=500&width=500",
    },
  ]

  const popularCategories = [
    "Leather Strap",
    "Automatic Watches",
    "Chronograph Watches",
    "Round Dial Watches",
    "Gold Dial",
  ]
  const features = [
    { icon: "target", text: "No Cost EMI above 7k" },
    { icon: "truck", text: "Ship in 24 hours" },
    { icon: "shield", text: "1 yr Warranty" },
    { icon: "credit-card", text: "COD available upto 25k" },
    { icon: "percent", text: "10% off on 1st purchase Use 'WELCOME10'" },
  ]



  return (
    <div className="flex min-h-screen flex-col">
      <Navigation categoryArray={CategoryArray}/>
      <main className="flex-1">
        <BannerSwiper/>
        <section className="border-b py-8 text-muted-foreground bg-[#0c0c0e]">
          <div className="container grid grid-cols-2 gap-4 px-4 md:grid-cols-5">
            {features.map((feature, index) => (
              
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-2 h-12 w-12 rounded-full bg-primary/10" />
                <p className="text-sm">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>
        <NewArivals/>
        <section className="py-12 w-5/6 mx-auto">
          <div className="container px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trending Now</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {trendingNow.map((product) => (
                <div key={product.id} className="relative overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-[400px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer className="mt-4 rounded-none"/>

    </div>
  )
}