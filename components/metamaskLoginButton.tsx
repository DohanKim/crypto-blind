import React, { Component } from "react";
import { useEffect } from "react";
import useCryptoBlindStore from "../stores/useCryptoBlindStore";

const MetamaskLoginButton = () => {
  const ethereum = useCryptoBlindStore((s) => s.wallet.ethereum);
  const connected = useCryptoBlindStore((s) => s.wallet.connected);
  const address = useCryptoBlindStore((s) => s.wallet.address);
  const set = useCryptoBlindStore((s) => s.set);

  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts[0]);
      set((state) => {
        state.wallet.address = accounts[0];
        if (accounts[0]) {
          state.wallet.connected = true;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDisconnect = async () => {
    set((state) => {
      state.wallet.connected = false;
    });
  };

  return connected ? (
    <div>
      connected: {address}
      <button onClick={onClickDisconnect}>disconnect</button>
    </div>
  ) : (
    <button onClick={onClickConnect}>connect</button>
  );
};

export default MetamaskLoginButton;
