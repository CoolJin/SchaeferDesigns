import fs from 'fs';
import readline from 'readline';

async function listComponents() {
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

  console.log("Full text length: " + targetContent.length);

  const componentSections = targetContent.split('### Component:').slice(1);
  console.log("Found " + componentSections.length + " components.");
  for (const section of componentSections) {
    const lines = section.trim().split('\\n');
    console.log("-> " + lines[0].trim());
  }
}

listComponents().catch(console.error);
