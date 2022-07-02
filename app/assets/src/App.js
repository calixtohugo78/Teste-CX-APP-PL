let client = ZAFClient.init();

client.on("app.registered", (e) => {
  client.invoke("resize", { width: "100%", height: "130px" });
});


// Create screen context
import Main, {Insert} from "./Main.js";
Main();

// Get Value and Find API
const $ = document.querySelector.bind(document);

$('#btn').addEventListener('click', async () => {
  
  const inputValue = $('#cep').value;
  const unMaskValue = filterValue(inputValue);

  const apiRes = await searchCEP(unMaskValue);

  Insert(apiRes);

});

function filterValue(value) {

  return value.replace("-", "").replace(".", "");

}

async function searchCEP(value) {

  const response = await fetch(`https://viacep.com.br/ws/${value}/json`);

  return response.json();

}


//