import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async (props: SearchParamProps) => {
  const params = await props.params;
  const { type } = params;
  const { userId } = await auth();
  console.log("Authenticated user ID:", userId); // 確保 userId 是有效的
  const transformation = transformationTypes[type];

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserById(userId);
  console.log(user)

  if (!user) {
    console.error("User not found, redirecting to sign-in page");
    redirect("/sign-in"); // 用戶不存在，重定向到登錄頁面
  }

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
