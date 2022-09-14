near call guest-book.testnet addMessage '{"text": "Aloha"}' --account-id example-acct.testnet


near call jh-alignmint.testnet updateProxyMapEntry  '{"entryKey": "test1", "entry": "{metdata1: value1}"}' --account-id jh-alignmint.testnet 

near call jh-alignmint.testnet updateProxyMapEntry  '{"entryKey": "test69", "entry": "{metdata77: value77}"}' --account-id jh-alignmint.testnet

near view jh-alignmint.testnet get_proxyMap '{}'

near view-state jh-alignmint.testnet --finality final