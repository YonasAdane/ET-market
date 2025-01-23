
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash } from 'lucide-react'
import { getBrands } from '../_actions/brandAction'
import CreateBrandForm from '../_components/form-elements/add-brand'


export default async function AdminDashboard() {
  const brands = await getBrands();
 
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Brands</h1>
      <div className="space-y-4">
        
        <div  className="space-y-4 w-full grid grid-cols-3 gap-5">
          <div className='col-span-2'>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Logo</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {brands.map((brand) => (
                    <TableRow key={brand.id}>
                    <TableCell>{brand.name}</TableCell>
                    <TableCell>{brand.description}</TableCell>
                    <TableCell>
                        {brand.logoImage && (
                        <img src={brand.logoImage?.url} alt={`${brand.name} logo`} className="w-10 h-10 object-contain" />
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
          <Card className='p-5'>
            <CreateBrandForm/>
          </Card>
          
        </div>
        
      </div>
    </div>
  )
}