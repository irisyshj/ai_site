const fs = require('fs');

const inputFile = 'C:/20_brand_site/content/articles/claude-agent-team-guide.md';
let content = fs.readFileSync(inputFile, 'utf-8');

// The issue: Obsidian creates image references like ![alt](data:image/svg+xml...)
// followed by more content on the same line. We need to remove the entire SVG data URI
// but keep the text that comes after it.

const lines = content.split('\n');
const fixedLines = [];

for (let line of lines) {
    // Check if this line contains an image reference with data:image/svg+xml
    if (line.includes('![') && line.includes('data:image/svg+xml')) {
        // For each image reference on this line (there might be multiple)
        while (line.includes('![') && line.includes('data:image/svg+xml')) {
            const imgStart = line.indexOf('![');
            const svgStart = line.indexOf('(data:image/svg+xml', imgStart);

            if (svgStart === -1) break;

            // Find the actual filename in the alt text (like "Pasted image 20260218235742.png")
            const altEnd = line.indexOf(']', svgStart);
            if (altEnd === -1) break;

            const altText = line.substring(line.lastIndexOf('!', altEnd) + 1, altEnd);

            // Check if alt text contains an image filename
            const filenameMatch = altText.match(/(Pasted image \d+\.png|[a-f0-9]+\.(jpg|jpeg|png))/);
            let newImgRef = '';

            if (filenameMatch) {
                // Use the extracted filename
                const filename = filenameMatch[1];
                if (filename.includes('Pasted image')) {
                    newImgRef = '![' + altText + '](/images/' + filename + ')';
                } else {
                    newImgRef = '![' + altText + '](/images/' + filename + ')';
                }
            } else {
                // Just use a placeholder or empty image
                newImgRef = '![](/images/placeholder.png)';
            }

            // Find the end of the SVG data URI
            // It ends with %3C/svg%3E and there's a ) right after that
            const svgEndToken = '%3C/svg%3E';
            const svgEndIdx = line.indexOf(svgEndToken, svgStart);

            if (svgEndIdx !== -1) {
                // The SVG ends at the closing ) which comes after %3C/svg%3E
                // But there might be MORE content after the )
                const closingParenIdx = line.indexOf(')', svgEndIdx + svgEndToken.length);

                if (closingParenIdx !== -1) {
                    const before = line.substring(0, imgStart);
                    const after = line.substring(closingParenIdx + 1);
                    line = before + newImgRef + after;
                } else {
                    // No closing paren found, just remove the SVG part
                    const before = line.substring(0, imgStart);
                    const after = line.substring(svgEndIdx + svgEndToken.length);
                    line = before + newImgRef + after;
                }
            } else {
                // Can't find end, skip this one
                break;
            }
        }
    }
    fixedLines.push(line);
}

content = fixedLines.join('\n');
fs.writeFileSync(inputFile, content);
console.log('Fixed image links');
