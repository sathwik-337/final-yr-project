"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Folder, ArrowRight, Clock, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { ProjectType } from "@/type/types";

export default function RecentProjects() {
  const { user } = useUser();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/projects");
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || (projects.length === 0 && !loading)) return null;

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-xl">
            <Folder className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">Recent Projects</h2>
            <p className="text-sm text-foreground/40 font-medium">Continue where you left off</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-3xl bg-white/5 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.projectId}
              href={`/project/${project.projectId}`}
              className="group relative p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    {project.device === "mobile" ? (
                      <Smartphone className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <Monitor className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                    <Clock className="w-3 h-3 text-foreground/40" />
                    <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">
                      {new Date(project.createdOn).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.projectName || "Untitled Project"}
                </h3>
                
                <p className="text-sm text-foreground/40 font-medium line-clamp-2 mb-6">
                  {project.userInput}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/60">
                    {project.theme || "Modern Slate"}
                  </span>
                  <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
