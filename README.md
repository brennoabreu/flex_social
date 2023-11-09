## Projeto flex social

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

## Menu

- 💻 [Ambiente](#ambiente)
- 🎲 [Rodando o back end](#rodando-o-back-end)
- 🤝 [Colaboradores](#colaboradores)
- 📝 [Licença](#licença)

## Ambiente

### Como configurar seu ambiente de desenvolvimento

Neste guia iremos mostrar o passo a passo para preparar o seu ambiente.

 - Instale o Ubuntu 20.04 LTS wsl2 no Windows 10 ou 11
   ```sh
   https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview
   ```

 - Dê o comando abaixo no Linux wsl2 para instalar os compiladores e todas as dependências de desenvolvimento.
   ```sh
   sudo apt install build-essential default-jdk libssl-dev exuberant-ctags ncurses-term ack-grep silversearcher-ag fontconfig imagemagick libmagickwand-dev software-properties-common git vim-gtk3 curl zsh -y
   ```

 - Instale o Node.js versão LTS.
     1. Baixe e importe a chave Nodesource GPG
        ```sh
        sudo apt-get update
        sudo apt-get install -y ca-certificates curl gnupg
        sudo mkdir -p /etc/apt/keyrings
        curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
        ```
     2. Crie repositório deb
        ```sh
        NODE_MAJOR=20
        echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
        ```
     3. Execute a atualização e instale
        ```sh
        sudo apt-get update
        sudo apt-get install nodejs -y
        ```
   
 - Instale o ![Docker](https://img.shields.io/badge/-Docker-333333?style=flat&logo=docker)
     - Remova versões antigas
       ```sh
       sudo apt-get remove docker docker-engine docker.io containerd runc
       ```
     - Instale dependências
       ```sh
        sudo apt update && sudo apt upgrade
        sudo apt remove docker docker-engine docker.io containerd runc
        sudo apt-get install \
            apt-transport-https \
            ca-certificates \
            curl \
            gnupg \
            lsb-release
       ```
     - Baixe o Docker Engine
       ```sh
       curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg echo \ "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
       ```
     - Instale o Docker Engine
       ```sh
       sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
       ```
     - Dê permissão para rodar o Docker com seu usuário corrente      
       ```sh
       sudo usermod -aG docker $USER
       ```
     - Reinicie o WSL via linha de comando do Windows para que não seja necessário autorização root para rodar o comando docker
        ```sh
        wsl --shutdown
        ```
     - Teste
       ```sh
       docker --version
       docker compose version
       ```
 - Utilidades      
   - ![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-333333?style=flat&logo=visual-studio-code&logoColor=007ACC)
   - ![Insomnia](https://img.shields.io/badge/-Insomnia-333333?style=flat&logo=insomnia)
   - ![Postman](https://img.shields.io/badge/-Postman-333333?style=flat&logo=postman)
   - ![DevDocs](https://devdocs.io/)
   - ![Git](https://img.shields.io/badge/-Git-333333?style=flat&logo=git)
   - ![GitHub](https://img.shields.io/badge/-GitHub-333333?style=flat&logo=github)

## Rodando o back end




## Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/16327482?v=4" width="100px;" alt="Foto do breno"/><br>
        <sub>
          <b>Breno Luiz</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/149905656?v=4" width="100px;" alt="Foto do Steve Jobs"/><br>
        <sub>
          <b>Luiz Eduardo</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/48069924?v=4" width="100px;" alt="Foto do Tálisson no GitHub"/><br>
        <sub>
          <b>Tálisson Bruno</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Licença

Este projecto está licenciado nos termos do [MIT license](/LICENSE.md).
