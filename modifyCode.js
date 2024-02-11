////////////////////////////////////////////////////
//【つかいかた】 修正したいコードを同一フォルダに用意して
//              そのファイル名を以下に記載し、本プログラムを実行する
const targetFileName = "AF0040V3.rpgle";
//////////////////////////////////////////////////

const fs = require("fs");
const rs = fs.createReadStream(targetFileName, { encoding: "utf-8" });

//対象ファイルをreadstreamで読む
let data = "";
rs.on("data", (chunk) => {
  data = data + chunk;
});

//読み終わったらファイル出力
rs.on("end", () => {
  //先頭から最初のアルファベットorアスタリスクまでをカット
  const lines = data.split("\r\n");
  let fixedLines = lines.map((line) => {
    return line.replace(/^[^a-zA-Z\*]*/, "");
  });
  /*   fixedLines = fixedLines.map((line) => {
    return line.replace(/^[A-Z]\d\d\d /, "");
  }); */

  //配列を文字列に変更
  let strings = "";
  for (let i = 0; i < fixedLines.length; i++) {
    strings += `${fixedLines[i]}\n`;
  }
  //上書きする形でファイル出力
  fs.writeFileSync(targetFileName, strings);
  console.log("finished");
});
