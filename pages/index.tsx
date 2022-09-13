import { useState } from 'react'
import Head from 'next/head'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import Card from '../components/Card'
import Link from 'next/link'
import { Button, Input } from '@nextui-org/react'
import { useWallet } from '../services/providers/MintbaseWalletContext'

const links = [
  {
    href: 'https://testnet.mintbase.io/developer',
    title: 'Get an API Key',
    description:
      'The key to authenticate your app. This is used for file uploads and fetching useful information.',
  },
  {
    href: 'https://docs.mintbase.io/dev/getting-started',
    title: 'Documentation',
    description: 'Find in-depth information about Mintbase features and API.',
  },
  {
    href: 'https://github.com/mintbase/examples',
    title: 'Examples',
    description: 'Discover and deploy boilerplate example Mintbase projects.',
  },
  {
    href: 'https://testnet.mintbase.io/create',
    title: 'Deploy a contract',
    description: 'The first step for an on-chain adventure.',
  },
]

const Home = () => {
  const { wallet, isConnected, details } = useWallet()
  const [storeName, setStoreName] = useState('')
  const [storeSymbol, setStoreSymbol] = useState('')

  const deployStore = async () => {
    const storeDetails = {
      storeId: storeName,
      symbol: storeSymbol,
    }
    console.log('storeDetails', storeDetails)
    try {
      wallet.deployStore(storeDetails.storeId, storeDetails.symbol)
    } catch (err) {
      console.log('deploy store err', err)
    }
  }
  return (
    <>
      <Head>
        <title>Mintbase Engineering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />

      <Container className="flex justify-center my-24">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:gap-12">
          {/* {links.map((link, index) => (
            <Link href={link.href} key={'link' + index} passHref>
              <a>
                <div className="flex w-auto max-w-64 h-full">
                  <Card title={link.title} description={link.description} />
                </div>
              </a>
            </Link>
          ))} */}
          {/* @ts-ignore */}
          <Input
            bordered
            labelPlaceholder="Store Name"
            onChange={(e) => setStoreName(e.target.value)}
          ></Input>
          {/* @ts-ignore */}
          <Input
            bordered
            labelPlaceholder="Store Symbol"
            onChange={(e) => setStoreSymbol(e.target.value)}
          ></Input>
          <Button onClick={() => deployStore()}>Deploy Store</Button>
        </div>
      </Container>
    </>
  )
}

export default Home
