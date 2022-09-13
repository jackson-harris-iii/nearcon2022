use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{
    collections::{LookupMap, UnorderedSet},
    env, ext_contract,
    json_types::{U128, U64},
    near_bindgen, require,
    serde_json::{json, to_string},
    AccountId, Balance, BorshStorageKey, Gas, PanicOnDefault, Promise,
};

// s2PrSEMCetLd3BevVwS7RaieGctwRMyWjUIsMdQ9dgU
mod external;
use external::*;

const GAS_FOR_NFT_TRANSFER: Gas = Gas(20_000_000_000_000);
const NO_DEPOSIT: Balance = 0;
const NO_GAS: Gas = Gas(0);

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    LatestMinter,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub latest_minters: LookupMap<AccountId, AccountId>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new() -> Self {
        let this = Self {
            latest_minters: LookupMap::new(StorageKey::LatestMinter),
        };

        this
    }

    pub fn mint(
        &mut self,
        owner_id: AccountId,
        metadata: TokenMetadata,
        num_to_mint: u64,
        royalty_args: Option<RoyaltyArgs>,
        split_owners: Option<SplitBetweenUnparsed>,
        nft_contract_id: AccountId,
    ) {
        let owner_id = &env::signer_account_id();

        let latest_minter =
            self.internal_get_or_add_latest_minter_by_contract_id(owner_id, &nft_contract_id);

        ext_contract::nft_batch_mint(
            latest_minter,
            metadata.clone(),
            num_to_mint,
            royalty_args,
            split_owners,
            nft_contract_id.clone(),
            1,
            GAS_FOR_NFT_TRANSFER,
        )
        .then(ext_self::cb_success_mint(
            owner_id.clone(),
            nft_contract_id,
            env::current_account_id(),
            NO_DEPOSIT,
            GAS_FOR_NFT_TRANSFER,
        ));
    }

    pub fn nft_contract_exists(&self, account_id: &AccountId) -> bool {
        self.latest_minters.contains_key(account_id)
    }

    fn internal_get_or_add_latest_minter_by_contract_id(
        &mut self,
        account_id: &AccountId,
        nft_contract_id: &AccountId,
    ) -> AccountId {
        self.latest_minters.get(nft_contract_id).unwrap_or_else(|| {
            self.latest_minters.insert(nft_contract_id, account_id);
            account_id.clone()
        })
    }

    fn internal_set_latest_minter_by_contract_id(
        &mut self,
        account_id: &AccountId,
        nft_contract_id: &AccountId,
    ) {
        self.latest_minters.insert(nft_contract_id, account_id);
    }

    #[private]
    pub fn cb_success_mint(&mut self, latest_minter_id: AccountId, nft_contract_id: AccountId) {
        self.internal_set_latest_minter_by_contract_id(&latest_minter_id, &nft_contract_id);

        env::log_str(
            &json!({
                "type": "new_minter",
                "params": {
                    "latest_minter_id": latest_minter_id,
                    "nft_contract_id": nft_contract_id,
                }

            })
            .to_string(),
        );
    }
}