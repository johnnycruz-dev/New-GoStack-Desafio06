import csvParse from 'csv-parse';
import fs from 'fs';
// import path from 'path';

// const csvFilePath = path.resolve(__dirname, 'import_template.csv');

interface TransactionDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
  category: string;
}

async function loadCSV(filePath: string): Promise<TransactionDTO[]> {
  const readCSVStream = fs.createReadStream(filePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const lines: TransactionDTO[] = [];

  parseCSV.on('data', line => {
    // console.log(line);
    const [title, type, value, category] = line;
    lines.push({
      title,
      type,
      value,
      category,
    });
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}

export default loadCSV;
