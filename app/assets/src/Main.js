import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

let recentTickets;

async function tableTickets() {

  const response = await client.request('/api/v2/tickets/recent');
  const tickets = response.json();

  console.log(tickets);

  return ` Gone`

}
/* client.request('/api/v2/tickets/recent').then(
  function(tickets) {
    console.log(tickets);
    recentTickets = tickets;
  },
  function(response) {
    console.error(response.responseText);
  }
); */

const Main = async () => {
  const App = document.getElementById("app");
  let appBody = `
      <div id="main-content">
        <input type="text" id="cep" name="cep" placeholder="Digite um CEP" />
        <input type="button" id="btn" name="btn" value="Pesquisar" />  

        <hr/>

        ${tableTickets(recentTickets)}
      
      </div>
  `;

  // Write App
  App.innerHTML = appBody;
};

const tableTickets = (array) => {

  const table = `

    <h6>Últimos Tickets</h6>

    <table>

      <tr>
        <th>Status</th>
        <th>Assunto</th>
      </tr>

      ${
        array.map((item) => {

          return`
            <tr>
              <td>${item.status}</td>
              <td>${item.subject}</td>
            </tr>
          `

        })
      }

    <table/>
  `

}

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