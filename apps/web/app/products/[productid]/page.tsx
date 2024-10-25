"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryArray } from 'app/lib/consts';
import { Navigation } from '@/widgets/Navigation';

interface ProductDetails {
  brand: string;
  name: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  size: string;
}

export default function ProductDetailsPage({productid}:{productid:string}) {
  const [quantity, setQuantity] = useState(1)
  
  const product: ProductDetails = {
    brand: "UNITED COLORS OF BENETTON",
    name: "United Colors of Benetton Signature Women Black Dial Quartz Analog",
    price: 3995,
    discountedPrice: 3196,
    discountPercentage: 20,
    size: "35 mm"
  }

  return (
<>
    <Navigation categoryArray={CategoryArray}/>
   
    <div className=" w-10/12 mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 my-8">
        <div className="md:w-1/2">
          <img
            src="https://g-iff6oyrytat.vusercontent.net/placeholder.svg?height=500&width=500"
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.brand}</h1>
          <h2 className="text-xl mb-4">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold">₹{product.discountedPrice}</span>
            <span className="text-gray-500 line-through">₹{product.price}</span>
            <span className="text-green-500">{product.discountPercentage}% off</span>
          </div>
          <p className="mb-4">Size: {product.size}</p>
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span>{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button className="w-full mb-4">Buy Now</Button>
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="manufacturer">Manufacturer</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="features">Product features content...</TabsContent>
            <TabsContent value="manufacturer">Manufacturer information...</TabsContent>
            <TabsContent value="shipping">Shipping details...</TabsContent>
            <TabsContent value="support">Customer support information...</TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="my-8">
        <h3 className="text-2xl font-bold mb-4">Related Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardContent className="p-4">
                <img
                  src="https://g-iff6oyrytat.vusercontent.net/placeholder.svg?height=200&width=200"
                  alt={`Related Product ${item}`}
                  width={200}
                  height={200}
                  className="rounded-lg mb-2"
                />
                <h4 className="font-bold">Related Product {item}</h4>
                <p className="text-gray-500">₹3,196</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
</>
  )
}