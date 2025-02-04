'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Home, PackageX, Search, ShoppingBag } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"

export default function ProductNotFound() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-8">
            <PackageX className="h-32 w-32 text-muted-foreground" />
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full p-4">
              <Search className="h-6 w-6" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            We couldn't find the product you're looking for. It might be sold out or no longer available.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-12">
            <Input
              type="search"
              placeholder="Search for watches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/catalog">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Browse Catalog
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}