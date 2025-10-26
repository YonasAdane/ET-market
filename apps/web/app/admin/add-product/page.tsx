import PageTitle from "@repo/ui/widgets/adminComponents/PageTitle";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs"
import AddClothForm from "../_components/form-elements/add-clothes";
import AddWatchForm from "../_components/form-elements/add-watches";
import AddBagForm from "../_components/form-elements/add-bag";
import AddAccesoryForm from "../_components/form-elements/add-accesories";
import AddFootwearForm from "../_components/form-elements/add-footwear";
import AddUnderwearForm from "../_components/form-elements/add-underwear";
import AddOuterwearForm from "../_components/form-elements/add-outerwear";
export default function AddProduct() {
  return (
    <Tabs defaultValue="CLOTHING" className="w-full">
      <div className="w-full h-full ">
          <div className="p-5">
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
              <TabsContent value="CLOTHING" className="w-full mt-5 p-5">
                  <AddClothForm/>
              </TabsContent>
              <TabsContent value="WATCH" className="w-full mt-5 p-5">
                  <AddWatchForm/>
              </TabsContent>
              <TabsContent value="BAG" className="w-full mt-5 p-5">
                  <AddBagForm/>
              </TabsContent>
              <TabsContent value="ACCESSORY" className="w-full mt-5 p-5">
                  <AddAccesoryForm/>
              </TabsContent>
              <TabsContent value="FOOTWEAR" className="w-full mt-5 p-5">
                  <AddFootwearForm/>
              </TabsContent>
              <TabsContent value="UNDERWEAR" className="w-full mt-5 p-5">
                  <AddUnderwearForm/>
              </TabsContent>
              <TabsContent value="OUTERWEAR" className="w-full mt-5 p-5">
                  <AddOuterwearForm/>
              </TabsContent>
          </div>
      </div>
    </Tabs>
  )
}
