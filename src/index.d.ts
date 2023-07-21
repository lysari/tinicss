export interface Config {
  content: string | string[];
  output?: string;
  custom?: {
    colors: {
      [key: string]: string;
    };
  };
}
