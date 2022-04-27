import path from "path";
import fs from "fs";
import matter from "gray-matter";

export default async function scanFiles() {
  const relativePath = "/pages/posts";
  const result = [];
  iterateDirectoryItemRecursively(relativePath, async (path, file) => {
    let filePath = `${path}/${file}`;
    // console.log(`filePath:${filePath}`);
    const metaData = matter.read(filePath).data;

    console.log(metaData);
    result.push(metaData);
  });
  return result;
}

function iterateDirectoryItemRecursively(
  basePath: string,
  actionOnItem: (currentPath: string, item: string) => {}
) {
  const readdirSyncDirectory = path.join(process.cwd(), basePath);
  const files = fs.readdirSync(readdirSyncDirectory);
  for (const file of files) {
    const statSyncDirectory = `${path.join(process.cwd(), basePath)}\\${file}`;
    const stat = fs.statSync(statSyncDirectory);
    if (stat.isDirectory()) {
      iterateDirectoryItemRecursively(`${basePath}/${file}`, actionOnItem);
    } else {
      actionOnItem(path.join(process.cwd(), basePath), file);
    }
  }
}
