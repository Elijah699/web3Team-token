import {
  useAccount,
  useReadContract,
  useTransactionConfirmations,
  useWriteContract,
} from "wagmi";
import { erc20Abi } from "../lib/contracts/erc-20-abi";
import { useState } from "react";
import { parseEther } from "viem";

const nftMintingContract = {
  address: import.meta.env.VITE_ERC20_CONTRACT_ADDRESS as `0x${string}`,
  abi: erc20Abi,
};

const Minting = () => {
  const [minting, setMinting] = useState<boolean>(false);
  const { address } = useAccount();

  const { data, refetch } = useReadContract({
    ...nftMintingContract,
    functionName: "totalSupply",
  });
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { isPending: isConfirming, isSuccess: isConfirmed } =
    useTransactionConfirmations({
      hash,
    });

  async function handleMint() {
    if (!address) {
      console.log("connect to a wallet address");
      return;
    }
    setMinting(true);

    try {
      await writeContract({
        ...nftMintingContract,
        functionName: "mint",
        args: [1],
        value: parseEther("0.0001"),
      });

      await refetch();
    } catch (error) {
      console.error("Minting error:", error);
    } finally {
      setMinting(false);
    }
  }

  console.log("Total supply", data);

  return (
    <div>
      <span>
        {data ? data.toString() : 0} / <span>50</span>{" "}
      </span>
      <button
        className="bg-blue-400"
        onClick={handleMint}
        disabled={minting || isPending}
      >
        {minting || isPending ? "Mint..." : "Mint Now"}
      </button>

      {hash && (
        <div>
          <a
            href={`https://etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in an explorer
          </a>
          {isConfirming && <div>Waiting for confirmation</div>}
          {isConfirmed && <div>Transaction confirmed</div>}
        </div>
      )}
    </div>
  );
};

export default Minting;
