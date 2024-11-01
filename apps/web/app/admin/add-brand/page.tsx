  import CreateBrandForm from "@/widgets/adminComponents/form-elements/add-brand";
import PageTitle from "@/widgets/adminComponents/PageTitle";

  export default function ADdclothes() {
    return (
        <div className="w-full h-full ">
            <div className="p-5">
                <PageTitle title="Add New Brand" />
                <div className=" h-full mx-auto ">
                  <CreateBrandForm/>

                </div>
            </div>
        </div>
    )
  }
  