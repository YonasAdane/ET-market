import { Input } from "@/components/ui/input";
import PageTitle from "@/widgets/adminComponents/PageTitle";
import Size from "./size";
import Gender from "./gender";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Check, Upload } from "lucide-react";
import ToggleGroupComponent from "./toggle-group";
import { filterProduct } from "@/lib/constants";
export default function AddProduct() {
  return (
    <Tabs defaultValue="CLOTHING" className="w-full">
      <div className="w-full grid grid-cols-3 p-8 h-full ">
          <div className="col-span-2 p-5">
              <PageTitle title="Add New Product" />
              <TabsList className="grid w-full grid-cols-7 mt-3">
                <TabsTrigger value="CLOTHING">Clothing</TabsTrigger>
                <TabsTrigger value="WATCH">Watch</TabsTrigger>
                <TabsTrigger value="BAG">Bags</TabsTrigger>
                <TabsTrigger value="ACCESSORY">Accessory</TabsTrigger>
                <TabsTrigger value="FOOTWEAR">Footwear</TabsTrigger>
                <TabsTrigger value="UNDERWEAR">Underwear</TabsTrigger>
                <TabsTrigger value="OUTERWEAR">Outerwear</TabsTrigger>
              </TabsList>
              <TabsContent value="CLOTHING" className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                  <h2>General Information</h2>
                  <label htmlFor="productName" className="text-sm">Product Name</label>
                  <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                  <label htmlFor="productDescription" className="text-sm">Product Description</label>
                  <Input id="productDescription" name="productDescription" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" type="text"/>
                  <div className="flex justify-between gap-5">
                    <div className="w-full ">
                      <Size/>
                    </div>
                    <div className="w-full ">
                      <Gender/>
                    </div>
                  </div>
              </TabsContent>
              <TabsContent value="WATCH" className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                <h2>General Information</h2>
                  <label htmlFor="productName" className="text-sm">Product Name</label>
                  <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                  <label htmlFor="productDescription" className="text-sm">Product Description</label>
                  <Input id="productDescription" name="productDescription" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" type="text"/>
                  <div className="grid grid-cols-2 gap-x-5">
                    {filterProduct.WATCH.map(product=>(
                      <div className="w-full ">
                        <ToggleGroupComponent select="single" title={product.name} values={product.value}/>
                      </div>
                    ))}
                    <div className="w-full ">
                      <Gender/>
                    </div>
                  </div>
              </TabsContent>
                <TabsContent value="BAG" className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                  <h2>General Information</h2>
                  <label htmlFor="productName" className="text-sm">Product Name</label>
                  <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                  <label htmlFor="productDescription" className="text-sm">Product Description</label>
                  <Input id="productDescription" name="productDescription" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" type="text"/>
                  <div className="flex justify-between gap-5">
                    <div className="w-full ">
                      <Size/>
                    </div>
                    <div className="w-full ">
                      <Gender/>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="ACCESSORY" className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                  <h2>General Information</h2>
                  <label htmlFor="productName" className="text-sm">Product Name</label>
                  <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                  <label htmlFor="productDescription" className="text-sm">Product Description</label>
                  <Input id="productDescription" name="productDescription" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" type="text"/>
                  <div className="grid grid-cols-2 gap-5 ">
                    <div className="w-full ">
                      <Size/>
                    </div>
                    <div className="w-full ">
                      <Gender/>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="FOOTWEAR" className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                  <h2>General Information</h2>
                  <label htmlFor="productName" className="text-sm">Product Name</label>
                  <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                  <label htmlFor="productDescription" className="text-sm">Product Description</label>
                  <Input id="productDescription" name="productDescription" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" type="text"/>
                  <div className="flex justify-between gap-5">
                    <div className="w-full ">
                      <Size/>
                    </div>
                    <div className="w-full ">
                      <Gender/>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="UNDERWEAR" className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                  <h2>General Information</h2>
                  <label htmlFor="productName" className="text-sm">Product Name</label>
                  <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                  <label htmlFor="productDescription" className="text-sm">Product Description</label>
                  <Input id="productDescription" name="productDescription" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" type="text"/>
                  <div className="flex justify-between gap-5">
                    <div className="w-full ">
                      <Size/>
                    </div>
                    <div className="w-full ">
                      <Gender/>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="OUTERWEAR" className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                  <h2>General Information</h2>
                  <label htmlFor="productName" className="text-sm">Product Name</label>
                  <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                  <label htmlFor="productDescription" className="text-sm">Product Description</label>
                  <Input id="productDescription" name="productDescription" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none h-32" type="text"/>
                  <div className="flex justify-between gap-5">
                    <div className="w-full ">
                      <Size/>
                    </div>
                    <div className="w-full ">
                      <Gender/>
                    </div>
                  </div>
                </TabsContent>

              <div className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                <h2>Pricing And Stock</h2>
                <div className="flex justify-between gap-5">
                  <div className="w-full">
                      <label htmlFor="productName" className="text-sm">Base Pricing</label>
                      <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>
                      <label htmlFor="productName" className="text-sm">Discount</label>
                      <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>

                  </div>
                  <div className="w-full">
                      <label htmlFor="productName" className="text-sm">Stock</label>
                      <Input id="productName" name="productName" className="bg-slate-200 dark:bg-slate-600 focus:outline-transparent my-2 focus:shadow-outline focus:border-none appearance-none" type="text"/>

                  </div>
                </div>
              </div>
          </div>
          <div className="row-span-1 ">
            <div className="w-fit ml-auto mt-3">
              <Button className="p-3 rounded-full mr-0" variant="default"><Check size={18} className="mr-1"/> Add Product</Button>
            </div>
            <Card className="overflow-hidden mt-5 border-none bg-muted/50" >
                <h2 className="m-5">Product Images</h2>
              <CardContent>
                <div className="grid gap-2">
                  <img
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="https://ui.shadcn.com/placeholder.svg"
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button>
                      <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="https://ui.shadcn.com/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button>
                      <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="https://ui.shadcn.com/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="w-full bg-muted/50 mt-5 rounded-lg p-5">
                <h2 className="mb-3">Category</h2>
                <label htmlFor="productName" className="text-sm">Product Category</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Product Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Product Category</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="w-fit  mt-3">
                  <Button className="p-3 rounded-full mr-0" variant="default"> Add Category</Button>
                </div>
            </div>
          </div>
      </div>
    </Tabs>
  )
}
