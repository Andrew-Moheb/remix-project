import SideNav from "../components/SideNav";
import { useLoaderData } from "@remix-run/react";
import DailyHabitContainer from "../components/DailyHabitContainer";

function Habits() {
  const habits = useLoaderData();
  console.log(`habits =>`, habits);
  return (
    <div className="flex">
      <SideNav />
      <DailyHabitContainer />
    </div>
  );
}

export default Habits;
