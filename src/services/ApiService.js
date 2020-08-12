import DataModel from "../models/DataModel";

const PAGE_SIZE = 10;

class ApiService {
  constructor(apiUrl) {
    this.url = apiUrl;
  }

  async getAccountInfo(address) {
    // consider getting all created debates and opinions here as well
    const resp = await fetch(`${this.url}/accounts?account=${address}`);
    return ApiService.toDataModel(resp);
  }

  async getHistory(page = 0, account) {
    const stringBody = JSON.stringify({
      page,
      pageSize: PAGE_SIZE,
    });
    const s = await account.sign(stringBody);
    const resp = await fetch(
      `${this.url}/accounts/history` +
        `?page=${page}` +
        `&pageSize=${PAGE_SIZE}` +
        `&sortByDate=true`,
      {
        body: JSON.stringify({
          page,
          pageSize: PAGE_SIZE,
          signature: s.signature,
          message: s.message,
          address: account.getAddress(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    return ApiService.toDataModel(resp);
  }

  async createDeposit(account) {
    const payload = "deposit";
    const stringBody = JSON.stringify({
      payload,
    });
    const s = await account.sign(stringBody);
    const resp = await fetch(`${this.url}/payment/deposit`, {
      body: JSON.stringify({
        payload,
        signature: s.signature,
        message: s.message,
        address: account.getAddress(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return ApiService.toDataModel(resp);
  }

  async createWithdrawal(invoice, account) {
    const stringBody = JSON.stringify({
      invoice,
    });
    const s = await account.sign(stringBody);
    const resp = await fetch(`${this.url}/payment/withdraw`, {
      body: JSON.stringify({
        invoice,
        signature: s.signature,
        message: s.message,
        address: account.getAddress(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return ApiService.toDataModel(resp);
  }

  async createOpinion(debateId, content, contentType, stake, pro, account) {
    const stringBody = JSON.stringify({
      debateId,
      content,
      contentType,
      stake,
      pro,
    });
    const s = await account.sign(stringBody);
    const resp = await fetch(`${this.url}/opinions/new`, {
      body: JSON.stringify({
        debateId,
        content,
        contentType,
        stake,
        pro,
        signature: s.signature,
        message: s.message,
        address: account.getAddress(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return ApiService.toDataModel(resp);
  }

  async getOpinions(debateId, page = 0, account) {
    const resp = await fetch(
      `${this.url}/opinions` +
        `?debateId=${debateId}` +
        `&page=${page}` +
        `&pageSize=${PAGE_SIZE}` +
        `&sortByDate=true` +
        `&callerAddress=${account.getAddress()}`
    );
    return ApiService.toDataModel(resp);
  }

  async getDebateDetails(id, account) {
    const resp = await fetch(
      `${this.url}/debates/${id}?callerAddress=${account.getAddress()}`
    );
    return ApiService.toDataModel(resp);
  }

  async getDebates(
    page = 0,
    finished = false,
    filterForAddress = false,
    sortByDate = false, // if false then sort by debate stake
    searchText = false,
    tag = false,
    account
  ) {
    const resp = await fetch(
      `${this.url}/debates` +
        `?page=${page}` +
        `&pageSize=${PAGE_SIZE}` +
        `&finished=${finished}` +
        `${
          filterForAddress ? `&filterCreatorAddress=${filterForAddress}` : ""
        }` +
        `&${sortByDate ? "sortByDate=true" : "sortBySize=true"}` +
        `&callerAddress=${account.getAddress()}` +
        `${searchText ? `&searchText=${searchText}` : ""}` +
        `${tag ? `&tag=${tag}` : ""}`
    );
    return ApiService.toDataModel(resp);
  }

  // example respone {"debate":{"tags":[],"duration":86400000,"finished":false,"_id":"5ebdd03fdffcc7a8de40b2d6","creator":{"_id":"5ebdcdf8db564ea8569c6c36","address":"0x8437A282A68949db59358387fdcC6842a552BFba"},"title":"Test Title","description":"Test description","stake":100,"created":"2020-05-14T23:11:59.273Z","id":"5ebdd03fdffcc7a8de40b2d6"}}
  async createDebate(title, description, stake, tags, account) {
    const stringBody = JSON.stringify({
      title,
      description,
      stake,
      tags,
    });
    const s = await account.sign(stringBody);
    const resp = await fetch(`${this.url}/debates/new`, {
      body: JSON.stringify({
        title,
        description,
        stake,
        tags,
        signature: s.signature,
        message: s.message,
        address: account.getAddress(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return ApiService.toDataModel(resp);
  }

  static async toDataModel(response) {
    const body = await response.json();
    if (response.status !== 200) {
      return DataModel.error(
        response.status,
        body.error ? body.error : "Unknown api error"
      );
    }
    return new DataModel(body, false, null);
  }
}
export default ApiService;
