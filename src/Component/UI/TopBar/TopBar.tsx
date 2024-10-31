import { useAccount, useConnect, useDisconnect } from "wagmi";

function TopBar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleButtonClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      const metaMaskConnector = connectors.find(
        (connector) => connector.name === "MetaMask"
      );
      if (metaMaskConnector) connect({ connector: metaMaskConnector });
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      type="button"
      style={{ padding: "10px", fontSize: "16px" }}
    >
      {isConnected ? `Connected: ${address}` : "Connect to MetaMask"}
    </button>
  );
}

export default TopBar;
