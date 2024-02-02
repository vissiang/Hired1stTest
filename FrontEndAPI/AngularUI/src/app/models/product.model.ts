export interface Product
{
  productId: string;
  name: string;
  price: number;
  description: string | null;
  userId: string;
  addedDate: Date | null;
  lastUpdatedDate: Date | null;
}
