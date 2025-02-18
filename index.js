document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value
  getUserProfile('userName')
})


async function user() {
  const response = await fetch('https://api.github.com/users/robertcastro86')
  return await response.json()
}

function getUserProfile(userName){
  user(userName).then(userData => {
    let userInfo = `
      <img src="${userData.avatar_url}" alt="foto do perfil do usuario" />
      <div class="data">
       <h1>${userData.name ?? 'Não possui nome cadastrado'}</h1>
       <p>${userData.bio ?? 'Não possui bio cadastrado'}</p>
       <p>${userData.location ?? 'Não possui localização cadastrado'}</p>
       <p>${userData.email ?? 'Não possui email cadastrado'}</p>
       <p>${userData.blog ?? 'Não possui blog cadastrado'}</p>
      </div>`

      document.querySelector('.profile-data').innerHTML = userInfo
  })
}
