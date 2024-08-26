import { CollectionHeader } from '@repo/ui/widgets/collection-header.tsx'
type Props = {}

export default function  Collections({}: Props) {
  return (
    <div className='w-4/5 mx-auto mt-5'> 
        <CollectionHeader/>
        <div className='flex flex-grow'>
            <div className='w-80 border'>

            </div>
            <div className='border'></div>
        </div>
    </div>
  )
}