export interface UserInterface {
  id: number;
  name: string;
  email: string;
  admin: boolean;
}

export type UserContextType = {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};
