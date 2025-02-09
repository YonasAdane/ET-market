// "use client"
// import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash } from 'lucide-react'
import { getCategories } from '../_actions/categoryAction'
import AddCategoryForm from "../_components/form-elements/add-category"



export default async function CategoriesPage() {
    const allCategories = await getCategories();

    return (
    <div className="container mx-auto p-6 ">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        <div className="space-y-4">
        
            <div  className="space-y-4 w-full grid grid-cols-3 gap-5">
                <div className='col-span-2'>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Banner</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {allCategories.map((category) => (
                            <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>
                                {category.bannerImageId && (
                                <img src={`${category.bannerImage?.url}`} alt={`${category.name} banner`} className="w-20 h-10 object-cover" />
                                )}
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <h1 className='text-xl'>Add Category</h1>
                    <AddCategoryForm/>
                </div>
            </div>
        </div>
    </div>
    
  )
}
