import { getUser } from '..services/user.js';
//

async function getUser(userName) {
  const response = await fetch(`${baseUrl}/${userName}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export { getUser };