import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, Menu, Search, ShoppingBag, ShoppingCart } from "lucide-react"
import Link from "next/link"


export function Navigation({children}:{children: React.ReactNode}) {
  return (
    <header className='flex border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50'>
    <div className='flex flex-wrap items-center lg:gap-y-2 gap-4 w-full'>
      <Link href="/">
        <h1 className="text-xl font-bold">ET-market</h1>
      </Link>
      <div className=' lg:ml-10 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
        <div
          className='lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
          <Button variant="link" className='max-lg:border-b max-lg:py-3 px-3'><Link href='javascript:void(0)'
              className=' block font-semibold'>New</Link></Button>
          <Button variant="link" className='max-lg:border-b max-lg:py-3 px-3'><Link href='javascript:void(0)'
              className=' block font-semibold'>Men</Link></Button>
          <Button variant="link" className='max-lg:border-b max-lg:py-3 px-3'><Link href='javascript:void(0)'
              className=' block font-semibold'>Women</Link></Button>
          <Button variant="link" className='max-lg:border-b max-lg:py-3 px-3'><Link href='javascript:void(0)'
              className=' block font-semibold'>Kids</Link></Button>
        </div>
      </div>
  
      <div className="flex gap-x-6 gap-y-4 ml-auto">
        <div
          className='flex border-2 focus-within:border-gray-400 rounded-full px-6 py-1 overflow-hidden max-w-52 max-lg:hidden'>
          <input type='text' placeholder='Search something...' className='w-full text-sm bg-transparent outline-none border-none  pr-2' />
          <Search />
        </div>
        <div className='flex items-center space-x-8'>
          <span>
            {children}
          </span>
          <span className="relative">
            <Heart />
            <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">0</span>
          </span>
          <span className="relative">
          <ShoppingCart />
            <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">0</span>
          </span>
          <Button size="sm" className='px-5 text-xs pt-1 rounded-full'>
              Sign In
          </Button>
        </div>
      </div>
    </div>
  </header>
  )
}

/**
 * <div className="w-screen border">
      <div className="w-full flex justify-between align-center">
        <h1 className="text-xl font-bold">ET-market</h1>
        <Input type="text" className="rounded-full" placeholder="Search" />
        <DropdownMenu>
          <DropdownMenuTrigger className="p-0"><Button ><Menu className="m-1" />Categories</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div>
        <Button variant="ghost"><ShoppingBag />Orders</Button>
        <Button></Button>
      </div>
    </div>
 */