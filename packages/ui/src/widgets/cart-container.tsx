import { Button } from "@/components/ui/button"
import { ArrowUpRight, Minus, Plus, Trash2 } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
type Props = {}

export default function CartContainer({}: Props) {
    const tableData = [
        {
          customer: {
            name: "Liam Johnson",
            email: "liam@example.com"
          },
          type: "Sale",
          status: "Approved",
          date: "2023-06-23",
          amount: "$250.00"
        },
        {
          customer: {
            name: "Olivia Smith",
            email: "olivia@example.com"
          },
          type: "Refund",
          status: "Declined",
          date: "2023-06-24",
          amount: "$150.00"
        },
        {
          customer: {
            name: "Noah Williams",
            email: "noah@example.com"
          },
          type: "Subscription",
          status: "Approved",
          date: "2023-06-25",
          amount: "$350.00"
        },
        {
          customer: {
            name: "Emma Brown",
            email: "emma@example.com"
          },
          type: "Sale",
          status: "Approved",
          date: "2023-06-26",
          amount: "$450.00"
        },
        {
          customer: {
            name: "Liam Johnson",
            email: "liam@example.com"
          },
          type: "Sale",
          status: "Approved",
          date: "2023-06-27",
          amount: "$550.00"
        }
      ];
      
  return (
    // <div className="w-full rounded-xl border shadow-lg">
    //     <div className="w-full flex justify-between">
    //         <h1 className="text-2xl font-semibold">Cart</h1>
    //         <Button variant="ghost"><Trash2 /> Remove</Button>
    //     </div>
    // </div>
    <Card className="xl:col-span-2" >
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
            <CardTitle>Cart</CardTitle>
            </div>
            <Button variant="secondary" asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
                <Trash2 className="h-4 w-4"  /> Remove
            </Link>
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                    <TableHead >
                        <Checkbox />  
                    </TableHead>
                    <TableHead>PRODUCT</TableHead>
                    <TableHead >PRICE</TableHead>
                    <TableHead >QUANTITY</TableHead>
                    <TableHead >TOTAL PRICE</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell >
                        <Checkbox/>
                    </TableCell>
                    <TableCell className="flex gap-2 items-center">
                      <div>
                        <img className="h-28 rounded-lg"  src="https://tanishafashion.com/wp-content/uploads/2024/04/81ovUS-ujpL._UL1500_-1-1.jpg" alt="productpicture" />
                      </div>
                      <div className="text-start h-full flex flex-col items-center justify-center">
                        <h3 className="w-full ">Floral Print Wrap Dress</h3>
                        <div className="w-full hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      $250.00
                    </TableCell>
                    <TableCell className="hidden md:table-cell ">
                        <div className="flex flex-col justify-between">
                          <div className="w-full flex justify-center items-center">
                            <Button className="p-1 h-6 block" variant="outline" >
                              <Plus size={14} />
                            </Button>
                            <h3 className="p-2">8</h3>
                            <Button className="p-1 h-6 block" variant="outline" >
                              <Minus size={14} />
                            </Button>
                          </div>
                          <div></div>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                
            </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}