interface image {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface data {
  id:number,
  name:string,
  imgUrl:string,
  websiteUrl:string,
  address:string,
  neighbourhood:string
}

export {image,data}
