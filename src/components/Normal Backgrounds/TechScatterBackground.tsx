import React from "react";
import {
  Github,
  Database,
  Zap,
  Code,
  Server,
  Globe,
  Terminal,
  Cpu,
  HardDrive,
  Smartphone,
  Monitor,
  Wifi,
  Cloud,
  Lock,
  GitBranch,
  Package,
} from "lucide-react";

const techIcons = [
  { Icon: Github, name: "GitHub", position: { x: "10%", y: "15%" } },
  { Icon: Database, name: "MongoDB", position: { x: "25%", y: "30%" } },
  { Icon: Zap, name: "Postman", position: { x: "40%", y: "20%" } },
  { Icon: Code, name: "VS Code", position: { x: "60%", y: "15%" } },
  { Icon: Server, name: "Node.js", position: { x: "80%", y: "25%" } },
  { Icon: Globe, name: "React", position: { x: "20%", y: "60%" } },
  { Icon: Terminal, name: "Terminal", position: { x: "50%", y: "50%" } },
  { Icon: Cpu, name: "Docker", position: { x: "70%", y: "40%" } },
  { Icon: HardDrive, name: "PostgreSQL", position: { x: "15%", y: "80%" } },
  { Icon: Smartphone, name: "Mobile", position: { x: "35%", y: "75%" } },
  { Icon: Monitor, name: "Desktop", position: { x: "55%", y: "70%" } },
  { Icon: Wifi, name: "API", position: { x: "75%", y: "65%" } },
  { Icon: Cloud, name: "AWS", position: { x: "90%", y: "85%" } },
  { Icon: Lock, name: "Security", position: { x: "45%", y: "90%" } },
  { Icon: GitBranch, name: "Git", position: { x: "5%", y: "50%" } },
  { Icon: Package, name: "npm", position: { x: "85%", y: "55%" } },
];

const TechScatterBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {techIcons.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              key={index}
              className="absolute flex items-center space-x-2"
              style={{
                left: item.position.x,
                top: item.position.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="bg-black border-2 border-white rounded-lg px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 shadow-lg flex items-center space-x-2 transition-transform duration-300 group-hover:scale-105">
                <Icon className="text-white" size={16} />
                <span className="text-white text-[10px] sm:text-sm lg:text-base font-medium whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechScatterBackground;
