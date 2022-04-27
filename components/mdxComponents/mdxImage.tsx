import Image from "next/image";

export default function MdxImage(props) {
  const path: string = props.src;
  const filename = path.substring(path.lastIndexOf("/"));
  const sizeInfo = filename.match(/\d+X\d+\./);
  let width = "100",
    height = "100";
  if (sizeInfo) {
    width = sizeInfo[0].match(/\d+/g)[0];
    height = sizeInfo[0].match(/\d+/g)[1];
    // console.log(`width:${width},height:${height}`);
  }
  return (
    <Image
      alt={props.alt}
      layout={"responsive"}
      width={width}
      height={height}
      {...props}
    />
  );
}
