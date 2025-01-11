import { useReadContract } from "thirdweb/react";

// Define or import the contract details
const contract = {
  address: '0xca23b56486035e14F344d6eb591DC27274AF3F47',
  abi: [
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
};

export default function Component() {
  const account = '0xDdF99A33c49884792a89bD8DE9474138e4E0350a';

  const { data, isLoading, error } = useReadContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'balanceOf',
    args: [account],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Balance: {data?.toString()}</div>;
}
