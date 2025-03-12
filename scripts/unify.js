// unify.js

const fs = require('fs');

const mercadosRaw = require('./mercadospublicos.json');
const museusRaw = require('./museus.json');

function convertMercados() {
  // mercadosRaw.records = [ [1, "Mercado de São José", "desc", "bairro", lat, lng], ... ]
  return mercadosRaw.records.map((row) => ({
    nome: row[1],
    // descricao: row[2],  <-- Remover esta linha
    latitude: row[4],
    longitude: row[5],
    qr_code: `MERCADO-${row[0]}`
  }));
}

function convertMuseus() {
  // museusRaw.records = [ [1, "Museu do Homem do Nordeste", "desc", "bairro", "logra", lat, lng, tel, site], ... ]
  return museusRaw.records.map((row) => ({
    nome: row[1],
    // descricao: row[2], <-- Remover esta linha
    latitude: row[5],
    longitude: row[6],
    qr_code: `MUSEU-${row[0]}`
  }));
}

function main() {
  const mercadosConverted = convertMercados();
  const museusConverted = convertMuseus();
  const allPoints = [...mercadosConverted, ...museusConverted];

  fs.writeFileSync('capipoints.json', JSON.stringify(allPoints, null, 2));
  console.log('Arquivo capipoints.json gerado com', allPoints.length, 'pontos.');
}

main();
