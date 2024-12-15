import Link from "next/link";

import { getUserInfoByName, getUserInfoBySession } from "@/service/userService";
import ListTweet from "@/components/list-tweet";

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserInfoByName(params.username);
  const logInUser = await getUserInfoBySession();

  return (
    <main className="flex flex-col gap-5 pt-10 pb-40 h-screen px-3">
      <h1 className="text-center font-semibold text-3xl pb-2">나의 정보</h1>
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-sky-700">
          <div className="flex gap-1 flex-col">
            <h3 className="text-xl font-semibold">{user.username}</h3>
            <small className="text-stone-400">{user.email}</small>
          </div>
          {params.username === logInUser.username && (
            <Link
              className="ml-auto w-fit p-3 bg-sky-400 hover:bg-sky-300 active:bg-sky-200 transition-colors rounded-full "
              href={`/users/${logInUser.username}/edit`}
            >
              나의 정보 수정
            </Link>
          )}
        </div>
      </div>
      <p className="p-3 border border-sky-300 rounded-xl">{user.bio}</p>
      <div className="p-5 flex flex-col gap-5">
        {user.tweets?.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </main>
  );
}
