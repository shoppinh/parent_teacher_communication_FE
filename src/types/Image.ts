/**
 * Image with thumbs for srcset
 */
export interface ImageData {
  id?: number;
  createdAt?: Date;
  path?: string;
  primary?: boolean;
  server?: string;
  thumbs?: Thumb[];
  thumbsWebp?: Thumb[];
  updatedAt?: Date;
}

export interface Thumb {
  [resolution: string]: string;
}

export enum ImageType {
  PRODUCT_CART = 'PRODUCT_CART',
  PRODUCT_LIST = 'PRODUCT_LIST',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  GIFT_CART = 'GIFT_CART',
  GIFT_HOME = 'GIFT_HOME',
  GIFT_DETAIL = 'GIFT_DETAIL',
  BANNER_IMAGE = 'BANNER_IMAGE',
}

/*
bannerImage:
  width based on Screen size,
  height: keep the ratio ( recommend 424:200 ratio) :
  w1920
  w1440
  w1024
  w768
  w425
  w414
  w375
  w360

giftImage - Home: 53x53
giftImage - Detail: 45x45
giftImage - Cart: 60x60
cart: 90x90
Product Image - List:
  w360: 144x144
  w375: 160x160
  w414: 179x179
  w425: 185x185
  w768: 200x200
Product Image - Detail:
  220x220
  w1440: 412x412
  w1024: 292x292
  w768: 212x212
*/

export const ImageSizes = {
  [ImageType.BANNER_IMAGE]:
    '(min-width: 1920px) 1920px, (min-width: 1440px) 1440px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 425px) 425px, (min-width: 414px) 414px, (min-width: 375px) 375px, 360px',
  [ImageType.GIFT_CART]: '60px',
  [ImageType.GIFT_HOME]: '53px',
  [ImageType.GIFT_DETAIL]: '45px',
  [ImageType.PRODUCT_CART]: '90px',
  [ImageType.PRODUCT_LIST]: '351px',
  [ImageType.PRODUCT_DETAIL]:
    '(min-width: 1440px) 412px, (min-width: 1024px) 292px, (min-width: 768px) 212px, 200px',
};
