import { ethers } from "ethers";

class Account {
  constructor(mnemonic) {
    if (mnemonic.split(" ").length !== 12) {
      throw new Error("Invalid mnemonic");
    }
    this.mnemonic = mnemonic;
  }

  getWallet() {
    return ethers.Wallet.fromMnemonic(
      this.mnemonic.toString(),
      null,
      ethers.wordlists.en
    );
  }

  getAddress() {
    return this.getWallet().address;
  }

  // getPrivateKey() {}

  static randomMnemonic(length = 16) {
    const bytes = ethers.utils.randomBytes(length); // 16 bytes => 12 words, 32 bytes => 24 words
    return ethers.utils.HDNode.entropyToMnemonic(bytes, ethers.wordlists.en);
  }

  sign(message) {
    const hexMessage = ethers.utils.hexlify(message);
    const signature = this.getWallet().signMessage(hexMessage);
    return { signature, message: hexMessage };
  }
}
export default Account;
