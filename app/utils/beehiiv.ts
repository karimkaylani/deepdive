'use server'
export const isBeehiivPremium = async(email: string) => {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions/by_email/${email}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY} `
        }
    })

    if (!res.ok) {
        return false
    }

    const json = await res.json()
    const data = json['data']
    return data['status'] === 'active' && data['subscription_tier'] === 'premium'
    // return data['status'] === 'active'
}