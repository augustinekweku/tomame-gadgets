export interface IProduct {
  _id: number;
  title: string;
  slug: {
    current: string;
    _type: string;
  };
  price: number;
  imageUrl: string;
  body: string;
  publishedAt: string;
}
