export interface Ancestor {
  name: string;
  payload: {
    age: number;
    atHome: boolean;
    avatarUrl: string;
    [key: string]: any;
  };
  children: Ancestor[];
}
