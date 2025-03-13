
# Copibo

## Descrição ℹ️
Copibo é um aplicativo que une **gamificação** e **cidadania**, incentivando as pessoas a realizarem atividades físicas, visitarem pontos turísticos, consumirem cultura local e movimentarem a economia através da participação em desafios para ganhar recompensas enquanto cuidam da saúde e da cidade.

## Desafio 2 🚀
Desafio Gamificação no Conecta Recife: Como podemos ampliar a participação popular e estimular boas práticas cidadãs por meio da gamificação e da moeda Capiba no Conecta Recife?

## Funcionalidades 📋
1. **Cadastro e login de usuários**  
   - Integração com o backend (Supabase) para armazenamento seguro dos dados de login.
     
2. **Desafios e Gamificação**  
   - Usuário ganha recompensas ao cumprir metas (andar de bicicleta, caminhar, visitar locais, etc.).

3. **Mapas e rotas**  
   - Exibe a localização do usuário em tempo real (via expo-location).
   - Calcula rota manual até CapiPontos (MapView, markers).
   - Possível ver tempo e distância para chegar via caminhada, bicicleta e carro.
   - No backend está hospedado diversos CapiPontos de museus e mercados públicos através dos [Dados Abertos da Prefeitura do Recife](http://dados.recife.pe.gov.br/pt_BR/dataset/roteiros-culturais-turismo-e-lazer).

4. **Escaneamento de QR Code**  
   - Usa expo-image-picker para abrir a câmera e fazer a leitura do QR code.
   - Integração com Supabase para atualizar valores na Carteira do usuário (capipontos, capiba, etc.) sempre que um QR Code for escaneado

4. **Carteira de pontos**  
   - Exibe estatísticas de km andados, capipontos, capiba e CO₂ evitados quando você opta por caminhar/andar de bicicleta.
   - Consulta em tempo real ao banco (Supabase) sempre que a tela é aberta/focada.

## Tech Stack ⚙️

### Frontend
- ![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

#### Bibliotecas e APIs do Frontend
- **expo-location**: para obter a localização do usuário.  
- **react-native-maps**: para exibir mapas e markers.  
- **expo-image-picker**: para a leitura de QR code via câmera.  
- **@expo/vector-icons**: para ícones do MaterialCommunityIcons, Ionicons, etc.

### Backend
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

#### Bibliotecas e APIs do Backend
- **PostgreSQL** (via Supabase): armazenamento de dados (carteira, usuário).
- **Supabase Auth** (opcional): se estiver usando login/registro pelo Supabase.
- **Supabase JavaScript Client**: para comunicação entre o app e o banco.

## Equipe 🏆

**Gabriella Graciano de Souza**  
📧 E-mail: [gabifc_graciano@hotmail.com](mailto:gabifc_graciano@hotmail.com)  
🖋️ Behance: [behance.net/gabygraciano](https://www.behance.net/gabygraciano)  
🌐 GitHub: [github.com/gabygraciano](https://github.com/gabygraciano)

**Wictor Mannuel Domingos de Melo**  
📧 E-mail: [wictormannuel@gmail.com](mailto:wictormannuel@gmail.com)  
🌐 GitHub: [github.com/Wictor0](https://github.com/Wictor0)

**Luís Vinicius Lauriano de França**  
📧 E-mail: [luislauriano@outlook.com.br](mailto:luislauriano@outlook.com.br)  
🌐 GitHub: [github.com/luislauriano](https://github.com/luislauriano)

---

## Documentação 📄

- [Figma](https://www.figma.com/design/c083sXMHGeONJrSzYSbU3n/CapibaGo?node-id=0-1&t=xxMQXY32AsRRZIZd-1)
- [Pitch](colocar link aqui)
- [Vídeo de Demonstração](colocar link aqui)


## Instalação ⬇️

```bash
- git clone https://github.com/gabygraciano/capibago.git
cd capibago
- npm install
```

## Rodando o projeto 🏃
```bash
- npx expo start
```

```bash
Usuário para Login: 11395297495
```

## Como contribuir 🤝
### Branches
Pull requests devem ser compostos pelo tipo e nome da branch.\
os nomes das branchs devem ser separados por "-".\
os tipo são compostos por:
- feature - Para novas funcionalidades
- fix - Para bugfixes e hotfixes

Exemplo: 
`feature/navbar-mobile`

### Commits
Commits devem ser estruturados da seguinte forma <tipo>(<nome-da-branch>): <descrição do commit>\
Exemplo: 
`feature(navbar-mobile): adicionando navegação`

### Branch padrão
- develop

### Pull requests
Pull requests devem ter uma boa e clara descrição.\
Os 3 principais tópicos da descrição devem ser:
`- What I did`
`- How to test`
