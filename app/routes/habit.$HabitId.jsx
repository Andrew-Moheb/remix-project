import SideNav from "../components/SideNav";
import Modal from "../components/Modal";
import { Form, redirect, useLoaderData, useParams } from "@remix-run/react";
import { deleteHabit, uniqueHabit, updateHabit } from "../data/habits";

function HabitID() {
  const params = useParams();
  const specificHabit = useLoaderData();
  return (
    <div>
      <SideNav />
      <Modal>
        <Form
          method="post"
          action={`/habit/${params.HabitId}`}
          className="bg-white rounded-md flex flex-col gap-5 justify-center items-center "
        >
          <h1 className="text-cyan-600 underline text-2xl mt-10">Your Habit</h1>
          <input
            type="text"
            placeholder="habit"
            name="habit"
            className="bg-slate-200 w-[80%] rounded py-2 px-2 focus:outline-none"
            defaultValue={specificHabit.habit}
          />
          <div className="flex justify-end w-[80%] gap-5 mb-10">
            <button
              type="submit"
              className="bg-green-100 w-[6rem] py-2 rounded hover:bg-green-200 flex justify-center items-center"
            >
              Edit
            </button>
          </div>
        </Form>
        <Form
          method="delete"
          action={`/habit/${params.HabitId}`}
          className="bg-green-100 w-[6rem] py-2 rounded hover:bg-green-200 flex justify-center items-center cursor-pointer"
        >
          <button type="submit">Delete</button>
        </Form>
      </Modal>
    </div>
  );
}

export default HabitID;

export async function action({ request, params }) {
  const habitId = params.HabitId;
  if (request.method == "POST") {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await updateHabit(habitId, data);
    return redirect("/");
  } else if (request.method == "DELETE") {
    console.log(`requesting here =>`, request);
    await deleteHabit(habitId);
    return redirect("/");
  }
}

export async function loader({ params }) {
  const habitId = params.HabitId;
  return await uniqueHabit(habitId);
}
