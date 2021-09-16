import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ethers } from 'ethers';
import { NETWORKS } from '../config'

const INFURA_API_KEY = process.env.INFURA_API_KEY

export default async (request: VercelRequest, response: VercelResponse): Promise<VercelResponse> => {
    console.info(`Reading contract data for 💎 diamond at ${request.body.address} on ${request.body.network || 'mainnet'}`)

    const address = request.body.address
    const abi = []
    const fragment = JSON.parse(request.body.fragment)
    abi.push(fragment)
    const args = request.body.args

    let rpcUrl = request.body.network ? NETWORKS[request.body.network].rpcUrl : NETWORKS['mainnet'].rpcUrl
    rpcUrl = rpcUrl.replace('%INFURA_API_KEY%', INFURA_API_KEY)
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    const diamondContract = new ethers.Contract(address, abi, provider);

    try {
        const data = await diamondContract[fragment.name](...args)
        return response.json(data)
    } catch (e) {
        return response.json({
            reason: e.reason,
            code: e.code,
            value: e.value
        })
    }
}