import fs from 'fs';

const filePath = './frontend/src/pages/Dashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<h3 className="text-sm font-bold mb-[24] flex items-center gap-2">([\s\S]*?)<\/h3>/g;

content = content.replace(regex, (match, innerText) => {
  const title = innerText.replace(/<[^>]+>/g, '').trim();
  
  return `<div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0">${innerText}</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: \`Please explain the ${title} data and its implications for my role.\` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div>`;
});

fs.writeFileSync(filePath, content);
console.log('Successfully updated Dashboard.jsx');
