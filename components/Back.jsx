import Image from 'next/image'
import Link from 'next/link'

const Back = () => {
  return (
    <Link className="back_btn" href="/">
        <Image 
            src='/assets/icons/left-arrow.svg'
            alt="back_icon"
            width={22}
            height={22}
        />
    </Link>
  )
}

export default Back
