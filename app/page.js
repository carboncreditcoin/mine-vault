import { getProjects } from "./actions/getProjects";
import Projects from "./components/Projects/Projects";

export default async function Home() {
  const projects = await getProjects({ page: 1, limit: 6 });

  return (
    <div>
      <Projects projects={projects} />
    </div>
  );
}