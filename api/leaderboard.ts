import { createClient } from '@supabase/supabase-js'
import type { VercelRequest, VercelResponse } from '@vercel/node'

// Create a single supabase client for interacting with your database 
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

export default async (request: VercelRequest, response: VercelResponse): Promise<VercelResponse> => {
    const network = request.body.network || 'mainnet'
    const address = request.body.address
    const name = request.body.name

    let record: any = {
        network,
        address,
        name,
        hits: 1
    }

    let { data, error } = await supabase
        .from('leaderboard')
        .select()
        .eq('network', network)
        .eq('address', address)
    
    if (error) {
        return response.status(500)
    }
    
    if (data.length) {
        record = data[0]
        record.hits += 1
    }

    ({ data, error } = await supabase.from('leaderboard').upsert(record))
    if (error) {
        return response.status(500)
    }

    return response.json('ok')
}