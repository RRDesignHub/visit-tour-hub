import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import { useAxiosSecure } from "./useAxiosSecure";

export const useRole = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data: userRole = {}, isLoading: roleLoading} = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async() =>{
      const {data} = await axiosSecure.get(`/user/role/${user?.email}`);
      return data;
    }
  })
  return [userRole, roleLoading];
}
