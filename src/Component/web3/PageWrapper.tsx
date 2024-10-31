import { useAccount } from "wagmi";
import Minting from "./Minting";

const PageWrapper = () => {
  const { isConnected } = useAccount();

  if (!isConnected) return <div></div>;

  return (
    <div>
      <Minting />
    </div>
  );
};

export default PageWrapper;
