import { ethers } from "ethers";

class Account {
  constructor(mnemonic) {
    this.mnemonic = mnemonic;
  }

  // getPublicKey() {}

  // getPrivateKey() {}

  static randomMnemonic(length = 16) {
    const bytes = ethers.utils.randomBytes(length); // 16 bytes => 12 words, 32 bytes => 24 words
    return ethers.utils.HDNode.entropyToMnemonic(bytes, ethers.wordlists.en);
  }
}
export default Account;
