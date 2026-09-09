import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useMyClasses = () => {
  const axiosSecure = useAxios();
  const {
    data: myClassesData = [],
    isLoading: myClassesLoading,
    refetch: myClassesRefetch,
  } = useQuery({
    queryKey: ["myClassesData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/my-classes");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { myClassesData, myClassesLoading, myClassesRefetch };
};

export default useMyClasses;
