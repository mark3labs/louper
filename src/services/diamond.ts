import type { Diamond, Method, Facet, LouperEvent } from '../../types/entities'
import { ethers, utils } from 'ethers'
import axios from 'axios'

export default class DiamondContract implements Diamond {
    address = ''
    network = ''
    name =  ''
    facets: Facet[] = []
    events: LouperEvent[] = []
    isFinal = true
    isVerified = true
    facetsToName: Record<string, string> = {}

    constructor(address: string, network: string) {
        this.address = address
        this.network = network
    }

    fetchContractDetails = async (): Promise<DiamondContract> => {
        // Fetch contract info
        const diamond = (await axios.post('/api/contract', { address: this.address, network: this.network })).data
        this.name = diamond.name

        // Fetch facets and facet details
        const facets = (await axios.post('/api/facets', { address: this.address, network: this.network })).data

        for (let i = 0; i < facets.length; i++) {
            const facetData: any = (
                await axios.post("/api/contract", { address: facets[i][0], network: this.network })
            ).data;

            if (!facetData.abi.length) {
                console.log('moo')
                this.isVerified = false
            }

            const methods: Method[] = await this.getMethods(facets[i][0], facetData.abi);
            const name = facetData.name;
            const facet: Facet = {
                address: facets[i][0],
                name,
                methods,
            };
            this.facets.push(facet);
            this.facetsToName[facet.address] = facet.name 
        }

        // Fetch diamond events
        try {
            const events = (
                await axios.post("/api/events", { address: this.address, network: this.network })
            ).data;
            this.events = events

            await axios.post("/api/leaderboard", { address: this.address, network: this.network, name: this.name })
        } catch (e) {
            console.error(e)
            this.events = []
        }

        return this
    }

    private getMethods = async (address: string, abi: any): Promise<Method[]> => {
        const contract = new ethers.Contract(address, abi);

        const methods: Method[] = [];
        const functions = contract.interface.functions;
        for (const [f, val] of Object.entries(functions)) {
            if (f === "diamondCut((address,uint8,bytes4[])[],address,bytes)") {
                this.isFinal = false;
            }
            const method: Method = {
                signature: f,
                selector: utils.keccak256(utils.toUtf8Bytes(f)).substr(0, 10),
                fragment: val
            };
            methods.push(method);
        }

        return methods;
    };
}