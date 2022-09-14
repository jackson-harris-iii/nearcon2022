near call guest-book.testnet addMessage '{"text": "Aloha"}' --account-id example-acct.testnet


near call jh-alignmint.testnet updateProxyMapEntry  '{"entryKey": "test1", "entry": "{metdata1: value1}"}' --account-id jh-alignmint.testnet 

near call jh-alignmint.testnet updateProxyMapEntry  '{"entryKey": "test69", "entry": "{metdata77: value77}"}' --account-id jh-alignmint.testnet

near view jh-alignmint.testnet get_proxyMap '{}'

near view-state jh-alignmint.testnet --finality final


near call og-galina.testnet updateProxyMapEntry '{
  "entryKey": "razomalignmint2.mintspace2.testnet_4Ocean Beach Cleanup #1",
  "entry": "{
    display_type: updateFields,
    trait_type: updateFields,
    value: Beach Clean,
    media: https://i.ibb.co/SXPM4r5/beach1after.jpg,
  }"
}' --account-id og-galina.testnet