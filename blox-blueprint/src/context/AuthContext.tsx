import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { UserDto } from "../types/authTypes";
import { getCurrentUser } from "../services/authApi";

type AuthContextValue = {
  user: UserDto | null;
  setUser: Dispatch<SetStateAction<UserDto | null>>;
  isAuthLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    async function restoreUser() {
      try {
        const response = await getCurrentUser();

        if (!response.ok) {
          setUser(null);
          return;
        }

        const currentUser: UserDto = await response.json();

        console.log("Restored user");
        setUser(currentUser);
      } catch (error) {
        console.error("Unable to restore user:", error);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    restoreUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
