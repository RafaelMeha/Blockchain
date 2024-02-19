import * as crypto from 'crypto';
import { Tracing } from 'trace_events';

class transaction {
    constructor(
        public amount: number,
        public payer: string, 
        public buyer: string 
    ) {}

    toString(){
        return JSON.stringify(this);
    }
}

class block {
    constructor(
        public prevHash: string,
        public transaction: transaction,
        public ts = Date.now()
    ){}

    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash("SHA256");
        hash.update(str).end();
        return hash.digest('hex');
    }
}

class chain {
    public static instance = new chain();

    Chain: block[];

    constructor(){
        this.Chain = [new block(null, new transaction(100, 'genesis', 'satoshi'))];
    }

    get lastBlock() {
        return this.Chain[this.Chain.length - 1];
    }

    addBlock(Transaction: transaction, senderPublicKey: string, signature: string){
        const newBlock = new block(this.lastBlock.hash, Transaction);
        this.Chain.push(newBlock);
    }

}