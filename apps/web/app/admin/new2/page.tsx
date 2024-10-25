"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@repo/ui/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight, CircleAlert, EllipsisVertical, FilePenLine, Settings, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea';

export default function PRoduct() {
  return (
<div className='h-screen'>
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
            <div className="mb-4">
                <nav className="flex mb-5" aria-Label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                        <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <a href="#" className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">E-commerce</a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Products</span>
                        </div>
                    </li>
                    </ol>
                </nav>
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All products</h1>
            </div>
            <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <div className="flex items-center mb-4 sm:mb-0">
                    <form className="sm:pr-3" action="#" method="GET">
                        <Label htmlFor="products-search" className="sr-only">Search</Label>
                        <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                            <Input type="text" name="email" id="products-search" placeholder="Search for products"/>
                        </div>
                    </form>
                    <div className="flex items-center w-full sm:justify-end">
                        <div className="flex pl-2 space-x-1">
                            <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <Settings />
                            </a>
                            <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <Trash2 />
                            </a>
                            <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <CircleAlert />
                            </a>
                            <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <EllipsisVertical />
                            </a>
                        </div>
                    </div>
                </div>
                
                <Sheet>
                    <SheetTrigger asChild>
                        <Button   >
                            Add new product
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='overflow-auto'>
                        <SheetHeader>
                            <SheetTitle>New Product</SheetTitle>
                          
                        </SheetHeader>
                        <div >
                            <form action="#">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name" >Name</Label>
                                        <Input type="text" name="title" id="name"  placeholder="Type product name" required />
                                    </div>

                                    <div>
                                        <Label htmlFor="price" >Price</Label>
                                        <Input type="number" name="price" id="price" className="" placeholder="$2999" required/>
                                    </div>
                                    <div>
                                        <Label htmlFor="category-create" >Technology</Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectLabel>Select category</SelectLabel>
                                                <SelectItem value="FL">Flowbite</SelectItem>
                                                <SelectItem value="RE">React</SelectItem>
                                                <SelectItem value="AN">Angular</SelectItem>
                                                <SelectItem value="VU">Vue</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</Label>
                                        <Textarea id="description" rows={4}  placeholder="Enter event description here"></Textarea>
                                    </div>
                                    <div>
                                        <Label htmlFor="discount-create" className="">Discount</Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="No" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectLabel>No</SelectLabel>
                                                <SelectItem value="5">5%</SelectItem>
                                                <SelectItem value="10">10%</SelectItem>
                                                <SelectItem value="20">20%</SelectItem>
                                                <SelectItem value="30">30%</SelectItem>
                                                <SelectItem value="40">40%</SelectItem>
                                                <SelectItem value="50">50%</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                        <SheetFooter>
                            <div className="pt-5 flex justify-center w-full pb-4 mt-4 space-x-4 ">
                                <Button  >
                                            Add product
                                        </Button>      
                                <SheetClose asChild>
                                <Button variant={"outline"}>
                                            <X />                                           
                                            Cancel
                                        </Button>
                                </SheetClose>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </div>
    <div className="flex flex-col">
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <Input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" />
                                        <Label htmlFor="checkbox-all" className="sr-only">checkbox</Label>
                                    </div>
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Product Name
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Technology
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Description
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    ID
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Price
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Discount
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {/* {{< products.inline >}}
                            {{- range (index $.Site.Data "products") }} */}
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-{{ .id }}" aria-describedby="checkbox-1" type="checkbox"
                                            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                                        <Label htmlFor="checkbox-{{ .id }}" className="sr-only">checkbox</Label>
                                    </div>
                                </td>
                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                                        {/* {{ .name }} */}ASDE
                                    </div>
                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {/* {{ .category }} */}
                                    </div>
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {/* {{ .technology }} */}
                                </td>
                                <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                                    {/* {{ .description }} */}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">#
                                    {/* {{ .id }} */}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {/* {{ .price }} */}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {/* {{ .discount }} */}
                                </td>

                                <td className="p-4 space-x-2 whitespace-nowrap">
                                    
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button  >
                                                <FilePenLine size={18} />Update
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent className='overflow-auto'>
                                            <SheetHeader>
                                                <SheetTitle>Update Product</SheetTitle>
                                                <SheetDescription>
                                                    Make changes to your profile here. Click save when you're done.
                                                </SheetDescription>
                                            </SheetHeader>
                                                <form action="#">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="name" className="block mb-2 ">Name</Label>
                                                            <Input type="text" name="title" id="name" className="block w-full p-2.5 "  placeholder="Type product name" required />
                                                        </div>
                                                        <Label htmlFor="category" className="block mb-2 ">Technology</Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a fruit" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                <SelectLabel>Fruits</SelectLabel>
                                                                <SelectItem value="apple">Apple</SelectItem>
                                                                <SelectItem value="banana">Banana</SelectItem>
                                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <div>
                                                            <Label htmlFor="price" className="block mb-2 ">Price</Label>
                                                            <Input type="number" name="price" id="price" className="w-full p-2.5"  placeholder="$149" required />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</Label>
                                                            <textarea id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter event description here">Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.</textarea>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</Label>
                                                            <Select>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select a fruit" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                    <SelectLabel>Fruits</SelectLabel>
                                                                    <SelectItem value="apple">Apple</SelectItem>
                                                                    <SelectItem value="banana">Banana</SelectItem>
                                                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                    <SelectItem value="grapes">Grapes</SelectItem>
                                                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </form>
                                            <SheetFooter>
                                                <div className="pt-5 flex justify-center w-full pb-4 mt-4 space-x-4 ">
                                                    <Button  variant={"destructive"}>
                                                        Delete
                                                    </Button>       
                                                    <SheetClose asChild>
                                                        <Button  type="submit">Update</Button>
                                                    </SheetClose>
                                                </div>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant={"destructive"}  >
                                                <Trash2 size={18}/> Delete item
                                            </Button>
                                        </AlertDialogTrigger>
                                            
                                        <AlertDialogContent className="w-80">
                                            <div >
                                                <CircleAlert className='mx-auto' size={40} color='red'/>
                                                <AlertDialogDescription className='text-center'>
                                                    Are you sure you want to delete this product?
                                                </AlertDialogDescription>
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogAction asChild>
                                                    <Button variant={"destructive"}>
                                                        Yes, I'm sure
                                                    </Button>
                                                </AlertDialogAction>       
                                                <AlertDialogCancel asChild>
                                                    <Button variant={"outline"} type="submit">No, cancel</Button>
                                                </AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    
                                </td>
                            </tr>
                            
                            {/* {{ end -} */}
                        
                            {/* {{< /products.inline >}}                        */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div className="sticky bottom-0 right-0 items-center w-full p-4  border-t border-gray-200 sm:flex sm:justify-between ">
        <div className="flex items-center mb-4 sm:mb-0">
                <Button className='block' size={"icon"} variant={"ghost"}>
                    <ChevronLeft />
                </Button>
                <Button className='block' size={"icon"} variant={"ghost"}>
                    <ChevronRight />
                </Button>
            <span className="text-sm font-normal text-muted-foreground">Showing <span className="font-semibold ">1-20</span> of <span className="font-semibold">2290</span></span>
        </div>
        <div className="flex items-center space-x-3">
            <Button variant={'secondary'} >
            <ChevronLeft/>
                Previous
            </Button>
            <Button variant={'secondary'} >
                Next
                <ChevronRight/>
            </Button>
        </div>
    </div>
    
  
    
</div>


  )
}
