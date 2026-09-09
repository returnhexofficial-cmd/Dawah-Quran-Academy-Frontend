import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useClasses = () => {
  const axiosSecure = useAxios();
  const {
    data: classesData = [],
    isLoading: classesLoading,
    refetch: classesRefetch,
  } = useQuery({
    queryKey: ["classesData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
    enabled: typeof window !== "undefined",
  });
  return { classesData, classesLoading, classesRefetch };
};

export default useClasses;
