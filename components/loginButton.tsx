import React, { Component } from "react";
import { useEffect } from "react";
import useCryptoBlindStore from "../stores/useCryptoBlindStore";
import MetamaskInstallButton from "./metamaskInstallButton";
import MetamaskLoginButton from "./metamaskLoginButton";

const LoginButton = () => {
  const installed = useCryptoBlindStore((s) => s.wallet.installed);
  const checkMetamask = useCryptoBlindStore((s) => s.actions.checkMetamask);

  useEffect(() => {
    checkMetamask();
  }, []);

  return (
    <div>{installed ? <MetamaskLoginButton /> : <MetamaskInstallButton />}</div>
  );
};

export default LoginButton;
