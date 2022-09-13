#!/bin/sh

echo ">> Building contract"

near-sdk-js build ./contract/contract.ts ./build/contract.wasm