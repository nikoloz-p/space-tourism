// load API data
let data = null;

export async function loadApiData() {
    if (data) return data;

    const result = await fetch('https://raw.githubusercontent.com/bekkalomsadze/API-space-tourism/refs/heads/main/data.json');
    data = await result.json();
    
    return data;
}
