document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value
  getUserProfile('userName')
})

document.getElementById('input-search').addEventListerner('keyup', (e) => {
  const userName = e.target.value
  const key = e.whitch || e.keyCode
  const isEnterKeyPressed = key === 13
  
  if(isEnterKeyPressed){
    getUserProfile(userName)
  }
})



async function user(userName) {
  const response = await fetch('https://api.github.com/users/${userName}/repos')
  return await response.json()
}

async function repos(userName) {
  const response = await fetch('https://api.github.com/users/${userName}/repos')
  return await response.json()
}

function getUserProfile(userName){
  repos(userName).then(userData => {
    let userInfo = `
      <img src="${userData.avatar_url}" alt="foto do perfil do usuario" />
      <div class="data">
         <h1>${userData.name ?? 'Não possui nome cadastrado'}</h1>
         <p>${userData.bio ?? 'Não possui bio cadastrado'}</p>
      </div>`

      document.querySelector('.profile-data').innerHTML = userInfo
  })

  function getUserRepositories(userName){
    repos(userName).then(reposData => {
      let repositoriesItem = ''

      reposData.forEach(repo => {
        repositoriesItens += '<li><a href="${repo.html_url}">${repo.name}</a></li>'
      })
        
  })
  }
}
