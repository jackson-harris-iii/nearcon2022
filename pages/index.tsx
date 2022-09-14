import * as nearAPI from 'near-api-js'
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
      console.log('here is the api', wallet)
      const result = await wallet.api.fetchAccount(
        wallet?.activeAccount?.accountId
      )
      console.log('what is this result', result)

      // const { data, error } = await wallet.api.fetchTokens()

      // console.log('data tokens what?', data)
      // console.log('here are the NFTS!!!', data)
      const results = result.data.token.map(async (nft) => {
        try {
          const info = await wallet.api.fetchTokenById(nft.id)
          const res2 = await fetch(info.data.thing.metaId)
          let thingInfo = await res2.json()
          // console.log('here is the info', info)
          console.log('thing thingInfo', thingInfo)
        } catch (err) {
          console.log('results', err)
        }
        const done = await Promise.all(results)
        console.log('this might be magic', done)
        // console.log('thing id', info.data.thing.metaId)
      })

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

  const contractTest = async () => {
    try {
      const { connect, keyStores, WalletConnection } = nearAPI

      const connectionConfig = {
        networkId: 'testnet',
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
      }

      //@ts-ignore
      const nearConnection = await connect(connectionConfig)

      const account = await nearConnection.account('jh-alignmint.testnet')

      const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        'jh-alignmint.testnet',
        {
          // name of contract you're connecting to
          viewMethods: ['get_proxyMap', 'number_of_proxies'], // view methods do not change state but usually return a value
          changeMethods: ['updateProxyMapEntry'], // change methods modify state
          //@ts-ignore
          sender: account, // account object to initialize and sign transactions.
        }
      )
      console.log('here is the alignmint contract', contract)
      //@ts-ignore
      const test49 = await contract.get_proxyMap({ id: 'test69' })

      console.log('test49', JSON.parse(test49))
      // wallet.fetchTransactionResult()
    } catch (err) {
      console.log('contract test error', err)
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
      //@ts-ignore
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
      contractTest()
    }
    contractTest()
  }, [wallet])

  const val = { entryKey: 'test1', entry: '{metdata1: value1}' }

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
