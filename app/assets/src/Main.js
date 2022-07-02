import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

let recentTickets;

async function tableTickets() {

  const response = await client.request('/api/v2/tickets/recent');
  const tickets = response.tickets;

  const table = `

    <h6>Últimos Tickets</h6>

    <table>

      <tr class="head">
        <th>Status</th>
        <th>Assunto</th>
      </tr>

      ${
        tickets.map((item) => {

          return`
            <tr class="body">
              <td>${item.status}</td>
              <td>${item.subject}</td>
            </tr>
          `

        })
      }

    <table/>
  `

  return table;

}

const Main = async () => {
  const App = document.getElementById("app");
  let appBody = `
      <div id="main-content">
        
        ${await tableTickets()}
      
      </div>
  `;

  // Write App
  App.innerHTML = appBody;
};

export const Insert = (content) => {

  const comment = `
    Cep: ${content.cep},

    | Rua: ${content.logradouro} 
    | Bairro: ${content.bairro},
    | Cidade: ${content.localidade},
    | UF: ${content.uf}
  `

  client.invoke('ticket.comment.appendText', comment).then(function() {
    console.log('Comentário adicionado com sucesso!');
  });

}

export default Main;