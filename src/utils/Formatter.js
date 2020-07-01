export default class Formatter {
  static kFormatter(num) {
    return Math.abs(num) > 999
      ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}k`
      : Math.sign(num) * Math.abs(num);
  }

  static getBaseUrl(url) {
    const pathArray = url.split("/");
    const protocol = pathArray[0];
    const host = pathArray[2];
    return `${protocol}//${host}`;
  }

  static addCommas(intNum) {
    return `${intNum}`.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
}
