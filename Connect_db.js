
const fs = require('fs');

function safeInJsonFile(data,nameFile){ 
    const filePath = `jsonsFile/${nameFile}.json`;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Dados salvos em ${nameFile}.json`);
}

function loadFromJsonFile(nameFile) {
    try {
        const dataJson = fs.readFileSync(`jsonsFile/${nameFile}.json`);
        const data = JSON.parse(dataJson);
        return data;
    } catch (error) {
        console.log(`Erro ao carregar o arquivo ${nameFile}.json:`, error);
        return null;
    }
}


// Exportando as funções
module.exports = {
    safeInJsonFile,
    loadFromJsonFile
};
