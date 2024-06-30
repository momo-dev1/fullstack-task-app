import { getUserAction } from "@/actions/task.actions";
import Wrapper from "@/components/Wrapper";
import React from "react";

const page = async () => {
  const user = await getUserAction();

  return (
    <Wrapper>
      <div className="flex items-center justify-center">
        <div className="w-96 px-6 py-6  text-center bg-gray-800 rounded-lg lg:mt-0 xl:px-10">
          <div className="space-y-4 xl:space-y-6">
            <img
              className="mx-auto rounded-full h-36 w-36"
              src={user.imageUrl}
              alt="author avatar"
            />
            <div className="space-y-2">
              <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                <h3 className="text-white">{user.name}</h3>
                <p className="text-indigo-300">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
