import React, { Component } from "react";
import "./Help.scss";
import Toggle from "../components/Toggle";

const CONTENT = [
  {
    title: "What is Defy.fyi?",
    detailHeight: "200px",
    detail: () => (
      <span>
        This platform allows users to collaborate and find answers to a debate
        topic by attaching a price to the information. Unlike other social
        debate platforms, Defy cuts out the noise by attaching value to each
        debate. You have a financial incentive to research and provide strong
        evidence to your side of the debate. The winning side takes it all.
        <br />
        <ul>
          <li>Debates have two sides, Pro and Con</li>
          <li>
            The side with the majority vote wins all the stake at the end of the
            debate
          </li>
          <li>Debate closes in 24 hours unless new evidence is added</li>
          <li>You can vote by locking up sats(unit of Bitcoin)</li>
          <li>
            Forms of evidence include but not limited to research papers, tweets
            or youtube videos
          </li>
          <li>
            The stake amount for new evidence has to be greater than previous
          </li>
          <li>
            Winning side receives their stake back plus the matching fraction of
            the losing side
          </li>
          <li>Losing side loses their stake</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Why Bitcoin?",
    detailHeight: "60px",
    detail: () => (
      <span>
        The simplest way to open the platform to as many people as possible with
        we decided to support only Bitcoin.
      </span>
    ),
  },
  {
    title: "Why Lightning network?",
    detailHeight: "150px",
    detail: () => (
      <span>
        Everyone loves Bitcoin! But due to its monetary policy the base-layer is
        not optimal for micro-payments. You wouldn&apos;t go to a central bank
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
        We strongly recommend running your own Bitcoin and Lightning nodes. We
        understand that some users don&apos;t have the resources to set up our
        own nodes, in this case please refer to{" "}
        <a
          href="https://99bitcoins.com/bitcoin/lightning-network/wallets/"
          target="_blank"
          rel="noopener noreferrer"
        >
          this
        </a>{" "}
        article to choose the wallet that&apos;s right for you.
      </span>
    ),
  },
  {
    title: "What is a debate?",
    detailHeight: "100px",
    detail: () => (
      <span>
        A debate is a discussion with opposing viewpoints. A topic will have two
        opposing sides (pro/con or for/against). Any user can create a debate by
        providing a name, description, and locking up a stake that will set the
        initial weight of the debate. Once the debate is inactive for 24 hours
        the debate will be closed and the creator will receive their initially
        locked up stake.
      </span>
    ),
  },
  {
    title: "How is debate duration set?",
    detailHeight: "40px",
    detail: () => (
      <span>
        Debate ends 24 hours after it is created unless new evidence is added,
        which would extend the debate duration by another 24 hours.
      </span>
    ),
  },
  {
    title: "What is the difference between vote and evidence?",
    detailHeight: "70px",
    detail: () => (
      <span>
        Evidence requires you to attach a link supporting your argument, and a
        set minimum stake amount. A vote does not require a link and there is no
        set minimum stake amount.
      </span>
    ),
  },
  {
    title:
      "Why does my stake have to be greater than the previous amount posted?",
    detailHeight: "40px",
    detail: () => (
      <span>This prevents debates from continuing indefinitely.</span>
    ),
  },
  {
    title: "Can I lose all my stake?",
    detailHeight: "40px",
    detail: () => (
      <span>
        You can lose the funds that you have staked in a debate if those funds
        are on the losing side.
      </span>
    ),
  },
  {
    title: "How do I win the opposition's stake?",
    detailHeight: "80px",
    detail: () => (
      <span>
        You win a matching percentage of the minority side&apos;s stake. The
        percentage is determined on the size of your stake compared to the total
        winning side&apos;s stake, i.e. if your stake is 10% of the
        majority&apos;s side, you will receive your stake plus 10% of the
        minority&apos;s side. To help a side of the debate win, users should
        provide good evidence in favour of the side.
      </span>
    ),
  },
  {
    title: "What is your business model?",
    detailHeight: "40px",
    detail: () => (
      <span>
        We charge 1% from the winning majority side&apos;s total winnings.
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
