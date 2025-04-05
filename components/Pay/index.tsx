"use client";
// import {
//   MiniKit,
//   tokenToDecimals,
//   Tokens,
//   PayCommandInput,
// } from "@worldcoin/minikit-js";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMap } from "../Map/MapContext";

interface User {
  id: string;
  email: string;
  holderAddress: string;
}

export const PayBlock = ({ toAddress }: any) => {
  const [amount, setAmount] = useState(0.1); // Default amount

  // Set loading to true immediately on component mount
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpending, setIsSpending] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const { toast } = useToast();
  const { showSuccess } = useMap();
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handlePay = async (toAddress: any, amount: any) => {
    console.log("hello");
    // if (!user || !withdrawAddress || balance === 0) return;

    setIsWithdrawing(true);
    try {
      const response = await fetch(
        `/api/holders/c5830426-7c02-4a96-86de-f4f2054f80fd/withdraw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenAddress: "0x749535cb84568ff3ea7219e334b459bd27a17721",
            amount: 1,
            toAddress: "0x98692B795D1fB6072de084728f7cC6d56100b807",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to withdraw tokens");
      }

      // Optimistically update the balance to 0 after withdrawal
      setBalance(0);

      toast({
        title: "Success!",
        description: `You withdrew ${balance} tokens to ${withdrawAddress}`,
      });

      showSuccess("donation successful");

      setWithdrawAddress("");

      // Fetch the actual balance after a short delay to ensure consistency
      // setTimeout(async () => {
      //   if (user) {
      //     await fetchBalance(user.id);
      //   }
      // }, 2000);
    } catch (error) {
      console.error("Error withdrawing tokens:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to withdraw tokens",
        variant: "destructive",
      });
      // Refresh balance to ensure accuracy after error
      // if (user) {
      //   await fetchBalance(user.id);
      // }
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    // <button className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground w-full px-3 py-2 md:px-4 md:py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
    //   onClick={() => handlePay(toAddress)}>
    //   <Heart className="w-4 h-4" />
    //   Donate
    // </button>

    <div className="flex flex-col items-center gap-2">
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-full px-3 py-2 border rounded-md"
        min="0.01"
        step="0.01"
        placeholder="Enter amount"
      />
      <button
        className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground w-full px-3 py-2 md:px-4 md:py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
        onClick={() => handlePay(toAddress, amount)}
      >
        <Heart className="w-4 h-4" />
        Donate
      </button>
    </div>
  );
};
