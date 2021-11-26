import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useCryptoBlindStore from "../stores/useCryptoBlindStore";
import MetamaskOnboarding from "@metamask/onboarding";

const MetamaskInstallButton = () => {
  const set = useCryptoBlindStore((s) => s.set);
  const [onboarding, setOnboarding] = useState<MetamaskOnboarding>();

  useEffect(() => {
    const host = window.location.host;
    setOnboarding(new MetamaskOnboarding({ forwarderOrigin: host }));
  }, []);

  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  return <button onClick={onClickInstall}>install</button>;
};

export default MetamaskInstallButton;
