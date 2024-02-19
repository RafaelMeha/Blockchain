"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
class transaction {
    constructor(amount, payer, buyer) {
        this.amount = amount;
        this.payer = payer;
        this.buyer = buyer;
    }
    toString() {
        return JSON.stringify(this);
    }
}
class block {
    constructor(prevHash, transaction, ts = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
    }
    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash("SHA256");
        hash.update(str).end();
        return hash.digest('hex');
    }
}
class chain {
    constructor() {
        this.Chain = [new block(null, new transaction(100, 'genesis', 'satoshi'))];
    }
    get lastBlock() {
        return this.Chain[this.Chain.length - 1];
    }
    addBlock(Transaction, senderPublicKey, signature) {
        const newBlock = new block(this.lastBlock.hash, Transaction);
        this.Chain.push(newBlock);
    }
}
chain.instance = new chain();
