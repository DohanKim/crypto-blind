import { useEffect } from "react";
import useCryptoBlindStore from "../stores/useCryptoBlindStore";

const SECONDS = 1000;
const _SLOW_REFRESH_INTERVAL = 20 * SECONDS;

const useHydrateStore = () => {
  const actions = useCryptoBlindStore((s) => s.actions);
  const address = useCryptoBlindStore((s) => s.wallet.address);

  useEffect(() => {
    actions.fetchAddressBadge();
  }, [address]);
};

export default useHydrateStore;
