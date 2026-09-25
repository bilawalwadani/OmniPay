const API_URL = 'https://omnipaybilawal-f2b3aehkgggjcjhx.southeastasia-01.azurewebsites.net/api';
export interface WalletUserLookupDto {
  walletId: string;
  name: string;
}

export async function searchUsers(query: string): Promise<WalletUserLookupDto[]> {
  if (!query) return [];
  try {
    const res = await fetch(`${API_URL}/Wallets/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Error searching users:', e);
    return [];
  }
}

let cachedToken: string | null = null;

export async function getAuthToken(): Promise<string | null> {
  if (cachedToken) return cachedToken;
  try {
    const res = await fetch(`${API_URL}/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password123' })
    });
    if (!res.ok) return null;
    const data = await res.json();
    cachedToken = data.token;
    return cachedToken;
  } catch (e) {
    console.error('Error getting auth token:', e);
    return null;
  }
}

export async function transferFunds(senderId: string, receiverId: string, amount: number): Promise<{success: boolean, message: string}> {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error('Authentication failed');

    const res = await fetch(`${API_URL}/Transactions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ senderId, receiverId, amount })
    });

    if (res.ok) {
      return { success: true, message: 'Transfer completed successfully!' };
    } else {
      const errorText = await res.text();
      return { success: false, message: errorText || 'Transfer failed.' };
    }
  } catch (e: any) {
    console.error('Error transferring funds:', e);
    return { success: false, message: e.message || 'An error occurred' };
  }
}
