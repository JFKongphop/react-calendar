import React, { Fragment, useContext } from 'react'
import dayjs from 'dayjs';
import { getMonth } from '@/utils/getMonth';
import { 
  Menu, 
  Dialog, 
  Transition 
} from '@headlessui/react';

const index = () => {
  console.log(dayjs());

  console.log(getMonth())

  
  return (
    <div className="text-red-500">

    </div>
  )
}

export default index;