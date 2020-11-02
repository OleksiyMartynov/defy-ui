import React from "react";
import "./Deposit.scss";
import moment from "moment";
import QRCode from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepositInvoice, fetchInvoiceInfo } from "../actions/payment";
import CountdownCounter from "../components/CountdownCounter";
import Button from "../components/Button";
import { Loader } from "../components/Loader";
import { ToastDAO, DialogDAO } from "../constants";
import { fetchAccountInfo } from "../actions/account";
import { useLifecycle } from "../utils/Hooks";

let pollerId;
const Deposit = () => {
  const dispatch = useDispatch();
  const [, updateModals] = DialogDAO.useRepoDataModel();
  const [, updateToast] = ToastDAO.useRepoDataModel();
  useLifecycle(
    () => {
      console.log("onAttach");
      const fetchData = async () => {
        const result = await dispatch(fetchDepositInvoice());
        if (result?.data?.invoice?.data) {
          const invoice = result?.data?.invoice?.data;
          pollerId = setInterval(async () => {
            const invoiceResult = await dispatch(fetchInvoiceInfo(invoice));
            if (invoiceResult?.data?.invoice?.status === "paid") {
              updateModals.reset();
              dispatch(fetchAccountInfo()); // todo: change to AccountDAO model
              updateToast.toggleToast("Deposit successful");
            }
          }, 5 * 1000);
        }
      };
      fetchData();
    },
    () => {
      console.log("onDetached");
      clearInterval(pollerId);
    }
  );

  const depositInvoice = useSelector((state) => state.depositInvoice); // todo: chage to DAO model
  return (
    <div className="Deposit">
      <div className="Deposit__content">
        <div className="Deposit__heading">Deposit Funds</div>
        {depositInvoice.loading && <Loader />}
        {depositInvoice.error && <div>Error making deposit</div>}
        {depositInvoice.data && (
          <>
            <span>
              Scan or copy the lightning invoice below into your Lightning
              wallet in order to deposit funds
            </span>
            <br />
            <div className="Deposit__banner">
              <div className="Deposit__banner__inner">
                <QRCode
                  renderAs="svg"
                  style={{ width: "100%", height: "auto" }}
                  value={depositInvoice.data.invoice.data}
                />
              </div>
            </div>
            <div className="Deposit__invoice">
              <input
                disabled
                type="text"
                value={depositInvoice.data.invoice.data}
              />
              <CopyToClipboard
                text={depositInvoice.data.invoice.data}
                onCopy={() => updateToast.toggleToast("Text coppied")}
              >
                <Button secondary onClick={() => {}}>
                  <i className="far fa-clipboard" aria-hidden="true"></i>
                </Button>
              </CopyToClipboard>
            </div>
            <div className="Deposit__expiry">
              <CountdownCounter
                format
                interval={1000}
                endTime={moment(
                  depositInvoice.data.invoice.expiryTimestamp
                ).unix()}
              />
            </div>
            <div className="Deposit__spinner">
              <i className="fas fa-spinner fa-4x" aria-hidden="true" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Deposit;
