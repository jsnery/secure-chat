# Secure Chat (WebApp Flask)

Secure Chat é uma aplicação web de bate-papo seguro desenvolvida com Flask. O projeto utiliza Firebase (Realtime Database) para armazenamento de dados cadastrais e JSON para armazenamento de alguns dados.

## Funcionalidades

- **Sistema de conversa por ID privado:** Permite que os usuários se comuniquem de forma privada através de um sistema de mensagens por ID.
- **Sistema de adição de amizade:** Usuários podem adicionar outros usuários como amigos dentro do aplicativo.
- **Armazenamento automático de salas privadas:** Armazena automaticamente salas de conversa privadas entre usuários.
- **Monitoramento de conversa com amigos em tempo real:** Monitora conversas em tempo real entre amigos, proporcionando uma experiência de bate-papo em tempo real.

## Como Configurar

1. **Crie seu Realtime Database no [Firebase](https://firebase.google.com/)**:
   - Acesse o console do Firebase e crie um novo projeto e um banco de dados Realtime.

2. **Gere sua SDK Firebase**:
   - Após criar o banco de dados, gere as credenciais da sua conta Firebase, incluindo a criação de um arquivo JSON (`auth.json`) com informações de autenticação.

3. **Substitua o conteúdo do JSON**:
   - Substitua o conteúdo do arquivo `auth.json` com as informações da sua conta Firebase:
     ```json
     {
       "type": "",
       "project_id": "",
       "private_key_id": "",
       "private_key": "",
       "client_email": "",
       "client_id": "",
       "auth_uri": "",
       "token_uri": "",
       "auth_provider_x509_cert_url": "",
       "client_x509_cert_url": "",
       "universe_domain": ""
     }
     ```

4. **Cole o link do seu banco de dados**:
   - No arquivo `app/models/json_base.py`, na linha 27, cole o link do seu banco de dados Realtime Firebase:
     ```python
     firebase_init(
         'auth.json',
         'https://seudb-rtdb.firebaseio.com/'
     )
     ```

## Execução

1. Clone este repositório:
    ```bash
    git clone https://github.com/jsnery/secure_chat.git
    ```

2. Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```

3. Execute o servidor Flask:
    ```bash
    python run.py
    ```

4. Acesse o aplicativo em um navegador da web:
    ```
    http://localhost:5000
    ```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/richardneri/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jsnery)
