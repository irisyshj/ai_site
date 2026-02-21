const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../content/articles/claude-agent-team-guide.md');
const outputFile = path.join(__dirname, '../content/articles/claude-agent-team-guide.md');

let content = fs.readFileSync(inputFile, 'utf-8');

// Fix image references - replace the SVG data URI with actual image paths
content = content.replace(
  /!\[([^\]]*)\]\(data:image\/svg\+xml,%3C%3Fxml[^\)]*Pasted image ([^)]+?)\)\*\*/g,
  '![$1](/images/Pasted image $2)'
);

content = content.replace(
  /!\[([^\]]*)\]\(data:image\/svg\+xml,%3C%3Fxml[^\)]*Pasted image ([^)]+)\)/g,
  '![$1](/images/Pasted image $2)'
);

// Fix other image references
content = content.replace(
  /!\[([^\]]*)\]\(data:image\/svg\+xml,%3C%3Fxml[^\)]*)\*\*/g,
  '![$1](/images/$2)**'
);

content = content.replace(
  /!\[([^\]]*)\]\(data:image\/svg\+xml,%3C%3Fxml[^\)]+)\)/g,
  '![$1](/images/$2)'
);

fs.writeFileSync(outputFile, content, 'utf-8');
console.log('Fixed image links in article');
