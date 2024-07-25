// index.mjs

import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

// Replace with the actual Solana API URL
const API_URL = 'https://api.mainnet-beta.solana.com';

app.get('/transactions/:walletAddress', async (req, res) => {
    const walletAddress = req.params.walletAddress;

    try {
        // Fetch the transaction signatures for the given wallet address
        const response = await axios.post(API_URL, {
            jsonrpc: '2.0',
            id: 1,
            method: 'getConfirmedSignaturesForAddress2',
            params: [walletAddress]
        });

        // Return the transaction data including the wallet address
        res.json({
            walletAddress,
            transactions: response.data.result
        });
    } catch (error) {
        // Handle any errors that occur
        console.error('Error fetching transaction data:', error);
        res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
