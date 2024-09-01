"use client"
import { useAppSelector } from "@repo/redux-utils/libs/redux/store"
function Display() {
    let number=useAppSelector(state=>state.counter.value);

  return (
    <div>
        <p className="text-3xl">
            the number is: {number}
        </p>
    </div>
  )
}

export default Display