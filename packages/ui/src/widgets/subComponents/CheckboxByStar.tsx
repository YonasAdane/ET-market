import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

export default function CheckboxByStar() {
  return (
    <div className=" flex flex-col  items-start gap-2 w-full ">
        <div className="flex gap-2">
            <Checkbox name="star" id="5star" value="5"/>
            <label htmlFor="5star" className="flex gap-2">
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            </label>
        </div>
        <div className="flex gap-2">
        <Checkbox name="star" id="4star" value="4"/>
            <label htmlFor="4star" className="flex gap-2">
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            </label>
        </div>
        <div className="flex gap-2">
        <Checkbox name="star" id="3star" value="3"/>
            <label htmlFor="3star" className="flex gap-2">
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            </label>
        </div>
        <div className="flex gap-2">
        <Checkbox name="star" id="2star" value="2"/>
            <label htmlFor="2star" className="flex gap-2">
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            </label>
        </div>
        <div className="flex gap-2">
        <Checkbox name="star" id="1star" value="1"/>
            <label htmlFor="1star" className="flex gap-2">
            <Star fill="#ffc400" stroke="#ffc400" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
            </label>
        </div>

    </div>
  )
}
