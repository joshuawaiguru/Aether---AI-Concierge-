import { useState } from 'react';
import { TabType, Mission, LuxuryService, ShaderPreset } from './types';
import { INITIAL_MISSIONS, INITIAL_SERVICES, SHADER_PRESETS } from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ChatView } from './components/ChatView';
import { ItineraryView } from './components/ItineraryView';
import { LoungeView } from './components/LoungeView';
import { ServicesView } from './components/ServicesView';
import { AudioVisualizerModal } from './components/AudioVisualizerModal';
import { HUDModal } from './components/HUDModal';
import { ProfileModal } from './components/ProfileModal';
import { NewMissionModal } from './components/NewMissionModal';
import { LedgerExportModal } from './components/LedgerExportModal';
import { ModifyPreferencesModal } from './components/ModifyPreferencesModal';
import { ServiceInquiryModal } from './components/ServiceInquiryModal';
import { FlightManifestModal } from './components/FlightManifestModal';
import { WineSafeModal } from './components/WineSafeModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [services] = useState<LuxuryService[]>(INITIAL_SERVICES);

  // Modals
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isHUDModalOpen, setIsHUDModalOpen] = useState(false);
  const [hudPreset, setHudPreset] = useState<ShaderPreset>(SHADER_PRESETS.apple);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewMissionOpen, setIsNewMissionOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);
  const [isModifyPreferencesOpen, setIsModifyPreferencesOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<LuxuryService | null>(null);
  const [isFlightManifestOpen, setIsFlightManifestOpen] = useState(false);
  const [isWineSafeOpen, setIsWineSafeOpen] = useState(false);

  // Global Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleTransmitToHUD = (preset: ShaderPreset) => {
    setHudPreset(preset);
    setIsHUDModalOpen(true);
    showToast(`Transmitting ${preset.name} optic wavefront to HUD eyewear...`);
  };

  const handleAddMission = (newMission: Mission) => {
    setMissions((prev) => [newMission, ...prev]);
    showToast(`Mission dispatched: ${newMission.title}`);
  };

  const handleSavePreferences = (wine: string, note: string) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === 'm2'
          ? {
              ...m,
              sommelierPairing: {
                wine,
                description: `${wine}. ${note}`,
              },
            }
          : m
      )
    );
    showToast(`Gastronomy protocol updated to ${wine}`);
  };

  const handleConfirmServiceAction = (service: LuxuryService, confirmationNote: string) => {
    showToast(`Reservation confirmed: ${service.title}`);
    // Auto-create a mission for the client!
    const newMission: Mission = {
      id: `m-${Date.now()}`,
      time: 'Tomorrow 10:00',
      category: service.category === 'aviation' ? 'Aviation Charter' : 'Privé Acquisition',
      status: 'Confirmed',
      statusBadgeColor: 'secondary',
      title: service.title,
      subtitle: confirmationNote,
      image: service.image,
      badgeDetail: service.statusBadge,
    };
    setMissions((prev) => [newMission, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#121317] text-[#e3e2e8] flex flex-col relative selection:bg-[#a078ff] selection:text-[#340080]">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 py-2.5 rounded-full bg-[#1f1f24]/90 backdrop-blur-2xl border border-[#4cd7f6]/40 shadow-[0_8px_30px_rgba(76,215,246,0.3)] flex items-center gap-2 text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
            <span className="flex-1 font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onOpenAudioVisualizer={() => setIsAudioModalOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        isAudioActive={isAudioModalOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full">
        {activeTab === 'chat' && (
          <ChatView
            onTransmitToHUD={handleTransmitToHUD}
            onOpenFlightManifest={() => setIsFlightManifestOpen(true)}
            onOpenWineSafe={() => setIsWineSafeOpen(true)}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryView
            missions={missions}
            onRequestNewMission={() => setIsNewMissionOpen(true)}
            onExportLedger={() => setIsLedgerOpen(true)}
            onModifyPreferences={() => setIsModifyPreferencesOpen(true)}
          />
        )}

        {activeTab === 'lounge' && (
          <LoungeView onTransmitToHUD={handleTransmitToHUD} />
        )}

        {activeTab === 'services' && (
          <ServicesView
            services={services}
            onSelectService={(s) => setSelectedService(s)}
            onContactDirector={() => {
              setActiveTab('chat');
              showToast('Connecting you with Managing Director desk...');
            }}
          />
        )}
      </main>

      {/* Floating Bottom Liquid Glass Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals & Dialogs */}
      <AudioVisualizerModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        onSpeakPrompt={(text) => {
          setActiveTab('chat');
          showToast(`Directive queued: "${text}"`);
        }}
      />

      <HUDModal
        isOpen={isHUDModalOpen}
        onClose={() => setIsHUDModalOpen(false)}
        preset={hudPreset}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <NewMissionModal
        isOpen={isNewMissionOpen}
        onClose={() => setIsNewMissionOpen(false)}
        onAddMission={handleAddMission}
      />

      <LedgerExportModal
        isOpen={isLedgerOpen}
        onClose={() => setIsLedgerOpen(false)}
        missions={missions}
      />

      <ModifyPreferencesModal
        isOpen={isModifyPreferencesOpen}
        onClose={() => setIsModifyPreferencesOpen(false)}
        onSavePreferences={handleSavePreferences}
      />

      <ServiceInquiryModal
        isOpen={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        onConfirmAction={handleConfirmServiceAction}
      />

      <FlightManifestModal
        isOpen={isFlightManifestOpen}
        onClose={() => setIsFlightManifestOpen(false)}
      />

      <WineSafeModal
        isOpen={isWineSafeOpen}
        onClose={() => setIsWineSafeOpen(false)}
      />
    </div>
  );
}
