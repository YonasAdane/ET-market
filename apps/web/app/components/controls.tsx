"use client"
import { Button } from "@repo/ui/components/ui/button";
import { decrement, increment } from "@repo/redux-utils/libs/redux/features/counter-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@repo/redux-utils/libs/redux/store";

export default function Controls() {
  const dispatch = useDispatch<AppDispatch>();
    const onClickIncrease=()=>{
        dispatch(increment())
    }
    const onClickDecrease=()=>{
        dispatch(decrement())
    }
  return (
    <div>
      <h2>Controls</h2>
      <div className="flex gap-10">
        <div>
            <Button onClick={onClickIncrease}>Increase</Button>
        </div>
        <div>
            <Button onClick={onClickDecrease }>Decrease</Button>
        </div>
      </div>
    </div>
  );
}
