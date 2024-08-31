import { Checkbox } from '@/components/ui/checkbox'
type Props={name:string,value:string,text:string,id:string}
function CheckboxByText(props:Props) {
  return (
    <div className=" flex texts-center gap-2">
        <Checkbox id={props.id} name={props.name} className="" value={props.value} />
        <label
            htmlFor="terms"
            className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {props.text}
        </label>
    </div>  
        )
}

export default CheckboxByText