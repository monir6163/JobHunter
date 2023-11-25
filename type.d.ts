/* eslint-disable prettier/prettier */
export type JobItem = {
  id: string;
  name: string;
  title: string;
  category: {
    name: string;
  };
  endDate: string;
  ViewCount: string;
  image: any;
};

export type Preparetion = {
  id: string;
  title: string;
  catId: string;
  endDate: string;
  viewCount: string;
  image: any;
};

export type NoticeType = {
  id: string;
  title: string;
  catId: string;
  endDate: string;
  viewCount: string;
  image: any;
};

export type NewsType = {
  id: string;
  title: string;
};
