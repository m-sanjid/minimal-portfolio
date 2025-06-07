import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiTailwindcss,
  SiMongodb,
  SiFramer,
} from "react-icons/si";
import { motion } from "motion/react";

const skills = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Motion Dev", icon: SiFramer },
];

export const Skills = () => {
  return (
    <section className="w-full py-16 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-10">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center text-center space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.08 }}
            >
              <Icon className="w-10 h-10 text-neutral-800 dark:text-neutral-100" />
              <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
