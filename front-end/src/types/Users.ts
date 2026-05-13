export interface UserInterface {
  id: number;
  name: string;
  email: string;
}

export type UserContextType = {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};
