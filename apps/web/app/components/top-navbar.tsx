"use client"

import Link from "next/link"
import { Button } from "@repo/ui/components/ui/button"
import { Heart, User, ShoppingCart, Zap } from "lucide-react"
import SearchForm from "@/(new)/categories/_components/search-form"
import { useCart} from "../hooks/use-cart"

export default function TopNavbar() {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-background border-b px-6 py-3 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
            TechStore
          </h2>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[480px]">
          <SearchForm />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}