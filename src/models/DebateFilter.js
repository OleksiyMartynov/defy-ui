class DebateFilter {
  constructor(active = true, sortByStake = true, sortByAccount = false) {
    this.active = active;
    this.sortByStake = sortByStake;
    this.sortByAccount = sortByAccount;
  }
}
export default DebateFilter;
