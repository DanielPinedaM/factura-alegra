/* Imagenes de Pexels API https://www.pexels.com/api/documentation */

export interface IImg {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ISrc;
  liked: boolean;
  alt: string;
}

export interface ISrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}
