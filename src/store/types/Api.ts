export interface IPizza {
  _id: string;
  name: string;
  category: {
    name: string;
    _id: string;
  };
  description: string;
  ingredients: string[];
  imageUrl: string;
  price: number;
  numberInStock: number;
  createdAt: string;
  __v: number;
}

export interface IApi {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  imageUrl: string;
  ingredients: [];
  description: string;
}

export interface IApiResponse {
  status: string;
  endpointName: string;
  requestId: string;
  startedTimeStamp: number;
  data: IApi[];
  fulfilledTimeStamp?: number;
  isError?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isUninitialized?: boolean;
  refetch?: Function;
}

export interface IApiCallBeganPayload {
  url: string;
  method: string;
  data?: any;
  onStart?: string;
  onSuccess?: string;
  onFailed?: string;
}

export interface IApiResponseSingle {
  data: IMovieSingle;
  status: string;
  isUninitialized: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
}

export interface IMovieSingle {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
