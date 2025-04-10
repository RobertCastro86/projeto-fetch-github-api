import { baseUrl, repositoriesQuantity } from '../variables.js';

async function getUserRepositories(userName) {
  const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export { getUserRepositories };
// Compare this snippet from src/scripts/services/user.js: