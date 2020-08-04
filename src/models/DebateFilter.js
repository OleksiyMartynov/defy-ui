class DebateFilter {
  constructor(
    active = true,
    sortByStake = true,
    sortByAccount = false,
    searchText = false
  ) {
    this.active = active;
    this.sortByStake = sortByStake;
    this.sortByAccount = sortByAccount;
    this.searchText = searchText;
  }
}
export default DebateFilter;
