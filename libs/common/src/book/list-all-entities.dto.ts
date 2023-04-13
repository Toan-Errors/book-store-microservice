export class ListAllEntitiesDto {
  readonly _id: object;
  readonly title: string;
  readonly subtitle: string;
  readonly author: string;
  readonly country: string;
  readonly ageGroup: string;
  readonly saleDate: Date;
  readonly price: number;
  readonly price_sale: number;
  readonly publisher: string;
  readonly genres: string[];
  readonly pages: number;
  readonly coverImage: string;
  readonly language: string;
  readonly images: string[];
  readonly createdAt: Date;
}
