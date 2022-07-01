import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

const Main = async () => {
  const App = document.getElementById("app");
  let appBody = `
      <div id="main-content">
        <input type="text" id="cep" name="cep" />
        <input type="button" id="btn" name="btn" value="Pesquisar" />  
      </div>
  `;

  // Write App
  App.innerHTML = appBody;
};

export default Main;