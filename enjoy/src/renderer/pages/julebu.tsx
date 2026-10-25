import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { HeadphonesIcon, LoaderIcon, Mic2Icon } from "lucide-react";
import { toast } from "@renderer/components/ui";
import { AppSettingsProviderContext } from "@renderer/context";
import { useSpeech } from "@renderer/hooks";

type SelectionMenu = { x: number; y: number; text: string };

export default function Julebu() {
  const navigate = useNavigate();
  const { EnjoyApp } = useContext(AppSettingsProviderContext);
  const { tts } = useSpeech();
  const webviewRef = useRef<Electron.WebviewTag>(null);
  const [menu, setMenu] = useState<SelectionMenu | null>(null);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    // Right-click on selected text inside julebu.co opens our import menu
    const onContextMenu = (event: Electron.ContextMenuEvent) => {
      const text = event.params.selectionText.trim();
      setMenu(text ? { x: event.params.x, y: event.params.y, text } : null);
    };

    webview.addEventListener("context-menu", onContextMenu);
    return () => {
      webview.removeEventListener("context-menu", onContextMenu);
    };
  }, []);

  const shadow = async (text: string) => {
    setMenu(null);
    setImporting(true);

    try {
      const speech = await tts({
        sourceType: "Julebu",
        sourceId: crypto.randomUUID(),
        text,
      });
      if (!speech) throw new Error(t("julebuImportFailed"));

      let audio = await EnjoyApp.audios.findOne({ md5: speech.md5 });
      if (!audio) {
        audio = await EnjoyApp.audios.create(speech.filePath, {
          name: text.length > 40 ? text.substring(0, 37).trim() + "..." : text,
          originalText: text,
        });
      }

      navigate(`/practice/audio/${audio.id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setImporting(false);
    }
  };

  const assess = (text: string) => {
    setMenu(null);
    navigate("/pronunciation_assessments/new", {
      state: { referenceText: text },
    });
  };

  return (
    <div className="relative w-full h-content">
      <webview
        ref={webviewRef}
        src="https://julebu.co/home"
        partition="persist:julebu"
        className="w-full h-content"
      />

      {menu && (
        <div className="absolute inset-0 z-10" onClick={() => setMenu(null)}>
          <div
            className="absolute w-56 rounded-md border bg-popover p-1 shadow-md"
            style={{ left: menu.x, top: menu.y }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2 py-1.5 text-xs text-muted-foreground line-clamp-2">
              {menu.text}
            </div>
            <button
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              onClick={() => shadow(menu.text)}
            >
              <HeadphonesIcon className="mr-2 size-4" />
              {t("julebuShadow")}
            </button>
            <button
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              onClick={() => assess(menu.text)}
            >
              <Mic2Icon className="mr-2 size-4" />
              {t("julebuAssess")}
            </button>
          </div>
        </div>
      )}

      {importing && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60">
          <div className="flex items-center rounded-md border bg-background px-4 py-2 shadow">
            <LoaderIcon className="mr-2 size-4 animate-spin" />
            {t("julebuImporting")}
          </div>
        </div>
      )}
    </div>
  );
}
