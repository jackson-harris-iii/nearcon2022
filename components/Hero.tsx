import Navbar from '../components/Navbar'

import { useWallet } from '../services/providers/MintbaseWalletContext'
import { MbButton, MbAction, EState, MbText } from 'mintbase-ui'

import Link from 'next/link'
import Image from 'next/image'
import WalletConnectButton from './WalletConnectButton'

const Hero = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <>
      <div className="w-full py-4 px-6 bg-cover bg-no-repeat bg-center relative z-10 dark:bg-mb-background">
        <div className="container flex flex-col gap-8 max-w-4xl mx-auto text-right ">
          <div className="">
            <WalletConnectButton />
          </div>
        </div>
      </div>
      <Image
        width={75}
        height={40}
        layout="responsive"
        src="/heroImage.png"
      ></Image>
    </>
  )
}

export default Hero
