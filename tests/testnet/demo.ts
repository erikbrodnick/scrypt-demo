import { Demo } from '../../src/contracts/demo'
import { getDefaultSigner, inputSatoshis } from './utils/txHelper'
import { toByteString, sha256 } from 'scrypt-ts'

const message = 'hello world, sCrypt!'

async function main() {
    await Demo.compile()
    const instance = new Demo(sha256(toByteString(message, true)))

    // connect to a signer
    await instance.connect(getDefaultSigner())

    // contract deployment
    const deployTx = await instance.deploy(inputSatoshis)
    console.log('Demo contract deployed: ', deployTx.id)

    // contract call
    const { tx: callTx } = await instance.methods.unlock(
        toByteString(message, true)
    )
    console.log('Demo contract `unlock` called: ', callTx.id)
}

describe('Test SmartContract `Demo` on testnet', () => {
    it('should succeed', async () => {
        await main()
    })
})
