const screen = {
  userProfile: document.querySelector('.profile-data'),
  renderUser(user){
    this.userProfile.innerHTML = `<div class="info">
      <img src="${user.avatarUrl}" alt="foto do perfil do usuario" />
      <div class="data">
        <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
        <p>Login: <span>@${user.userName}</span></p>
        <p>${user.bio ?? 'Não possui bio cadastrado'}</p>
        <div class="follow-info">
          <p>👥 <span>${user.followers}</span> seguidores</p>
          <p>👤 <span>${user.following}</span> seguindo</p>
        </div>
      </div>
    </div>`
    
    let repositoriesItens = ''
    user.repositories.forEach( repo => repositoriesItens +=`<li><a href="${repo.html_url}"target="_blank">${repo.name}</li>`)
        
    if(user.repositories.length > 0){
      this.userProfile.innerHTML += `<div class="repositories section">
      <h2>Repositórios</h2>
      <ul>${repositoriesItens}</ul></div>`  
    }
  },

  renderNotFound(){
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
  }
}
    
export { screen }