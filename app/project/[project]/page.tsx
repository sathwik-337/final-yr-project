'use client';

import React, { useEffect, useState } from 'react';
import ProjectHeader from './_shared/ProjectHeader';
import SettingsSection from './_shared/SettingsSection';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { ProjectType, ScreenConfig } from '@/type/types';
import { Loader2Icon } from 'lucide-react';

function ProjectCanvasPlayground() {

  /* ---------- STATE ---------- */

  const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>([]);
  const [projectDetails, setProjectDetail] = useState<ProjectType>();

  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState('Loading project...');

  // ⭐ NEW STATE (important)
  const [isGenerating, setIsGenerating] = useState(false);

  /* ---------- params ---------- */

  const params = useParams();
  const projectId = params?.project as string;

  /* ---------- FETCH PROJECT ---------- */

  const GetProjectDetails = async () => {
    try {
      setLoading(true);
      setLoadingMsg("Fetching project...");

      const result = await axios.get(
        `/api/project?projectId=${projectId}`
      );

      setProjectDetail(result?.data?.projectDetail);
      setScreenConfig(result?.data?.screenConfig ?? []);

    } catch (error) {
      console.error(error);
      setLoadingMsg("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- GENERATE CONFIG ---------- */

  const generateScreenConfig = async () => {
    try {
      // ✅ FORCE LOADER FIRST
      setIsGenerating(true);
      setLoading(true);
      setLoadingMsg("Generating Screen Configurations...");

      // allow React paint before API call
      await new Promise(r => setTimeout(r, 50));

      const result = await axios.post('/api/generate-config', {
        projectId,
        deviceType: projectDetails?.device,
        userInput: projectDetails?.userInput
      });

      console.log("Generated:", result.data);

      setScreenConfig(result.data?.screens ?? []);

    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
      setLoading(false);
    }
  };

  /* ---------- AUTO GENERATE ---------- */

  useEffect(() => {
    if (!projectDetails) return;
    if (screenConfig.length > 0) return;
    if (isGenerating) return;

    generateScreenConfig();
  }, [projectDetails]);

  /* ---------- INITIAL FETCH ---------- */

  useEffect(() => {
    if (!projectId) return;
    GetProjectDetails();
  }, [projectId]);

  /* ---------- UI ---------- */

  return (
    <div className="relative">

      {(loading || isGenerating) && (
        <div className="
          absolute left-1/2 top-20 -translate-x-1/2
          bg-blue-300/20 border border-blue-400
          rounded-xl px-5 py-3 shadow-md backdrop-blur-md
        ">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Loader2Icon className="animate-spin w-4 h-4" />
            <span>{loadingMsg}</span>
          </div>
        </div>
      )}

      <ProjectHeader />

      <div className="flex h-screen">
        <SettingsSection />
      </div>
    </div>
  );
}

export default ProjectCanvasPlayground;