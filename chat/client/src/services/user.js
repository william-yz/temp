import xFetch from './xFetch';

export async function login(user) {
  return xFetch('http://localhost:3000/api/login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
}
