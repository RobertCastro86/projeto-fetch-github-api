// Autor: Robert Castro
import { getUser } from './services/user.js';
import { getRepositories } from './services/repositories.js';

import { screen } from './objects/screen.js';
import { user } from './objects/user.js';

document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value;
  if(validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if(isEnterKeyPressed){
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName){
  if(userName.length === 0) {
    alert('Preencha o campo com o nome do usuário do GitHub');
    return true;
  }
  return false;
}

async function getUserData(userName){
  try {
    const userResponse = await getUser(userName);

    if(userResponse.message === "Not Found"){
      screen.renderNotFound();
      return;
    }

    const repositoriesResponse = await getRepositories(userName);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);

    screen.renderUser(user);
  } catch (error) {
    console.error(error);
    screen.renderNotFound();
  }
}