'use client';

import React, { useEffect, useState, useContext, useRef } from 'react';
import ProjectHeader from './_shared/ProjectHeader';
import SettingsSection from './_shared/SettingsSection';
import Canvas from './_shared/Canvas';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { ProjectType, ScreenConfig } from '@/type/types';
import { buildThemeCssVariables, DEFAULT_THEME_KEY, resolveThemeKey, type ThemeKey } from '@/data/Themes';
import { Loader2Icon } from 'lucide-react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { toast } from 'sonner';

function ProjectCanvasPlayground() {

  /* ---------- STATE ---------- */

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState('Loading project...');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);

  const canvasRef = useRef<any>(null);

  // selected theme
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(DEFAULT_THEME_KEY);

  // project details
  const [projectDetails, setProjectDetail] = useState<ProjectType>();
  const [projectName, setProjectName] = useState<string>("PixPrompt Project");

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

      const details = result?.data?.projectDetail;
      setProjectDetail(details);
      setScreenConfig(result?.data?.screenConfig ?? []);

      if (details?.projectName) {
        setProjectName(details.projectName);
      }

      // 🚀 Initialize theme from database
      if (details?.theme) {
        setSelectedTheme(resolveThemeKey(details.theme));
      }
      
    } catch (error) {
      console.error(error);
      setLoadingMsg("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- HANDLERS ---------------- */

  const handleThemeSelect = async (theme: ThemeKey) => {
    setSelectedTheme(theme);
    
    // update theme in database
    try {
      await axios.patch(`/api/project?projectId=${projectId}`, {
        theme
      });
      toast.success("Theme updated!");
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  const handleSaveProject = async (name: string = projectName) => {
    const trimmedName = name.trim();
    const nextProjectName = trimmedName || "PixPrompt Project";

    try {
      setLoading(true);
      setLoadingMsg("Saving project...");
      await axios.patch(`/api/project?projectId=${projectId}`, {
        projectName: nextProjectName,
        theme: selectedTheme
      });
      
      setProjectName(nextProjectName);
      setProjectDetail(prev => prev ? { ...prev, projectName: nextProjectName } : prev);
      toast.success("Project saved successfully!");
    } catch (error) {
      console.error("Failed to save project:", error);
      toast.error("Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const generateScreenConfig = async (customPrompt?: string, customTheme?: ThemeKey) => {
    setIsGenerating(true);
    setLoading(true);
    setLoadingMsg("Generating Screen Configurations...");

    try {
      const result = await axios.post('/api/generate-config', {
        projectId,
        deviceType: projectDetails?.device,
        userInput: customPrompt || projectDetails?.userInput,
        theme: customTheme || selectedTheme
      });

      const screens = result.data?.screens ?? [];
      setScreenConfig(screens);
      
      if (customTheme) {
        setSelectedTheme(customTheme);
      }

      // update credits
      setUserDetail((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          credits: Math.max(0, (prev.credits || 0) - 1)
        };
      });

      return screens; // ⭐ important

    } catch (error: any) {
      console.error("Config generation failed:", error);
      if (error?.response?.status === 403) {
        toast.error("You don't have enough credits to generate this project.");
      } else {
        toast.error("Failed to generate project config. Please try again.");
      }
      return [];
    } finally {
      setIsGenerating(false);
      setLoading(false);
    }
  };

  const handleManualGenerate = async (prompt: string) => {
    // 1. If we have no screens, generate the full project config
    if (screenConfig.length === 0) {
      const screens = await generateScreenConfig(prompt, selectedTheme);
      await GenerateScreenUIUX(screens);
    } else {
      // 2. If we have screens, modify the CURRENT selected screen
      const currentScreen = screenConfig[selectedScreenIndex];
      await handleEditScreenUI(currentScreen, prompt, selectedTheme);
    }
  };

  const handleEditScreenUI = async (screen: ScreenConfig, prompt: string, theme: ThemeKey) => {
    setIsGenerating(true);
    setLoading(true);
    setLoadingMsg(`Updating ${screen.screenName}...`);

    try {
      const result = await axios.post('/api/generate-screen-ui', {
        projectId,
        screenId: screen.screenId,
        screenName: screen.screenName,
        purpose: screen.purpose,
        screenDescription: prompt, // Use the new prompt for editing
        projectVisualDescription: `Theme: ${theme}, Style: Premium, Unique.`,
        theme: theme,
        existingCode: screen.code, // ⭐ Important: pass existing code for modification
        deviceType: projectDetails?.device
      });

      // Update the UI
      if (result.data?.data?.[0]) {
        setScreenConfig(prev =>
          prev.map(s =>
            s.screenId === screen.screenId
              ? result.data.data[0]
              : s
          )
        );
        toast.success("Screen updated successfully!");
      } else {
        throw new Error("Invalid response format from server");
      }

      // update credits
      setUserDetail((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          credits: Math.max(0, (prev.credits || 0) - 1)
        };
      });

    } catch (err: any) {
      console.error("Screen update failed:", err);
      toast.error("Failed to update screen.");
    } finally {
      setLoading(false);
      setIsGenerating(false);
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
          screenDescription: screen?.screenDescription,
          projectVisualDescription: `Theme: ${selectedTheme || DEFAULT_THEME_KEY}, Style: Premium, Unique, with high-quality illustrations.`,
          theme: selectedTheme || DEFAULT_THEME_KEY,
          deviceType: projectDetails?.device
        });

        console.log(result.data);

        // ✅ update UI instantly
        if (result.data?.data?.[0]) {
          setScreenConfig(prev =>
            prev.map(s =>
              s.screenId === screen.screenId
                ? result.data.data[0]
                : s
            )
          );
        } else {
          console.error("Failed to update screen config: Invalid response format");
        }

        // update credits
        setUserDetail((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            credits: Math.max(0, (prev.credits || 0) - 1)
          };
        });

      } catch (err: any) {
        console.error("Screen generation failed:", err);
        if (err?.response?.status === 403) {
          toast.error("Credits exhausted during screen generation.");
          break; // stop generating further screens
        }
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

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground space-y-4">
        <Loader2Icon className="animate-spin text-primary" size={40} />
        <p className="text-sm font-medium animate-pulse">{loadingMsg}</p>
      </div>
    );
  }

  const projectThemeStyle = buildThemeCssVariables(selectedTheme);

  return (
    <div className="h-screen flex flex-col bg-background" style={projectThemeStyle}>
      <ProjectHeader 
        projectName={projectName} 
        onSave={() => handleSaveProject()} 
      />

      <main className="flex flex-1 overflow-hidden">
        <SettingsSection
          onGenerate={handleManualGenerate}
          onThemeSelect={handleThemeSelect}
          onSave={handleSaveProject}
          onProjectNameChange={setProjectName}
          onScreenshot={() => canvasRef.current?.downloadImage()}
          isGenerating={isGenerating}
          selectedTheme={selectedTheme}
          projectName={projectName}
        />
        <Canvas
          ref={canvasRef}
          screens={screenConfig}
          selectedScreenIndex={selectedScreenIndex}
          onScreenSelect={setSelectedScreenIndex}
          deviceType={projectDetails?.device}
          selectedTheme={selectedTheme}
        />
      </main>
    </div>
  );
}

export default ProjectCanvasPlayground;
