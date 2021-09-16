import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ethers } from 'ethers';
import { NETWORKS } from '../config';
import type { LouperEvent } from '../types/entities'
const abi = [
    "event DiamondCut(tuple(address,uint8,bytes4[])[],address,bytes)",
];

const INFURA_API_KEY = process.env.INFURA_API_KEY

export default async (request: VercelRequest, response: VercelResponse): Promise<VercelResponse> => {
    console.info(`Fetching events for 💎 diamond at ${request.body.address} on ${request.body.network || 'mainnet'}`)
    const address = request.body.address

    let rpcUrl = request.body.network ? NETWORKS[request.body.network].rpcUrl : NETWORKS['mainnet'].rpcUrl
    rpcUrl = rpcUrl.replace('%INFURA_API_KEY%', INFURA_API_KEY)
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

    const diamondContract = new ethers.Contract(address, abi, provider);

    const events: ethers.Event[] = await diamondContract.queryFilter(
        diamondContract.filters.DiamondCut(),
        // request.body.network === 'polygon' ? 11516320 : undefined
    );
 
    const louperEvents: LouperEvent[] = []
    
    for (let i = 0; i < events.length; i ++) {
        const block = await events[i].getBlock()
        const louperEvent: LouperEvent = {
            ...events[i],
            timestamp: block.timestamp
        }
        louperEvents.push(louperEvent)
    }
    return response.json(louperEvents)
}