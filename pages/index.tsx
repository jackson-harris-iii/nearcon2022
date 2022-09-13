import { useEffect, useState } from 'react'
import Head from 'next/head'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import Card from '../components/Card'
import Link from 'next/link'
import { Button, Input } from '@nextui-org/react'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import useStore from '../utils/store'
import { API, Chain, Network, Wallet } from 'mintbase'

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
  //@ts-ignore
  const aStore = useStore((state) => state.aStore)
  //@ts-ignore
  const setAstore = useStore((state) => state.setAstore)

  const deployStore = async () => {
    const storeDetails = {
      storeId: storeName,
      symbol: storeSymbol,
    }
    console.log('storeDetails', storeDetails)
    try {
      const result = wallet.deployStore(
        storeDetails.storeId,
        storeDetails.symbol
      )
      console.log('here are the new store details', result)
    } catch (err) {
      console.log('deploy store err', err)
    }
  }

  const getAccount = async () => {
    try {
      //@ts-ignore
      // const mbAPI = await new API({
      //   chain: 'near' as Chain,
      //   networkName: process.env.NEXT_PUBLIC_MINTBASEJS_NETWORK as Network,
      //   apiBaseUrl: process.env.NEXT_PUBLIC_MINTBASEJS_API_URL,
      //   apiKey: process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY,
      // })
      // console.log('here is the api', mbAPI)
      const result = await wallet.api.fetchAccount(
        wallet?.activeAccount?.accountId
      )
      console.log('here is the api call result', result.data.store)

      let storeArr = result?.data?.store
      const walletAstore = checkForAlignmintStore(storeArr)
      if (walletAstore?.store !== false) {
        console.log('walletAstore', walletAstore)
        setAstore(walletAstore)
      }
      // result?.data?.store.forEach((store) => {})
    } catch (err) {
      console.log(err)
    }
  }

  const checkForAlignmintStore = (stores: [any]) => {
    console.log('here is storeArr', stores)
    let found = { store: false }

    stores.forEach((store) => {
      let nameSplit = store.id.split('.')
      let isAli = nameSplit[0].includes('alignmint')
      // console.log('isAli', isAli)
      // console.log('nameSplit', nameSplit)
      if (isAli === true) {
        console.log('match found', store)
        found = { store }
      }
    })

    return found
  }

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    })
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    //@ts-ignore
    let value = params?.transactionHashes // "some_value"
    console.log('these be the transactionHashes', value)
    //@ts-ignore
    // const mbAPI = new API()
    // mbAPI.fetchAccount(wallet.)
    console.log('here is the wallet', wallet)
    console.log(
      'here is the wallet active account',
      wallet?.activeAccount?.accountId
    )

    if (wallet?.activeAccount?.accountId !== undefined) {
      getAccount()
    }
    // wallet.fetchTransactionResult()
  }, [wallet])

  return (
    <>
      <Head>
        {/* <title>Mintbase Engineering</title> */}
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
