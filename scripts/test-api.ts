import { PearApiClient } from '../src/lib/pear-api';

// Polyfill localStorage for Node environment if needed, or just let the class handle it gracefully
// The class checks typeof window, so it should be fine.

async function main() {
    const apiKey = '10f9ecdd43734f3c9c384a27ff843fc761914f5a7b272b2c91cd7f3910c6de26';
    // Use a random address or a known one just for the "login" call payload
    const testAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // vitalik.eth

    console.log("🚀 Starting Pear API Auth Test...");
    const api = new PearApiClient();

    try {
        // 1. Login
        console.log(`\n🔑 Attempting Login with API Key...`);
        const loginRes = await api.login(testAddress, apiKey);
        console.log("✅ Login Successful!");
        console.log("   Access Token:", loginRes.accessToken?.slice(0, 20) + "...");

        // Set tokens manually since localStorage won't work/persist here
        api.setTokens(loginRes.accessToken, loginRes.refreshToken);

        // 2. Check Agent Wallet
        console.log(`\n🕵️  Checking Agent Wallet...`);
        const agentWallet = await api.getAgentWallet();
        if (agentWallet) {
            console.log("✅ Agent Wallet Found:", agentWallet);
        } else {
            console.log("⚠️  No Agent Wallet found (This might be expected if not created yet)");
        }

        // 3. Sanity Check - Accounts
        console.log(`\n🏥 Running Sanity Check (getAccounts)...`);
        const accounts = await api.getAccounts();
        console.log("✅ Sanity Check Passed:", accounts ? "Data received" : "No data");

    } catch (error: any) {
        console.error("\n❌ Test Failed:", error.messge || error);
        if (error.response) {
            console.error("   Status:", error.response.status);
            console.error("   Data:", JSON.stringify(error.response.data, null, 2));
        }
    }
}

main();
