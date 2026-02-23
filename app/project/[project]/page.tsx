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
    setIsGenerating(true);
    setLoading(true);
    setLoadingMsg("Generating Screen Configurations...");

    try {
      const result = await axios.post('/api/generate-config', {
        projectId,
        deviceType: projectDetails?.device,
        userInput: projectDetails?.userInput
      });

      const screens = result.data?.screens ?? [];
      setScreenConfig(screens);

      return screens; // ⭐ important

    } catch (error) {
      console.error(error);
      return [];
    }
  };

  /* ---------- GENERATE UIUX ---------- */

  const GenerateScreenUIUX = async (screens: ScreenConfig[]) => {

    setLoading(true);

    for (let index = 0; index < screens.length; index++) {

      const screen = screens[index];

      // skip already generated
      if (screen?.code) continue;

      setLoadingMsg(`Generating Screen ${index + 1}`);

      try {
        const result = await axios.post('/api/generate-screen-ui', {
          projectId,
          screenId: screen?.screenId,
          screenName: screen?.screenName,
          purpose: screen?.purpose,
          screenDescription: screen?.screenDescription
        });

        console.log(result.data);

        // ✅ update UI instantly
        setScreenConfig(prev =>
          prev.map(s =>
            s.screenId === screen.screenId
              ? result.data.data[0]
              : s
          )
        );

      } catch (err) {
        console.error("Screen generation failed:", err);
      }
    }

    setLoading(false);
    setIsGenerating(false);
  };

  /* ---------- AUTO GENERATE ---------- */

  useEffect(() => {
    const runGeneration = async () => {

      if (!projectDetails) return;
      if (screenConfig.length > 0) return;
      if (isGenerating) return;

      const screens = await generateScreenConfig();
      await GenerateScreenUIUX(screens);
    };

    runGeneration();

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