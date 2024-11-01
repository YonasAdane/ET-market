import PageTitle from '@/widgets/adminComponents/PageTitle'
import { ProfileForm } from '@/widgets/adminComponents/profile-form'
import React from 'react'

export default function Profile() {
  return (
    <div className='mx-5 '>
        <PageTitle title='Profile' className='ml-10' />
        <div className='w-3/5 mx-auto'>
          <ProfileForm/>

        </div>
    </div>
  )
}
