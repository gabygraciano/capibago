// scripts/generateLocalQRCodes.js

const fs = require('fs');
const QRCode = require('qrcode');

async function main() {
  try {
    // 1) Ler o arquivo JSON local (capipoints.json)
    const content = fs.readFileSync('capipoints.json', 'utf8');
    const capipoints = JSON.parse(content);

    if (!Array.isArray(capipoints) || capipoints.length === 0) {
      console.log('Nenhum capipoint encontrado no arquivo local.');
      return;
    }

    // 2) Para cada objeto, gerar o QR code
    for (const point of capipoints) {
      // Se não tiver "qr_code", geramos algo
      const qrValue = point.qr_code || 'SEM-QR';
      // Nome do arquivo: "qr-capipoint-<qrValue>.png"
      // Remover espaços ou barras se tiver
      const safeQRValue = qrValue.replace(/[^a-zA-Z0-9-_]/g, '');
      const fileName = `qr-capipoint-${safeQRValue}.png`;

      // Gera o QR code e salva em arquivo PNG (300px de largura)
      await QRCode.toFile(fileName, qrValue, { width: 300 });

      console.log(`Gerado QR code para: ${point.nome} -> ${fileName}`);
    }

    console.log('Concluído!');
  } catch (err) {
    console.error('Erro geral:', err);
  }
}

main();
