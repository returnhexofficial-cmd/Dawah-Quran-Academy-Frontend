"use client";
import AllUsersTableRow from "@/app/(admin)/admin/all-users/AllUsersTableRow";
import useUsers from "@/hooks/useUsers";
import { TUser } from "@/types/user.type";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";

const AllUsers = () => {
  const { usersData, usersLoading, usersRefetch } = useUsers();
  if (usersLoading) return <LoadingSpinner />;

  return (
    <section>
      <DashboardTitle
        blackText="All"
        greenText="Users"
        className="text-center mt-10"
      />
      <div className="mt-5">
        {usersData.data && usersData.data.length > 0 ? (
          <table className="text-center text-black w-full">
            <thead>
              <tr className="bg-light h-12">
                <th>Sl</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {usersData.data.map((user: TUser, index: number) => (
                <AllUsersTableRow
                  key={user._id}
                  index={index}
                  user={user}
                  refetch={usersRefetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="text-center">No User Found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllUsers;
