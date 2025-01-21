
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

const useUser = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data: userData = {}, isLoading: userDataLoading} = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async() =>{
      const {data} = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    }
  })
  
  return [userData, userDataLoading];
}
export default useUser;