export interface DescendantPayload {
  age: number;
  atHome: boolean;
  avatarUrl: string;
  quote: string;
}

export interface Descendant {
  name: string;
  payload: DescendantPayload;
  descendants: Descendant[];
}
