export async function getUserData(fields = [], token) {

    const url = new URL('https://oirf.online/app/api/user');
    if (fields.length > 0) {
      url.searchParams.append('fields', fields.join(','));
    }
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }
  
      const data = await response.json();
      //console.log('User data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
}

  