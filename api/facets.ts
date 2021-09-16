import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ethers } from 'ethers';
import { NETWORKS } from '../config'

const abi = [
    "function facets() external view returns (tuple(address,bytes4[])[])",
];

const INFURA_API_KEY = process.env.INFURA_API_KEY

export default async (request: VercelRequest, response: VercelResponse): Promise<VercelResponse> => {
    console.info(`Fetching data for 💎 diamond at ${request.body.address} on ${request.body.network || 'mainnet'}`)
    const address = request.body.address

    let rpcUrl = request.body.network ? NETWORKS[request.body.network].rpcUrl : NETWORKS['mainnet'].rpcUrl
    rpcUrl = rpcUrl.replace('%INFURA_API_KEY%', INFURA_API_KEY)
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    const diamondContract = new ethers.Contract(address, abi, provider);

    const data = await diamondContract.facets();

    return response.json(data)
}