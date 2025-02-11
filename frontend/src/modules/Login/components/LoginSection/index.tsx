import { FC, memo} from 'react';
import { Login } from '../Login';
import { SignUp } from '../SignUp';

export interface LoginSectionProps {
    type: "login" | "signup";
}

export const LoginSection: FC<LoginSectionProps> = memo(({ type }) => {
    if (type === "login") {
        return <Login />;
    }

    return <SignUp />;
});
