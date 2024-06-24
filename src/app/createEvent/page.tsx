"use client";
import WalletBar from "@/components/WalletBar";
import React, { useState, useMemo } from "react";
import { useContract, useContractWrite, useContractRead, useAccount, useNetwork } from "@starknet-react/core";
import { sepolia } from "@starknet-react/chains";
import eventsRegistryABI from "./components/eventsRegistryABI.json";

// const testAddress = "0x0129f4b841ef7c2e2e9d0845b8ba3f04b376c36bef4f2c1e35fa602b20d8fced";


export default function CreateEvent() {
    const [eventName, setEventName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");

    // Setting up usecontractwrite
    const address  = '0x52ec9bf5004d1f143771769a2514bb48bfbf3d3bcde989aaea106fbc71e2f31';
    const { chain } = useNetwork();
    const { contract } = useContract({ abi: eventsRegistryABI , address: address });

    const calls = useMemo(() => {
        if(!address || !contract) return [];
        return contract.populateTransaction["publish_new_event"]!(eventName);
    }, [contract, eventName]);

    const { writeAsync, data, isPending } = useContractWrite({ calls });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the contract function with form values
        await writeAsync();
    };

    return(
        <main className="flex flex-col items-center justify-center min-h-screen mt-12">
            <h1 className="text-3xl mb-6"> Create A New Event</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
                    type="text"
                    placeholder="Event Name"
                    className="border p-2"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    className="border p-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    className="border p-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    className="border p-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Capacity"
                    className="border p-2"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Submit</button>
            </form>
        </main>
    );
} 

