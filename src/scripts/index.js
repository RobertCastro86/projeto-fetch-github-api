import { getUser } from '../src/scripts/objects/user.js'
import { getUserRepositories } from './services/repositories';

document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value;
  getUserProfile(userName);
})

document.getElementById('input-search').addEventListerner('keyup', (e) => {
  const userName = e.target.value;
  const key = e.witch || e.keycode;
  const isEnterKeyPressed = key === 13;
  
  if(isEnterKeyPressed){
    clearTimeout(timeoutId);
    timeoutId = setTimeout (()=> {
    getUserProfile(userName);
  }, 300);
}
});


async function getUserProfile(userName){
  try {
    const userData = await getUser(userName);

    let userInfo = `<div class="info">
      <img src="${userData.avatar_url}" alt="foto do perfil do usuario" />
      <div class="data">
         <h1>${userData.name ?? 'Não possui nome cadastrado'}</h1>
         <p>${userData.bio ?? 'Não possui bio cadastrada'}</p>
      </div>
      </div>`;

      document.querySelector('.profile-data').innerHTML = userInfo;

      const reposData = await getUserRepositories(userName);

      let repositoriesItens = '<h2>Repositórios</h2><ul>';
      reposData.forEach(repo => {
        repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
      });
      repositoriesItens += '</ul>';

      document.querySelector('.profile-data').innerHTML +=`<div class="repositories section">
      <h2>Repositórios</h2>
      <ul>${repositoriesItens}</ul></div>`;
  } catch(error){
    console.error(error);
    document.querySelector('.profile-data').innerHTML = "<p>Usuário não encontrado</p>";
   }
  }

getUserRepositories()