const SUPABASE_URL = 'https://fhtakxinyazmtcravwxo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_UaR4tZLGKBfSLKgcLYC8_Q_gibKwQ3X';

async function fetchData() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
}

fetchData()