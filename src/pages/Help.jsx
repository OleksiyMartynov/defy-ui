import React, { Component } from "react";
import "./Help.scss";
import Toggle from "../components/Toggle";

const CONTENT = [
  {
    title: "What exactly is Defy.fyi?",
    detailHeight: "200px",
    detail: () => (
      <span>
        This platform allows users to collaboratively find an answer to a debate
        topic by attaching a monetary cost to information. Unlike other social
        debate platforms, Defy separates signal from the noise by sorting
        debates by the total monetary stake attached to each debate. Also the
        users have a financial incentive to research and provide strong evidence
        for their side of the debate, because the winning side takes all the
        stake.
        <br />
        <ul>
          <li>Debates have two sides, Pro and Con</li>
          <li>
            The side in the majority at debate completion time will take all the
            stake
          </li>
          <li>
            Debate completes in 24 hours from the moment last evidence item was
            posted
          </li>
          <li>You can vote by locking up sats(unit of Bitcoin)</li>
          <li>
            You can provide evidence such as links to a research paper, tweets
            or youtube videos to help convince other users to vote for your side
            of the debate
          </li>
          <li>
            The stake amount for new evidence information has to be greater than
            previous evidence stake. This prevents debates from continuing
            indefinitely
          </li>
          <li>
            Winning side receives their stake back plus relative fraction of the
            losing side
          </li>
          <li>Losing side will lose all their stake</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Why Bitcoin?",
    detailHeight: "60px",
    detail: () => (
      <span>
        In order to open the platform to as many users as possible with least
        amount of work we decided to support the official currency of the
        internet, Bitcoin.
      </span>
    ),
  },
  {
    title: "Why Lightning network?",
    detailHeight: "150px",
    detail: () => (
      <span>
        Everyone loves Bitcoin! But due to its monetary policy the base-layer is
        not optimal for micro-payments. You would&apos;nt go to a central bank
        to pay for a coffee, would you? So we chose to use Lightning Network, a
        second layer network on top of Bitcoin. If Bitcoin is a central bank,
        Lightning is Visa. Lightning Network has the following properties:
        <ul>
          <li>Near-zero percent transaction fees</li>
          <li>Instant transaction times</li>
          <li>Easy and simple to use wallets</li>
          <li>Anonymous transactions</li>
        </ul>
      </span>
    ),
  },
  {
    title: "How do I get a Lightning wallet?",
    detailHeight: "60px",
    detail: () => (
      <span>
        We would strongly recommend running your own Bitcoin and Lightning
        nodes. But we understand that some of us dont have the technical
        resources to set up our own nodes, or just lazy, in that case please
        reffer to{" "}
        <a
          href="https://99bitcoins.com/bitcoin/lightning-network/wallets/"
          target="_blank"
          rel="noopener noreferrer"
        >
          this
        </a>{" "}
        article to choose the wallet thats right for you.
      </span>
    ),
  },
  {
    title: "What is a debate?",
    detailHeight: "100px",
    detail: () => (
      <span>
        A debate is a topic that a user wants to find an answer too. A topic
        will have two opposing sides (pro/con, for/against). Any user can create
        a debate by providing a name, description, and locking up a stake that
        will initially signal the importance of the debate. Once the debate is
        inactive for 24 hours the debate will be marked as closed and the
        creator will receive their initially locked up stake.
      </span>
    ),
  },
  {
    title: "How is debate duration set?",
    detailHeight: "80px",
    detail: () => (
      <span>
        Debate ends 24 hours after it is created unless new evidence is added,
        which would extend the debate duration by another 24 hours.
      </span>
    ),
  },
  {
    title: "What is a vote in a debate?",
    detailHeight: "70px",
    detail: () => (
      <span>
        For any ongoing debate users can vote for a side by locking up a any
        amount. Votes on the winning majority stake side will receive the
        initial stake in addition to weighted fraction of the losing side stake.
        Votes on the losing minority side will lose all of their stake to the
        winning side.
      </span>
    ),
  },
  {
    title: "What is evidence in a debate?",
    detailHeight: "120px",
    detail: () => (
      <span>
        Evidence is a link to information that backs up that specific side of
        the debate. This can be news article, research paper, youtube video, or
        even a facebook post. Same rules apply to evidence and votes. For any
        ongoing debate users can provide evidence for a debate side by locking
        up a any amount. Evidence on the winning majority stake side will
        receive the initial stake in addition to weighted fraction of the losing
        side stake. Evidence on the losing minority side will lose all of their
        stake to the winning side. New evidence will extend debate duration by
        24 hours.
      </span>
    ),
  },
  {
    title: "Can I lose all my stake?",
    detailHeight: "40px",
    detail: () => (
      <span>
        You can lose the funds that you have staked in a debate if those funds
        are in the minority side.
      </span>
    ),
  },
  {
    title: "How do I win oposition's stake?",
    detailHeight: "80px",
    detail: () => (
      <span>
        You win a weighted fraction of the minority side&apos;s stake. The
        fraction size is determined on the size of your stake compared to the
        total winning side&apos;s stake. To help your side of the debate win,
        user should provide good evidence in favour of the side.
      </span>
    ),
  },
  {
    title: "What is your business model?",
    detailHeight: "40px",
    detail: () => (
      <span>
        We don&apos;t collect any data about our users. But we do charge 1% from
        the winning majority side&apos;s total winnings.
      </span>
    ),
  },
];
export default class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSections: {},
    };
  }

  render() {
    const { openSections } = this.state;
    const content = CONTENT.map((item, i) => (
      <div className="Help__section__item">
        <Toggle
          isFlat
          left={openSections[i]}
          leftText={item.title}
          leftIcon={<i className="fas fa-chevron-down" />}
          onChange={(toggle) => {
            openSections[i] = toggle;
            this.setState({ openSections });
          }}
        />
        <div
          className="Help__section__item__description"
          style={{ minHeight: openSections[i] ? item.detailHeight : "0px" }}
        >
          {openSections[i] && item.detail()}
        </div>
      </div>
    ));
    return (
      <div className="Help">
        <div className="Help__heading">Help</div>
        <div className="Help__section">
          <div className="Help__section__title">F.A.Q.</div>
          {content}
        </div>
      </div>
    );
  }
}
