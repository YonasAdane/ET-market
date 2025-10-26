"use client"
import { Button } from '@repo/ui/components/ui/button'
import { useState } from 'react'

function Quantity() {
    const [quantity, setQuantity] = useState(1)

  return (
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
  )
}

export default Quantity