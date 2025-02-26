import { getUser } from '/src/scripts/services/user.js'
import { getUserRepositories } from './services/repositories';

document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value;
  getUserProfile(userName);
})

document.getElementById('input-search').addEventListerner('keyup', (e) => {
  const userName = e.target.value;
  const key = e.key;
  const isEnterKeyPressed = key === "Enter";
  
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

    let userInfo = `
      <img src="${userData.avatar_url}" alt="foto do perfil do usuario" />
      <div class="data">
         <h1>${userData.name ?? 'Não possui nome cadastrado'}</h1>
         <p>${userData.bio ?? 'Não possui bio cadastrado'}</p>
      </div>`;

      document.querySelector('.profile-data').innerHTML = userInfo;

      const reposData = await getUserRepositories(userName);

      let repositoriesItens = '<h2>Repositórios</h2><ul>';
      reposData.forEach(repo => {
        repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
      });
      repositoriesItens += '</ul>';

      document.querySelector('.profile-data').innerHTML += repositoriesItens;
  } catch(error){
    console.error(error);
    document.querySelector('.profile-data').innerHTML = "<p>Usuário não encontrado</p>";
   }
  }

getUserRepositories()