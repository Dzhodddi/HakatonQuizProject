import { FC, ReactNode, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "src/components/Loader";
import { useUserStore } from "src/modules/Login/store/useUserStore";

interface LazyLoadPageProps {
  children: ReactNode;
}

const LazyLoadPage: FC<LazyLoadPageProps> = ({ children }) => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (user.id === "0") {
            navigate("/login");
        }
    }, [user.id]);

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default LazyLoadPage;