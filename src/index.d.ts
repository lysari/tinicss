export interface Config {
  content: string | string[];
  output?: string;
  custom?: {
    colors?: {
      [key: string]: string;
    };
    fonts?: {
      family?: {
        [key: string]: string;
      };
      size?: {
        [key: string]: string;
      };
      weight?: {
        [key: string]: number;
      };
    };
  };
}
