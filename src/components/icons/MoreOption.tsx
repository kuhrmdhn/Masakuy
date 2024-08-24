import Image from 'next/image'
import React from 'react'

export default function MoreOption({...props}) {
  return <Image width={50} height={50} src={"/icons/more-option.svg"} alt='more option' {...props} />
}
