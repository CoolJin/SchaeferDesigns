import fs from 'fs';
import readline from 'readline';

async function extract() {
  const logPath = 'C:\\Users\\Colin\\.gemini\\antigravity\\brain\\46ff0638-06cd-4eac-b4d4-0fbffdde50ea\\.system_generated\\logs\\transcript.jsonl';
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let targetContent = null;
  for await (const line of rl) {
    if (line.includes('Hier sind die Hintergründe:')) {
      const parsed = JSON.parse(line);
      targetContent = parsed.content;
      break;
    }
  }

  if (!targetContent) {
    console.error('Could not find the target message.');
    return;
  }

  const outDir = 'C:\\Users\\Colin\\Desktop\\.00000\\ColinDesign\\src\\components\\';

  // The format is roughly:
  // ### Component: ComponentName
  // ...
  // ### Full Component Source
  // ```jsx
  // ... code ...
  // ```
  // ```css
  // ... code ...
  // ```

  const componentSections = targetContent.split('### Component:').slice(1);
  for (const section of componentSections) {
    const lines = section.trim().split('\n');
    const compName = lines[0].trim();
    console.log(`Extracting ${compName}...`);

    const sourceSplit = section.split('### Full Component Source');
    if (sourceSplit.length < 2) continue;

    const sourceCode = sourceSplit[1];

    // Find all markdown code blocks in sourceCode
    const blockRegex = /```(\w+)\n([\s\S]*?)```/g;
    let match;
    let hasJsx = false;
    while ((match = blockRegex.exec(sourceCode)) !== null) {
      const ext = match[1]; // jsx or css
      let code = match[2];
      
      // Some formatting cleanup
      code = code.trim() + '\n';
      
      if (ext === 'jsx' || ext === 'javascript' || ext === 'js' || ext === 'tsx') {
        const filePath = `${outDir}${compName}.jsx`;
        fs.writeFileSync(filePath, code);
        console.log(`Saved ${compName}.jsx`);
        hasJsx = true;
      } else if (ext === 'css') {
        const filePath = `${outDir}${compName}.css`;
        fs.writeFileSync(filePath, code);
        console.log(`Saved ${compName}.css`);
      }
    }
  }
}

extract().catch(console.error);
