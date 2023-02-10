export interface Descendant {
  name: string;
  payload: {
    age: number;
    atHome: boolean;
    avatarUrl: string;
    [key: string]: any;
  };
  descendants: Descendant[];
}
