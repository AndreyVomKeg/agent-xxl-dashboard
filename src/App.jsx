import { useState } from "react";
import { C } from "./styles/theme";
import { initialCampaigns, defaultSkills } from "./data/mockData";
import Header from "./components/Header";
import Overview from "./components/Overview";
import Campaigns from "./components/Campaigns";
import Agents from "./components/Agents";
import CampaignWizard from "./components/CampaignWizard";
import SkillPipeline from "./components/SkillPipeline";
import RightPanel from "./components/RightPanel";

export default function App() {
  const [tab, setTab] = useState("overview");
  const [camps, setCamps] = useState(initialCampaigns);
  const [skills, setSkills] = useState(defaultSkills);

  // Campaign Wizard state
  const [showWizard, setShowWizard] = useState(false);

  // Skill Pipeline state
  const [pipeline, setPipeline] = useState(null); // { agentName, file }

  const handleNewCampaign = (campaign) => {
    setCamps(p => [campaign, ...p]);
    setTab("campaigns");
  };

  const handleStartPipeline = (agentName, files) => {
    setPipeline({ agentName, file: files[0] });
  };

  const handleApplySkill = (newSkill) => {
    setPipeline(p => {
      if (p) {
        setSkills(prev => ({
          ...prev,
          [p.agentName]: [...(prev[p.agentName] || []), newSkill],
        }));
      }
      return p;
    });
  };

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      background: C.bg, color: C.tx,
    }}>
      <Header tab={tab} setTab={setTab} />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Main content */}
        <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
          {tab === "overview" && <Overview camps={camps} />}

          {tab === "campaigns" && (
            <Campaigns
              camps={camps}
              setCamps={setCamps}
              onNewCampaign={() => setShowWizard(true)}
            />
          )}

          {tab === "agents" && (
            <Agents
              skills={skills}
              setSkills={setSkills}
              onStartPipeline={handleStartPipeline}
            />
          )}
        </div>

        {/* Right panel */}
        <RightPanel />
      </div>

      {/* Campaign Wizard modal */}
      {showWizard && (
        <CampaignWizard
          onClose={() => setShowWizard(false)}
          onCreate={handleNewCampaign}
        />
      )}

      {/* Skill Pipeline modal */}
      {pipeline && (
        <SkillPipeline
          agentName={pipeline.agentName}
          file={pipeline.file}
          onClose={() => setPipeline(null)}
          onApply={handleApplySkill}
        />
      )}
    </div>
  );
}
