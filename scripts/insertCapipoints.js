// scripts/insertCapipoints.js
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Substitua pelas suas infos do Supabase
const supabaseUrl = 'https://fecthykxcryvyhxcdhau.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlY3RoeWt4Y3J5dnloeGNkaGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjY0NDMsImV4cCI6MjA1NzM0MjQ0M30.6SQ8WV7F9fwJRNezalMLudKB_CvwNUtlygjtfSwgaW0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  try {
    // 1) Ler o arquivo gerado "capipoints.json"
    const content = fs.readFileSync('capipoints.json', 'utf8');
    const points = JSON.parse(content);

    // 2) Inserir no supabase (tabela "capipoints")
    const { data, error } = await supabase
      .from('capipoints')
      .insert(points);
    if (error) {
      console.error('Erro ao inserir capipoints:', error);
      return;
    }
    console.log('Capipoints inseridos com sucesso:', data);
  } catch (err) {
    console.error('Erro geral:', err);
  }
}

main();
