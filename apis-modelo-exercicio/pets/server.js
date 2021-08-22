const app = require("./src/app")
const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`Servidor está rodando na porta ${PORTA}`);
});