"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from '@/widgets/Navigation';
import { CategoryArray } from 'app/lib/consts';
import { useState } from 'react';
import { Gallery } from './gallery';

interface ProductDetails {
  brand: string;
  name: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  size: string;
}


interface ProductPageProps {
  params: {
    productid: string;
  };
}

export default function ProductDetailsPage({ params }: ProductPageProps) {  
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
      {/* { images: { src: string; altText: string }[] */}
        <div className="md:w-1/2">
          <Gallery images={[
            {src:    "https://www.justwatches.com/cdn/shop/products/UWUCG0101_1.jpg?v=1639658902&width=1000",altText:"weyo"},
            {src:    "https://www.justwatches.com/cdn/shop/files/TWEG20208.jpg?v=1718772043&width=1000",altText:"weyo1"},
            {src:    "https://www.justwatches.com/cdn/shop/files/Z41002L1MF_7.jpg?v=1709643466&width=1000",altText:"weyo2"},
            {src:    "https://www.justwatches.com/cdn/shop/files/Z39005G3MF_7.jpg?v=1709643209&width=1000",altText:"weyo3"},
            {src:    "https://www.justwatches.com/cdn/shop/files/GW0667L1_1.jpg?v=1709641243&width=1000",altText:"weyo4"},
            {src:    "https://www.justwatches.com/cdn/shop/files/NAPCWS303.jpg?v=1693570172&width=1000",altText:"weyo5"}
          ]}/>

        
          {/* <img
            src=
            "https://g-iff6oyrytat.vusercontent.net/placeholder.svg?height=500&width=500"
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          /> */}
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