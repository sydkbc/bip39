// const bip39 = require("bip39");
// const bip32 = require("bip32");
// const bitcoin = require("bitcoinjs-lib");
// const bip32utils = require("bip32-utils");

// let mnemonic = bip39.generateMnemonic();
// let seed = bip39.mnemonicToSeedSync(mnemonic);
// console.log("Mnemonic is       : ", mnemonic);
// console.log("Mnemonic Validity : ", bip39.validateMnemonic(mnemonic));
// console.log("Seed is           : ", seed);

// let hdNode = bitcoin.bip32.fromSeed(seed);

// let childNode = hdNode.deriveHardened(0);
// let external = childNode.derive(0);
// let internal = childNode.derive(1);
// let account = new bip32utils.Account([
//   new bip32utils.Chain(external.neutered()),
//   new bip32utils.Chain(internal.neutered()),
// ]);

// console.log(account.getChainAddress(0));
// // => 1QEj2WQD9vxTzsGEvnmLpvzeLVrpzyKkGt

// account.nextChainAddress(0);

// console.log(account.getChainAddress(1));
// // => 1DAi282VN7Ack9o5BqWYkiEsS8Vgx1rLn

// console.log(account.nextChainAddress(1));
// // => 1CXKM323V3kkrHmZQYPUTftGh9VrAWuAYX

// console.log(account.derive("1QEj2WQD9vxTzsGEvnmLpvzeLVrpzyKkGt"));
// // => xpub6A5Fz4JZg4kd8pLTTaMBKsvVgzRBrvai6ChoxWNTtYQ3UDVG1VyAWQqi6SNqkpsfsx9F8pRqwtKUbU4j4gqpuN2gpgQs4DiJxsJQvTjdzfA

// // NOTE: passing in the parent nodes allows for private key escalation (see xprv vs xpub)

// console.log(
//   account.derive("1QEj2WQD9vxTzsGEvnmLpvzeLVrpzyKkGt", [external, internal])
// );
// // => xprv9vodQPEygdPGUWeKUVNd6M2N533PvEYP21tYxznauyhrYBBCmdKxRJzmnsTsSNqfTJPrDF98GbLCm6xRnjceZ238Qkf5GQGHk79CrFqtG4d

const bip39 = require("bip39");
const crypto = require("crypto");
const bitcoin = require("bitcoinjs-lib");

//Create crypto random bytes
const randomBytes = crypto.randomBytes(16); // 128 bits is enough
console.log("Random Bytes: ", randomBytes);
console.log("");

// 12 word phrase mnemonic
const mnemonic = bip39.entropyToMnemonic(randomBytes.toString("hex"));
console.log("Mnemonic: ", mnemonic);
console.log("");

// Generate the seed from the mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);
console.log("Seed: ", seed);
console.log("");

const bitcoinNetwork = bitcoin.networks.bitcoin;
const hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, bitcoinNetwork); // seed from above

console.log("These are the derived keys: ");
console.log("");

const key0 = hdMaster.derivePath("m/0");

const key00 = hdMaster.derivePath("m/0/0");

const key000 = hdMaster.derivePath("m/0/0/0");
const key001 = hdMaster.derivePath("m/0/0/1");

const key01 = hdMaster.derivePath("m/0/1");

const key010 = hdMaster.derivePath("m/0/1/0");
const key011 = hdMaster.derivePath("m/0/1/1");

const key1 = hdMaster.derivePath("m/1");

const key10 = hdMaster.derivePath("m/1/0");

const key100 = hdMaster.derivePath("m/1/0/0");
const key101 = hdMaster.derivePath("m/1/0/1");

const key11 = hdMaster.derivePath("m/1/1");

const key110 = hdMaster.derivePath("m/1/1/0");
const key111 = hdMaster.derivePath("m/1/1/1");
console.log("");
console.log("m/0: ", key0.keyPair.toWIF());
console.log("m/0/0: ", key00.keyPair.toWIF());
console.log("m/0/0/0: ", key000.keyPair.toWIF());
console.log("m/0/0/1: ", key001.keyPair.toWIF());
console.log("m/0/1: ", key01.keyPair.toWIF());
console.log("m/0/1/0: ", key010.keyPair.toWIF());
console.log("m/0/1/1: ", key011.keyPair.toWIF());
console.log("");
console.log("m/1: ", key1.keyPair.toWIF());
console.log("m/1/0: ", key10.keyPair.toWIF());
console.log("m/1/0/0: ", key100.keyPair.toWIF());
console.log("m/1/0/1: ", key101.keyPair.toWIF());
console.log("m/1/1: ", key11.keyPair.toWIF());
console.log("m/1/1/0: ", key110.keyPair.toWIF());
console.log("m/1/1/1: ", key111.keyPair.toWIF());
