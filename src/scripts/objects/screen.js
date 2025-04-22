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
    
    this.renderRepositories(user);
    this.renderEvents(user);
  },

  renderRepositories(user) {
    let repositoriesItens = '';
    
    user.repositories.forEach(repo => {
      repositoriesItens += `
        <li class="repository-item">
          <div class="repo-info">
            <a href="${repo.html_url}" target="_blank">
              <h3 class="repo-name">${repo.name}</h3>
            </a>
            <div class="repo-stats">
              <p><i class="fa-solid fa-code"></i> ${repo.language || 'Sem linguagem'}</p>
              <p><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</p>
              <p><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</p>
              <p><i class="fa-solid fa-eye"></i> ${repo.watchers_count}</p>
            </div>
          </div>
        </li>`;
    });
        
    if(user.repositories.length > 0){
      this.userProfile.innerHTML += `
        <div class="repositories section">
          <h2>Repositórios</h2>
          <ul class="repositories-list">${repositoriesItens}</ul>
        </div>`;  
    }
  },

  renderEvents(user) {
    let eventsItems = '';
    
    user.events.forEach(event => {
      if (event.type === 'PushEvent') {
        const repoName = event.repo.name;
        // Obtém a mensagem do commit (primeiro commit se houver vários)
        const message = event.payload.commits && event.payload.commits.length > 0 
          ? event.payload.commits[0].message 
          : 'Sem mensagem de commit';
        
        eventsItems += `
          <li>
            <strong>${repoName}</strong> - ${message}
          </li>`;
      } else if (event.type === 'CreateEvent') {
        const repoName = event.repo.name;
        const refType = event.payload.ref_type;
        
        eventsItems += `
          <li>
            <strong>${repoName}</strong> - Criou um ${refType}
          </li>`;
      }
    });
    
    if(user.events.length > 0){
      this.userProfile.innerHTML += `
        <div class="events-section section">
          <h2>Eventos Recentes</h2>
          <ul class="events-list">${eventsItems}</ul>
        </div>`;
    }
  },

  renderNotFound(){
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  }
};
    
export { screen };