import create, { State } from "zustand";
import produce from "immer";

interface CryptoBlindStore extends State {
  wallet: {
    installed: boolean;
    connected: boolean;
    ethereum: any;
    address: string;
  };
  set: (x: any) => void;
  actions: {
    [key: string]: (args?) => void;
  };
}

interface WindowWithEthereum extends Window {
  ethereum: any;
}

const useCryptoBlindStore = create<CryptoBlindStore>((set, get) => {
  return {
    wallet: {
      installed: false,
      connected: false,
      ethereum: undefined,
      address: undefined,
    },
    set: (fn) => set(produce(fn)),
    actions: {
      checkMetamask: async () => {
        let windowWithEthereum = window as WindowWithEthereum &
          typeof globalThis;
        const { ethereum } = windowWithEthereum;
        const installed = ethereum && ethereum.isMetaMask;
        let connected = false;
        let account;

        if (installed) {
          const accounts = await ethereum.request({ method: "eth_accounts" });

          console.log(accounts);
          if (accounts) {
            connected = true;
            account = accounts[0];
          }
        }

        set((state) => {
          state.wallet.ethereum = ethereum;
          state.wallet.installed = installed;
          state.wallet.connected = connected;
          state.wallet.address = account;
        });
      },
    },
  };
});

export default useCryptoBlindStore;
